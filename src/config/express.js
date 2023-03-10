import gamesRouter from '#Routes/games.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Load enviroment variables
dotenv.config();
const VERSION_API = process.env.VERSION_API || 'v1';

// Create Express server
const expressApp = express();

// Middlewares
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(express.text());

// Routers
expressApp.use(`/${VERSION_API}/games`, gamesRouter);

export default expressApp;
