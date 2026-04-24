# Manpower Optimization Simulator

A full-stack web app to simulate and optimize manpower allocation on a production line.

## Features

- Run manpower simulations with configurable workers, stations, cycle times, and shift duration
- View results dashboard with charts and metrics
- What-if analysis to compare scenarios side by side
- Save, view, and delete scenarios (persisted in MongoDB)

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Recharts, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas

## Project Structure

```
manpower-simulator/
├── backend/
│   ├── controllers/   # Simulation logic
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── App.jsx
        └── api.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/simulate` | Run a simulation without saving |
| POST | `/api/scenarios` | Run and save a scenario |
| GET | `/api/scenarios` | Get all saved scenarios |
| DELETE | `/api/scenarios/:id` | Delete a scenario |

## Deployment

- **Backend:** Render
- **Frontend:** Vercel / Render / Netlify

Set `MONGODB_URI` and `PORT` as environment variables on your hosting platform.
