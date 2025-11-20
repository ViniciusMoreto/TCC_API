// Garantir que este arquivo é CommonJS

// server.js

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// Configurações do Express
const app = express();
app.use(cors());
app.use(express.json());

// Configurações do banco de dados via variável pública
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false }
};

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;

let pool;
(async () => {
    try {
        pool = mysql.createPool(dbConfig);

        // Teste rápido
        const [rows] = await pool.query('SELECT 1+1 AS teste');
        console.log('Conexão OK:', rows);
    } catch (err) {
        console.error('Erro de conexão:', err);
    }
})();

// ---------------- ROTAS ---------------------

// Cadastro
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    try {
        const [existingUsers] = await pool.query(
            'SELECT IdUsuario FROM cadastro WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }

        const hashSenha = await bcrypt.hash(senha, 10);

        const [result] = await pool.query(
            'INSERT INTO cadastro (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashSenha]
        );

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            IdUsuario: result.insertId
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro interno ao registrar.' });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const [users] = await pool.query(
            'SELECT IdUsuario, nome, email, senha FROM cadastro WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        const user = users[0];
        const isSenhaMatch = await bcrypt.compare(senha, user.senha);

        if (!isSenhaMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        const token = jwt.sign(
            { IdUsuario: user.IdUsuario, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            IdUsuario: user.IdUsuario,
            nome: user.nome
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno ao tentar fazer login.' });
    }
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Endpoints: POST /cadastro | POST /login`);
});

// Fechamento seguro
async function closeGracefully(signal) {
    console.log(`\nRecebido ${signal}. Fechando conexões MySQL...`);
    try {
        if (pool) await pool.end();
        console.log('Conexões fechadas.');
    } catch (err) {
        console.error('Erro ao fechar conexões:', err);
    } finally {
        process.exit(0);
    }
}

process.on('SIGINT', () => closeGracefully('SIGINT'));
process.on('SIGTERM', () => closeGracefully('SIGTERM'));
