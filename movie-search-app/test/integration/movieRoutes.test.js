const request = require('supertest');
const app = require('../../server');

describe('Testy integracyjne dla tras filmu', () => {
    it('Powinien renderować stronę główną', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Wyszukiwarka Filmów');
    });
    
    it('Powinien zwrócić wyniki wyszukiwania dla zapytania', async () => {
        const mockQuery = 'Inception';
        const res = await request(app).get(`/search?q=${mockQuery}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Inception');
    });

    it('Powinien zwrócić komunikat o braku wyników wyszukiwania', async () => {
        const mockQuery = 'asdasdasd';
        const res = await request(app).get(`/search?q=${mockQuery}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Brak wyników wyszukiwania.');
    });

    it('Powinien zwrócić szczegóły filmu na podstawie ID', async () => {
        const mockMovieId = 550;
        const res = await request(app).get(`/movie/${mockMovieId}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Podziemny krąg');
    });

    it('Powinien zwrócić błąd 500, gdy film nie istnieje', async () => {
        const invalidMovieId = 9999999;
        const res = await request(app).get(`/movie/${invalidMovieId}`);
        expect(res.statusCode).toBe(500);
        expect(res.text).toContain('Błąd serwera');
    });

    it('Powinien zwrócić błąd 500, przy ujemnym id', async () => {
        const invalidMovieId = -1;
        const res = await request(app).get(`/movie/${invalidMovieId}`);
        expect(res.statusCode).toBe(500);
        expect(res.text).toContain('Błąd serwera');
    });

    it('Powinien zwrócić wyniki wyszukiwania w języku polskim', async () => {
        const mockQuery = 'Incepcja';
        const res = await request(app).get(`/search?q=${mockQuery}&language=pl`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Incepcja');
    });
    
    it('Powinien zwrócić wyniki wyszukiwania w języku angielskim', async () => {
        const mockQuery = 'Inception';
        const res = await request(app).get(`/search?q=${mockQuery}&language=en`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Inception');
    });

    it('Powinien zwrócić błąd 404 dla nieistniejącej trasy', async () => {
        const res = await request(app).get('/nonexistent-route');
        expect(res.statusCode).toBe(404);
    });

    it('Powinien zwrócić błąd 500, gdy brak jest klucza API', async () => {
        process.env.API_KEY = '';
        const res = await request(app).get('/search?q=Inception');
        expect(res.statusCode).toBe(500);
        expect(res.text).toContain('Błąd serwera');
    });           
});
