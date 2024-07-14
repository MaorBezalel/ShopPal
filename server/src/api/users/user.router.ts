import { Router } from 'express';
import {
    loginByEmailSchema,
    loginByUsernameSchema,
    signupSchema,
    updateUserSchema,
    deleteUserSchema,
} from './user.validator';
import UserController from '@/api/users/user.controller';
import { checkSchema } from 'express-validator';
import { validationMiddleware } from '@/middlewares/validation.middleware';

import authorizationMiddleware from '@/middlewares/authorization.middleware';

import tryCatchMiddleware from '@/middlewares/tryCatch.middleware';

const router = Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: User Signup
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 description: User's username (should be at least 3 characters, alphanumeric and underscores only).
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 maxLength: 18
 *                 description: User's password (should be between 6 and 18 characters).
 *               gender:
 *                 type: string
 *                 enum:
 *                   - male
 *                   - female
 *                   - other
 *               name_details:
 *                 type: object
 *                 properties:
 *                   first_name:
 *                     type: string
 *                     description: User's first name.
 *                   middle_name:
 *                     type: string
 *                     description: User's middle name (optional).
 *                   last_name:
 *                     type: string
 *                     description: User's last name.
 *                 description: Details about the user's name.
 *               address:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                     description: User's country of residence.
 *                   city:
 *                     type: string
 *                     description: User's city of residence.
 *                   street:
 *                     type: string
 *                     description: User's street address.
 *                 description: User's address details.
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *                  properties:
 *                      accessToken:
 *                      type: string
 *                      description: JWT access token for the newly created user.
 *                  user:
 *                      type: object
 *                      description: Details of the created user.
 *       '400':
 *         description: Invalid request payload.
 *       '500':
 *         description: Internal server error.
 */
router.post('/signup', checkSchema(signupSchema), validationMiddleware, tryCatchMiddleware(UserController.signup));

/**
 * @swagger
 * /user/loginByUsername:
 *   post:
 *     summary: Authenticate a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post(
    '/loginByUsername',
    checkSchema(loginByUsernameSchema),
    validationMiddleware,
    tryCatchMiddleware(UserController.login)
);

/**
 * @swagger
 * /user/loginByEmail:
 *   post:
 *     summary: Authenticate a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post(
    '/loginByEmail',
    checkSchema(loginByEmailSchema),
    validationMiddleware,
    tryCatchMiddleware(UserController.login)
);

/**
 * @swagger
 * /user/{userId}:
 *   patch:
 *     summary: Update a user's information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.patch(
    '/:user_id',
    authorizationMiddleware,
    checkSchema(updateUserSchema),
    validationMiddleware,
    tryCatchMiddleware(UserController.updateUser)
);

/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
    '/:user_id',
    authorizationMiddleware,
    checkSchema(deleteUserSchema),
    validationMiddleware,
    tryCatchMiddleware(UserController.deleteUser)
);

export default router;
