
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Permite receber dados dos formulários
app.use(express.urlencoded({ extended: true }));

// Permite o acesso aos arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Array que armazena os feedbacks
let feedbacks = [];
let proximoId = 1;

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Cadastra feedback
app.post('/feedbacks/enviar', (req, res) => {
    const nome = req.body.nome;
    const comentario = req.body.comentario;

    if (!nome || !nome.trim() ||
        !comentario || !comentario.trim()) {
        return res.status(400).send('Preencha todos os campos.');
    }

    feedbacks.push({
        id: proximoId++,
        nome: nome.trim(),
        comentario: comentario.trim()
    });

    res.redirect('/feedbacks/lista');
});

// Abri a página separada de listagem
app.get('/feedbacks/lista', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lista.html'));
});

// Envia os feedbacks para a página
app.get('/feedbacks/dados', (req, res) => {
    res.json(feedbacks);
});

// Remove feedback
app.post('/feedbacks/remover', (req, res) => {
    const id = Number(req.body.id);

    feedbacks = feedbacks.filter(feedback => feedback.id !== id);

    res.redirect('/feedbacks/lista');
});

// Inicia servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
