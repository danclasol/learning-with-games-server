import userTokenDTO from '#Dto/user-token.dto.js';
import authRouter from '#Routes/auth.routes.js';
import findingPairGamesRouter from '#Routes/game-finding-pairs.routes.js';
import hangmanGamesRouter from '#Routes/game-hangman.routes.js';
import quizGamesRouter from '#Routes/game-quiz.routes.js';
import gamesRouter from '#Routes/games.routes.js';
import groupCollectionsRouter from '#Routes/groups-collections.routes.js';
import groupsRouter from '#Routes/groups.routes.js';
import usersRouter from '#Routes/users.routes.js';
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

// Public Routers
expressApp.use(`/${VERSION_API}/auth`, authRouter);

// Private Routers
expressApp.use(userTokenDTO);
expressApp.use(`/${VERSION_API}/users`, usersRouter);
expressApp.use(`/${VERSION_API}/groups`, groupsRouter);
expressApp.use(`/${VERSION_API}/groups/:id/folders/`, groupCollectionsRouter);
expressApp.use(`/${VERSION_API}/games`, gamesRouter);
expressApp.use(
	`/${VERSION_API}/games/:id/finding-pairs/`,
	findingPairGamesRouter
);
expressApp.use(`/${VERSION_API}/games/:id/hangman/`, hangmanGamesRouter);
expressApp.use(`/${VERSION_API}/games/:id/quiz/`, quizGamesRouter);

export default expressApp;
