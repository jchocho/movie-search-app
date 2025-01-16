# Akademia Tarnowska

## Kurs

Testowanie i Jakość Oprogramowania / Projekt

## Autor

Jakub Chochołowicz (https://github.com/jchocho)

## Temat projektu
Movie search app - Wyszukiwarka filmów

## Opis projektu

**Wyszukiwarka filmów** jest to aplikacja, która ma na celu wyszukiwanie filmów po ich tytułach. Oferuje również wejście w szczegóły wybranego filmu, takie jak opis filmu, data premiery i ocena.

##  Uruchomienie projektu

Sklonuj projekt

```bash
  git clone https://github.com/jchocho/movie-search-app.git
```

Przejdź do folderu z projektem

```bash
  cd movie-search-app
```
Zainstaluj zależności

```bash
  npm install
```

 Uruchom serwer

```bash
  npm start
```

## Testy

### Testy jednostkowe

```bash
  \movie-search-app\test\unit\serverFunctions.test.js
```

### Testy integracyjne

```bash
  \movie-search-app\test\integration\movieRoutes.test.js
```

### Uruchomienie testów jednostkowych i integracyjnych
 
```bash
  npm test
```

## Dokumentacja API

### Strona główna
- Adres: `/`
- Typ: **GET**
- Zwraca: Strona główna z wyszukiwarką filmów i pustymi wynikami.

### Wyszukiwanie filmów
- Adres: `/search`
- Typ: **GET**
- Zwraca: Strona główna z wyświetlonymi wynikami wyszukiwania dla danego filmu.

### Szczegóły filmu
- Adres: `/movie/:id`
- Typ: **GET**
- Zwraca: Strona z szczegółowymi informacjami o szukanym filmie.

## Scenariusze testowe dla testera manualnego
| Test Case ID |  Opis  |	Kroki testowe	| Oczekiwany wynik|
|:-----|:--------:|:------:|:------: |
| TC_01   | Test sprawdza, czy użytkownik może wyszukiwać filmy na podstawie ich nazwy. | Wejdź na stronę główną aplikacji. Wpisz „Incepcja” w pole wyszukiwania. Kliknij przycisk „Szukaj”. |  Wyświetlą się wyniki wyszukiwania dla filmu „Incepcja”. Wyniki powinny zawierać tytuł, plakat (jeśli dostępny) i link do szczegółów.  |
| TC_02   |  Test sprawdza, jak aplikacja reaguje na wyszukiwanie bez podania tekstu.  |   Wejdź na stronę główną aplikacji. Zostaw pole wyszukiwania puste. Kliknij przycisk „Szukaj”. | Pole wyszukiwania pozostanie puste, a użytkownik zostanie poinformowany aby wypełnić pole wyszukiwania. |
| TC_03   |  Test sprawdza, jak aplikacja obsługuje zapytania, które nie pasują do żadnego filmu w bazie danych.  |   Wejdź na stronę główną aplikacji. Wpisz losową nazwę filmu, np. „asdasd123”. Kliknij przycisk „Szukaj”.  | Aplikacja wyświetli komunikat „Brak wyników wyszukiwania”. |
| TC_04   |  Test sprawdza, czy użytkownik może zobaczyć szczegóły filmu, klikając w wynik wyszukiwania.  |   Wejdź na stronę główną aplikacji. Wyszukaj film, np. „Fight Club”. Kliknij na tytuł filmu w wynikach wyszukiwania.   | Aplikacja wyświetli stronę z szczegółami filmu, w tym tytuł, opis, datę premiery, ocenę, plakat (jeśli dostępny) i inne dostępne informacje. |
| TC_05   |  Sprawdzenie działania plakatu filmu  |   Wyszukaj film, np. „The Matrix”. Kliknij na tytuł filmu, aby zobaczyć szczegóły.  | Na stronie szczegółów filmu powinien pojawić się plakat (jeśli film go ma). |
| TC_06   |  Test sprawdza, jak aplikacja radzi sobie z nazwami filmów zawierającymi specjalne znaki.  |   Wyszukaj film z nazwą zawierającą specjalne znaki, np. „Juror #2”. Kliknij przycisk „Szukaj”.  | Aplikacja powinna poprawnie wyszukać film „Juror #2” i wyświetlić odpowiednie wyniki. |
| TC_07   |  Test sprawdza, jak aplikacja obsługuje przypadek, gdy film nie ma dostępnego plakatu.  |   Wyszukaj „Ambitendency”. Kliknij na tytuł filmu, aby zobaczyć szczegóły.  | Aplikacja wyświetli wszystkie szczegóły filmu, z wyjątkiem plakatu |
| TC_08   |  Test sprawdza, jak aplikacja obsługuje sytuację, gdy użytkownik próbuje zobaczyć szczegóły nieistniejącego filmu.  |  Wejdź na stronę główną aplikacji. Wprowadź nieistniejące ID filmu w pasku adresu, np. /movie/9999999.   | Aplikacja powinna wyświetlić stronę błędu |
| TC_09   |  Test sprawdza, czy użytkownik może wyszukiwać film na podstawie oryginalnej nazwie.  |  Wejdź na stronę główną aplikacji. Wpisz „Inception” w pole wyszukiwania. Kliknij przycisk „Szukaj”.  | Wyświetlą się wyniki wyszukiwania dla filmu „Incepcja”. |
| TC_10   |  Test sprawdza, czy użytkownik może wyszukiwać film na podstawie skróconej nazwy  |  Wejdź na stronę główną aplikacji. Wpisz „LOTR” w pole wyszukiwania. Kliknij przycisk „Szukaj”.  | Wyświetlą się wyniki wyszukiwania dla filmu „Władca Pierścieni”. |

## Technologie użyte w projekcie
- Node.js
- Express.js
- HTML
- CSS
- JavaScript
- TMDB API
