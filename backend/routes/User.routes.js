import express from 'express';
import { getUsers } from '../controller/User.controller.js';
import { addUser } from '../controller/User.controller.js';
import { deleteUser } from '../controller/User.controller.js';
const router = express.Router();

router.get('/', getUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);

export default router;

