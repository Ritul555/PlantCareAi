import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';

const router = Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your-super-secret-key-change-this-in-production';
const tokenExpireSeconds = parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '1440', 10) * 60;

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, full_name } = req.body || {};
    
    if (!email || !password || !full_name) {
      return res.status(400).json({ detail: 'Full name, email, and password are required' });
    }

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ detail: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.createUser({
      email,
      fullName: full_name,
      hashedPassword,
    });

    const token = jwt.sign({ sub: user.email, id: user.id }, SECRET_KEY, { expiresIn: tokenExpireSeconds });
    
    return res.status(201).json({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.fullName
      }
    });
  } catch (err: any) {
    console.error('Register error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    
    if (!email || !password) {
      return res.status(400).json({ detail: 'Email and password are required' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    const token = jwt.sign({ sub: user.email, id: user.id }, SECRET_KEY, { expiresIn: tokenExpireSeconds });
    
    return res.json({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.fullName
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

export default router;
