import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
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

        const [users] = await connection.execute(
            'SELECT IdUsuario, nome, email, senha FROM cadastro WHERE email = ?',
            [email]
        );

        await connection.end();

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
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            IdUsuario: user.IdUsuario,
            nome: user.nome
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ message: 'Erro interno ao tentar fazer login.' });
    }
}
