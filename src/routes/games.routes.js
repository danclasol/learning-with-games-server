import { Router } from 'express';

import {
	createGame,
	deleteGame,
	getGameById,
	getUserGames,
	updateGame,
} from '#Controllers/games.controller.js';
import validateNewGameDTO from '#Dto/game-new.dto.js';
import validateUpdateGameDTO from '#Dto/game-update.dto.js';

const gamesRouter = Router({ mergeParams: true });

gamesRouter.get('/', getUserGames);
gamesRouter.get('/:id', getGameById);
gamesRouter.post('/', validateNewGameDTO, createGame);
gamesRouter.put('/:id', validateUpdateGameDTO, updateGame);
gamesRouter.delete('/:id', deleteGame);

export default gamesRouter;
