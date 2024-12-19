const request = require('supertest');
const app = require('../../server');
const nock = require('nock');

describe('Testy jednostkowe dla serwera', () => {
    it('Powinien renderować stronę główną', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Wyszukiwarka Filmów');
    });

    it('Powinien zwrócić filmy na podstawie zapytania', async () => {
        const mockQuery = 'Inception';
        const res = await request(app).get(`/search?q=${mockQuery}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Inception');
    });    

    it('Powinien zwrócić szczegóły filmu', async () => {
        const mockMovieId = 550;
        const res = await request(app).get(`/movie/${mockMovieId}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Podziemny krąg');
    });

    it('Powinien obsłużyć brak wyników wyszukiwania', async () => {
        const mockQuery = 'Fight Club';
        const res = await request(app).get(`/search?q=${mockQuery}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Podziemny krąg');
    });

    it('Powinien zwrócić szczegóły filmu', async () => {
        const mockMovieId = 0;
        const res = await request(app).get(`/movie/${mockMovieId}`);
        expect(res.statusCode).toBe(500);
        expect(res.text).toContain('Błąd serwera');
    });

    it('Powinien obsłużyć brak wyników wyszukiwania', async () => {
        const mockQuery = 'asdasdasd';
        const res = await request(app).get(`/search?q=${mockQuery}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Brak wyników wyszukiwania.');
    });

    it('Powinien obsłużyć błędy podczas wyszukiwania', async () => {
        process.env.API_KEY = '';
        const res = await request(app).get('/search?q=Inception');
        expect(res.statusCode).toBe(500);
        expect(res.text).toContain('Błąd serwera');
    });

    it('Powinien obsłużyć błędy podczas pobierania szczegółów filmu', async () => {
        const invalidMovieId = 9999999;
        const res = await request(app).get(`/movie/${invalidMovieId}`);
        expect(res.statusCode).toBe(500);
        expect(res.text).toContain('Błąd serwera');
    });

    it('Powinien obsłużyć brak plakatu filmu', async () => {
        const mockMovieId = 12345;
    
        nock('https://api.themoviedb.org/3')
            .get(`/movie/${mockMovieId}`)
            .query(true)
            .reply(200, {
                id: mockMovieId,
                title: 'Mock Movie',
                poster_path: null,
                overview: 'Mock description',
                release_date: '2024-01-01',
                vote_average: 8.5,
            });
    
        const res = await request(app).get(`/movie/${mockMovieId}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).not.toContain('img src="https://image.tmdb.org/t/p/w500/"');
    });    

    it('Powinien odpowiednio przekierować nieistniejące trasy', async () => {
        const res = await request(app).get('/nonexistent-route');
        expect(res.statusCode).toBe(404);
    });
    
});
