// Importando módulos necessários
const express = require('express');
const axios = require('axios');
const app = express();

// Configurando o EJS como mecanismo de template
app.set('view engine', 'ejs');

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// URL base da API do GitHub
const GITHUB_API_URL = 'https://api.github.com/users/';

app.get('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const response = await axios.get(`${GITHUB_API_URL}${username}`);
        const user = response.data;

        // Renderizando a página do usuário com os dados do usuário
        res.render('user', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro ao buscar os dados do usuário');
    }
});

app.get('/:username/friends/:friendname', async (req, res) => {
    try {
        const friendname = req.params.friendname;
        const response = await axios.get(`${GITHUB_API_URL}${friendname}`);
        const friend = response.data;

        // Renderizando a página do amigo com os dados do amigo
        res.render('friend', { friend });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro ao buscar os dados do amigo');
    }
});

// Iniciando o servidor
app.listen(3000, () => console.log('Aplicação rodando na porta 3000'));