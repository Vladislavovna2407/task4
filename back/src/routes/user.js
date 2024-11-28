import express from 'express'
import { changeStatus, deleteUsers, getAllUsers } from '../models/user.js'
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

        res.json(mappedUsers);
    }));

router.post('/', async function (req, res) {
    const { action, ids } = req.body;

    if (action === 'block' || action == 'unblock') {
        const isActive = action == 'unblock';
        if (await changeStatus(isActive, ids)) {
            res.status(200).json({ isSuccessful: true });
        } else {
            res.status(500).json({
                isSuccessful: false,
                error: 'update is failed'
            });
        }
        return;
    }

    res.end();
})

router.delete('/', async function (req, res) {
    const { ids } = req.body;

    if (await deleteUsers(ids)) {
        res.status(200).json({ isSuccessful: true });
    } else {
        res.status(500).json({
            isSuccessful: false,
            error: 'update is failed'
        });
    }
})

export default router