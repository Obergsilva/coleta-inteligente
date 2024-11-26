const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Configuração do Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do Banco de Dados SQLite
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Banco de dados conectado.');
        db.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                tipo TEXT NOT NULL
            )
        `);
    }
});

// Endpoint para cadastrar usuário
app.post('/api/cadastro', (req, res) => {
    const { nome, email, tipo } = req.body;

    if (!nome || !email || !tipo) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    const query = 'INSERT INTO usuarios (nome, email, tipo) VALUES (?, ?, ?)';
    db.run(query, [nome, email, tipo], function (err) {
        if (err) {
            return res.status(500).json({ mensagem: 'Erro ao salvar no banco de dados.', erro: err.message });
        }
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: this.lastID });
    });
});

// Endpoint para listar usuários (opcional, para testes)
app.get('/api/usuarios', (req, res) => {
    db.all('SELECT * FROM usuarios', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ mensagem: 'Erro ao buscar usuários.', erro: err.message });
        }
        res.json(rows);
    });
});

// Servir arquivos estáticos do frontend
app.use(express.static('public'));

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
