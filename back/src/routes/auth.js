import express from 'express'
import { createUser, findUser } from '../models/user.js'
import { body, validationResult, matchedData } from 'express-validator'
import HttpError from '../utils/httpError.js';
import asyncUtil from '../utils/asyncUtil.js';

const router = express.Router();

router.post(
    '/register',
    [
        body('email').notEmpty().isEmail(),
        body('name').notEmpty(),
        body('password').notEmpty()
    ],
    asyncUtil(async function (req, res) {
        const result = validationResult(req);
        if (result.isEmpty()) {
            await createUser(matchedData(req));
            return res.status(200).end();
        }

        throw new HttpError(400, "The input is not valid", result.array())
    }));

router.post(
    '/login',
    [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty()
    ],
    asyncUtil(async function (req, res) {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const user = await findUser(matchedData(req));
            if (!user) {
                throw new HttpError(400, "The user not found")
            }

            if (!user.is_active) {
                throw new HttpError(400, "The user is blocked")
            }

            return res.status(200).end();
        }

        throw new HttpError(400, "The input is not valid", result.array())
    }));

export default router