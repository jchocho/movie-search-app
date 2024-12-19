const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', { movies: null });
});

app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: process.env.API_KEY,
                query: query,
                language: 'pl'
            },
        });
        res.render('index', { movies: response.data.results });
    } catch (error) {
        console.error('Błąd podczas wyszukiwania filmu:', error.response ? error.response.data : error.message);
        res.status(500).send('Błąd serwera');
    }
});

app.get('/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: { 
                api_key: process.env.API_KEY,
                language: 'pl'
            },
        });

        const movie = response.data;

        if (!movie || !movie.title) {
            throw new Error('Nie znaleziono filmu');
        }

        res.render('details', { movie });
    } catch (error) {
        console.error('Błąd przy pobieraniu szczegółów filmu:', error.response?.data || error.message);
        res.status(500).send('Błąd serwera');
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Serwer działa na http://localhost:${PORT}`);
    });
}

module.exports = app;