import express from 'express';
import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/users.js';
import { auth } from '../Authentication/auth_check.js';
const router = express.Router();

router.get('/', getUsers);

router.post('/',auth, createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

export default router;