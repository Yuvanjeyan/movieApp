# Movie App

A React-based movie search app that uses the OMDb API to browse titles, view details, and manage a favourites list. It includes search, type filtering, and simple pagination.

## Features
- Search movies by keyword
- Filter by type (movie, series, episode)
- View movie details
- Add/remove favourites
- Pagination (12 results per view)

## Tech Stack
- React (Create React App)
- React Router
- Axios
- Tailwind CSS
- OMDb API

## Getting Started

### Prerequisites
- Node.js 18+ (or a recent LTS)
- npm

### Install
```bash
npm install
```

### Run
```bash
npm start
```
Open `http://localhost:3000` in your browser.

### Build
```bash
npm run build
```

## Configuration
The OMDb API key is currently hardcoded in `src/api.js`. You can replace it with your own key.

Example update:
```js
const API_KEY = "YOUR_KEY_HERE";
```

## Project Structure
- `public/` static assets
- `src/` application source
- `src/components/` UI components
- `src/api.js` OMDb API client

## Notes
- Default search term is `movies` on initial load.
- Pagination uses OMDb page size (10) and combines two API pages to render 12 items per view.

## Scripts
- `npm start` run dev server
- `npm test` run tests
- `npm run build` build for production
- `npm run eject` eject CRA configuration