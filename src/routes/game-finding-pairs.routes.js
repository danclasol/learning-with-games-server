import { updateGame } from '#Controllers/game-finding-pairs.controller.js';
import validateUpdateGameDTO from '#Dto/game-finding-pairs-update.dto.js';
import validateUserGameAccess from '#Middlewares/validate-game-access.js';
import { Router } from 'express';

const findingPairGamesRouter = Router({ mergeParams: true });

findingPairGamesRouter.put(
	'/',
	validateUserGameAccess,
	validateUpdateGameDTO,
	updateGame
);

export default findingPairGamesRouter;
