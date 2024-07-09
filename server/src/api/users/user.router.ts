import { Router } from 'express';
import { loginByEmailSchema, loginByUsernameSchema, signupSchema } from './user.validator';
import UserController from '@/api/users/user.controller';
import { checkSchema } from 'express-validator';
import { validationMiddleware } from '@/middlewares/validation.middleware';

import tryCatchMiddleware from '@/middlewares/tryCatch.middleware';

// import middlewares that handle validaitons (with express-validator)

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

export default router;
