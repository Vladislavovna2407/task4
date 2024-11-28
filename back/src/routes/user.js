import express from 'express'
import { changeStatus, deleteUsers, getAllUsers } from '../models/user.js'
import { body, validationResult, matchedData } from 'express-validator'
import HttpError from '../utils/httpError.js';
import asyncUtil from '../utils/asyncUtil.js';

const router = express.Router();

router.get(
    '/',
    asyncUtil(async function (req, res) {
        const users = await getAllUsers();
        const mappedUsers = users.map(user => {
            return {
                id: user.app_user_id,
                name: user.name,
                email: user.email,
                lastSeen: user.last_changed,
                state: user.is_active
            }
        });

        return res.json(mappedUsers);
    }));

router.post(
    '/',
    [
        body('action').isIn(['block', 'unblock', 'delete']),
        body('ids').isArray({ min: 1 })
    ],
    asyncUtil(async function (req, res) {

        const result = validationResult(req)
        if (result.isEmpty()) {
            const { action, ids } = matchedData(req)

            switch (action) {
                case 'block':
                    await changeStatus(false, ids)
                    break;
                case 'unblock':
                    await changeStatus(true, ids)
                    break;
                case 'delete':
                    await deleteUsers(ids)
                    break;
            }

            return res.status(200).end()
        }


        throw new HttpError(400, "The input is not valid", result.array())
    }))

export default router