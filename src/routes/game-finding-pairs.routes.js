import { updateGame } from '#Controllers/game-finding-pairs.controller.js';
import validateUpdateGameDTO from '#Dto/game-finding-pairs-update.dto.js';
import { Router } from 'express';

const findingPairGamesRouter = Router({ mergeParams: true });

findingPairGamesRouter.put('/', validateUpdateGameDTO, updateGame);

export default findingPairGamesRouter;
