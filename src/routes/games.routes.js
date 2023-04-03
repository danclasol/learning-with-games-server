import {
	createGame,
	deleteGame,
	getGameById,
	getUserGames,
} from '#Controllers/games.controller.js';
import validateNewGameDTO from '#Dto/game-new.dto.js';
import { Router } from 'express';

const gamesRouter = Router({ mergeParams: true });

gamesRouter.get('/', getUserGames);
gamesRouter.get('/:id', getGameById);
gamesRouter.post('/', validateNewGameDTO, createGame);
// gamesRouter.put('/:id', validateUpdateGameDTO, updateGame);
gamesRouter.delete('/:id', deleteGame);

export default gamesRouter;
