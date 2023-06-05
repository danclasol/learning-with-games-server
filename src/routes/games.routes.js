import {
	cloneGame,
	createGame,
	deleteGame,
	getGameById,
	getUserGames,
	updateGame,
} from '#Controllers/games.controller.js';
import validateCloneGameDTO from '#Dto/game-clone.dto.js';
import validateNewGameDTO from '#Dto/game-new.dto.js';
import validateUpdateGameDTO from '#Dto/game-update.dto.js';
import validateUserGameAccess from '#Middlewares/validate-game-access.js';
import { Router } from 'express';

const gamesRouter = Router({ mergeParams: true });

gamesRouter.get('/', getUserGames);
gamesRouter.get('/:id', validateUserGameAccess, getGameById);
gamesRouter.post('/', validateNewGameDTO, createGame);
gamesRouter.post(
	'/:id/clone',
	validateUserGameAccess,
	validateCloneGameDTO,
	cloneGame
);
gamesRouter.put(
	'/:id',
	validateUserGameAccess,
	validateUpdateGameDTO,
	updateGame
);
gamesRouter.delete('/:id', validateUserGameAccess, deleteGame);

export default gamesRouter;
