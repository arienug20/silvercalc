import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { seedDatabase } from './db/seed';
import { db } from './db/schema';

// Seed database on startup
db.on('populate', seedDatabase);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);