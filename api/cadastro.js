import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    const dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false }
    };

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Verifica se já existe usuário
        const [existingUsers] = await connection.execute(
            'SELECT IdUsuario FROM cadastro WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            await connection.end();
            return res.status(409).json({ message: 'Este email já está cadastrado.' });
        }

        const hashSenha = await bcrypt.hash(senha, 10);

        const [result] = await connection.execute(
            'INSERT INTO cadastro (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, hashSenha]
        );

        await connection.end();

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            IdUsuario: result.insertId
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return res.status(500).json({ message: 'Erro interno ao registrar.' });
    }
}
