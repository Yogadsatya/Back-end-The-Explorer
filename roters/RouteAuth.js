import express from 'express'
import { createUser, login, logout } from '../controllers/AuthControllers.js'
import { Authentication } from '../middleware/Authentication.js';

const router = express.Router()

router.post('/login',login);
router.post('/create',Authentication,createUser);
router.delete('/logout',logout);

export default router