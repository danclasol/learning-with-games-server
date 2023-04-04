import {
	createUser,
	deleteUser,
	getCurrentUser,
	getUserById,
	updateUser,
} from '#Controllers/users.controller.js';
import validateNewUserDTO from '#Dto/user-new.dto.js';
import validateUpdateUserDTO from '#Dto/user-update.dto.js';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/account', getCurrentUser);
usersRouter.get('/:id', getUserById);
usersRouter.post('/', validateNewUserDTO, createUser);
usersRouter.put('/:id', validateUpdateUserDTO, updateUser);
usersRouter.delete('/:id', deleteUser);

export default usersRouter;
