import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../configs/dbConfig';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists){
       res.status(409).json({ success: false, error: 'User with email already exists!' });
       return;
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashedPass, role: 'ATTENDEE' }
    });

    res.status(201).json({ success: true, data: { id: user.id } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    res.cookie('jwt', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PROD', // Changed PROD → production
      sameSite: 'strict',
      maxAge: 3600000 // 1hr expiration
    }).json({ success: true, data: { role: user.role } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('jwt').json({ success: true });
};