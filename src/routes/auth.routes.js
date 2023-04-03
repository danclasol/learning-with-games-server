import userLoginDTO from '#Dto/user-login.dto.js';
import userRegisterDTO from '#Dto/user-register.dto.js';
import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login', userLoginDTO, login);
authRouter.post('/register', userRegisterDTO, register);
// authRouter.post('/refresh', refreshToken);

export default authRouter;
