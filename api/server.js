// server.js

// Importa as dependências necessárias
const express = require('express');
const mysql = require('mysql2/promise'); // versão com Promises
const bcrypt = require('bcrypt'); // para hash de senha
const jwt = require('jsonwebtoken'); // para JWT
const cors = require('cors');

// Configurações do Express
const app = express();
app.use(cors());
app.use(express.json()); // parse JSON do corpo das requisições

// Configurações do banco de dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'vini2611',
    database: 'SportMax',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const JWT_SECRET = 'seu_segredo_jwt_super_simples_para_poc';
const PORT = 3000;

// Cria pool de conexões
let pool;
try {
    pool = mysql.createPool(dbConfig);
    console.log(`Conectado ao banco de dados MySQL (${dbConfig.database}) com sucesso!`);
} catch (error) {
    console.error('Erro ao conectar com o banco de dados MySQL:', error.message);
    process.exit(1);
}

// ---- Rotas da API ----

// Rota de Cadastro (POST /cadastro)
app.post('/cadastro', async (req, res) => {
    console.log('Recebido cadastro:', req.body);
    const { nome, email, senha } = req.body;

    // Validação mínima
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    try {
        // Verifica se o email já existe
        const [existingUsers] = await pool.query(
            'SELECT IdUsuario FROM cadastro WHERE email = ?',
            [email]
        );
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }

        // Hash da senha
        const hashSenha = await bcrypt.hash(senha, 10);

        // Insere o usuário
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
        res.status(500).json({ message: 'Erro interno no servidor ao tentar registrar.' });
    }
});

// Rota de Login (POST /login)
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
            token: token,
            IdUsuario: user.IdUsuario,
            nome: user.nome // adiciona o nome ao retorno
        });        

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno no servidor ao tentar fazer login.' });
    }
});

// ---- Inicialização do Servidor ----
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Endpoints disponíveis:`);
    console.log(`  POST /cadastro - Cadastra usuário na tabela 'cadastro'`);
    console.log(`  POST /login    - Efetua login com base na tabela 'cadastro'`);
});

// Graceful shutdown
async function closeGracefully(signal) {
    console.log(`\nRecebido ${signal}. Fechando pool de conexões do MySQL...`);
    try {
        if (pool) await pool.end();
        console.log('Pool de conexões do MySQL fechado.');
    } catch (err) {
        console.error('Erro ao fechar o pool de conexões do MySQL:', err);
    } finally {
        process.exit(0);
    }
}

process.on('SIGINT', () => closeGracefully('SIGINT'));
process.on('SIGTERM', () => closeGracefully('SIGTERM'));