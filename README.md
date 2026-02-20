# Movie App

A React-based movie search app that uses the OMDb API to browse titles, view details, and manage a favourites list.

## Features
- Search movies by keyword
- Filter by type (`movie`, `series`)
- View movie details
- Add/remove favourites
- Pagination with 12 cards per UI page
- Sliding pagination buttons (3 visible page numbers that move with current page)
- Randomized home feed on refresh and Home click

## Tech Stack
- React (Create React App)
- React Router
- Axios
- Tailwind CSS
- OMDb API

## Getting Started

### Prerequisites
- Node.js 18+ (or recent LTS)
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
The OMDb API key is currently hardcoded in `src/api.js`. Replace it with your own key if needed.

```js
const API_KEY = "YOUR_KEY_HERE";
```

## Notes
- OMDb returns 10 items per API page; this app combines API pages to render 12 items per UI page.
- Initial/home feed uses a random term from a predefined list and avoids repeating the immediate previous term.
- Home title uses a solid fallback color to stay visible in production deployments.

## Project Structure
- `public/` static assets
- `src/` application source
- `src/components/` UI components
- `src/api.js` OMDb API client

## Scripts
- `npm start` run dev server
- `npm test` run tests
- `npm run build` build for production
- `npm run eject` eject CRA configuration
