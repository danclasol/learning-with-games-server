import { updateGame } from '#Controllers/game-quiz.controller.js';
import validateUpdateGameDTO from '#Dto/game-quiz-update.dto.js';
import validateUserGameAccess from '#Middlewares/validate-game-access.js';
import { Router } from 'express';

const quizGamesRouter = Router({ mergeParams: true });

quizGamesRouter.put(
	'/',
	validateUserGameAccess,
	validateUpdateGameDTO,
	updateGame
);

export default quizGamesRouter;
