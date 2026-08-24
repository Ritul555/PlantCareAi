import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db';

const router = Router();
const SECRET_KEY = process.env.SECRET_KEY || 'your-super-secret-key-change-this-in-production';
const TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 1440;

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, full_name } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ detail: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      fullName: full_name,
      hashedPassword,
    });

    const token = jwt.sign({ sub: (user as any).email, id: (user as any).id }, SECRET_KEY, { expiresIn: `${TOKEN_EXPIRE}m` });
    
    res.status(201).json({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: (user as any).id,
        email: (user as any).email,
        full_name: (user as any).fullName
      }
    });
  } catch (err) {
    res.status(500).json({ detail: 'Internal server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    const isValid = await bcrypt.compare(password, (user as any).hashedPassword);
    if (!isValid) {
      return res.status(401).json({ detail: 'Incorrect email or password' });
    }

    const token = jwt.sign({ sub: (user as any).email, id: (user as any).id }, SECRET_KEY, { expiresIn: `${TOKEN_EXPIRE}m` });
    
    res.json({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: (user as any).id,
        email: (user as any).email,
        full_name: (user as any).fullName
      }
    });
  } catch (err) {
    res.status(500).json({ detail: 'Internal server error' });
  }
});

export default router;
