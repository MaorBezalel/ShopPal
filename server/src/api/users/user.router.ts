import { Router } from 'express';
import { loginByEmailSchema, loginByUsernameSchema, signupSchema, updateUserSchema, deleteUserSchema } from './user.validator';
import UserController from '@/api/users/user.controller';
import { check, checkSchema } from 'express-validator';
import { validationMiddleware } from '@/middlewares/validation.middleware';

import authorizationMiddleware from '@/middlewares/authorization.middleware';

import tryCatchMiddleware from '@/middlewares/tryCatch.middleware';


const router = Router();

router.post('/signup', checkSchema(signupSchema), validationMiddleware, tryCatchMiddleware(UserController.signup));

router.post(
    '/loginByUsername',
    checkSchema(loginByUsernameSchema),
    validationMiddleware,
    tryCatchMiddleware(UserController.login)
);

router.post(
    '/loginByEmail',
    checkSchema(loginByEmailSchema),
    validationMiddleware,
    tryCatchMiddleware(UserController.login)
);

router.put('/:user_id', 
    authorizationMiddleware, 
    checkSchema(updateUserSchema), 
    validationMiddleware, 
    tryCatchMiddleware(UserController.updateUser));

router.delete('/:user_id',
    authorizationMiddleware,
    checkSchema(deleteUserSchema),
    validationMiddleware,
    tryCatchMiddleware(UserController.deleteUser));

export default router;
