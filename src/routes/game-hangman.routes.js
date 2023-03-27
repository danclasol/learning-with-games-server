import { updateGame } from '#Controllers/game-hangman.controller.js';
import validateUpdateGameDTO from '#Dto/game-hangman-update.dto.js';
import { Router } from 'express';

const hangmanGamesRouter = Router({ mergeParams: true });

hangmanGamesRouter.put('/', validateUpdateGameDTO, updateGame);

export default hangmanGamesRouter;
