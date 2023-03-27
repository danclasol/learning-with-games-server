import findingPairGamesRouter from '#Routes/game-finding-pairs.routes.js';
import hangmanGamesRouter from '#Routes/game-hangman.routes.js';
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
expressApp.use(
	`/${VERSION_API}/games/:id/finding-pairs/`,
	findingPairGamesRouter
);
expressApp.use(`/${VERSION_API}/games/:id/hangman/`, hangmanGamesRouter);

export default expressApp;
