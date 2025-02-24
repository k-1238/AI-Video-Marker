import { NextApiRequest, NextApiResponse } from 'next';
import { ConnectDB } from '../../../config/db';
import { UserModel } from '../../../models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface RegisterRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
    userName: string;
    phoneNumber: string;
  };
}

export default async function register(req: RegisterRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await ConnectDB();

    const { email, password, userName, phoneNumber } = req.body;

    // Validate inputs
    if (!email || !password || !userName || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailToLowerCase = email.toLowerCase();

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email: emailToLowerCase });
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = await UserModel.create({
      email: emailToLowerCase,
      password: hashPassword,
      userName,
      phoneNumber,
    });

    if (!newUser) {
      return res.status(500).json({ message: 'User registration failed' });
    }

    const userPayload = {
      id: newUser._id,
      email: newUser.email,
      username: newUser.userName,
    };

    const accessToken = jwt.sign(userPayload, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: userPayload,
      token: accessToken,
      expiresIn: '1d',
    });
  } catch (error: any) {
    console.error('Error in user registration:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
