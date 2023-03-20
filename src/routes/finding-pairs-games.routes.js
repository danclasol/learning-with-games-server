import validateUpdateGameDTO from '#Dto/game-update.dto.js';
import { Router } from 'express';

import {
	addPairToGame,
	deletePairFromGame,
	updateGame,
	updatePairFromGame,
} from '#Controllers/finding-pairs-games.controller.js';
import validateNewPairDTO from '#Dto/finding-pairs-game-add-pair.dto.js';
import validateUpdatePairDTO from '#Dto/finding-pairs-game-update-pair.dto.js';

const findingPairGamesRouter = Router({ mergeParams: true });

findingPairGamesRouter.put('/', validateUpdateGameDTO, updateGame);
findingPairGamesRouter.post('/pairs', validateNewPairDTO, addPairToGame);
findingPairGamesRouter.put(
	'/pairs/:pairId',
	validateUpdatePairDTO,
	updatePairFromGame
);
findingPairGamesRouter.delete('/pairs/:pairId', deletePairFromGame);

export default findingPairGamesRouter;
