import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../config/supabase';
import { generateToken } from '../utils/jwt';
import { uploadToSupabase } from '../utils/fileUpload';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const {
      name,
      email,
      password,
      phone,
      portfolioLink,
      category,
      otherCategory,
    }: RegisterRequest = req.body;

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file uploads (optional - skip if bucket doesn't exist)
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let portfolioFileUrl: string | undefined;

    if (files?.portfolio) {
      try {
        portfolioFileUrl = await uploadToSupabase(
          files.portfolio[0],
          'portfolios',
          email
        );
      } catch (uploadError: any) {
        console.log('File upload skipped:', uploadError.message);
        // Continue without file upload - user can add portfolio link instead
      }
    }

    // Create user in database
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          phone,
          portfolio_link: portfolioLink,
          portfolio_file_url: portfolioFileUrl,
          category,
          other_category: otherCategory,
          is_verified: false,
        },
      ])
      .select('id, name, email, phone, category, created_at')
      .single();

    if (insertError) {
      res.status(500).json({
        success: false,
        message: 'Failed to create user',
        error: insertError.message,
      });
      return;
    }

    // Generate JWT token
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
    });

    const response: AuthResponse = {
      success: true,
      message: 'Registration successful',
      data: {
        user: newUser,
        token,
      },
    };

    res.status(201).json(response);
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { email, password }: LoginRequest = req.body;

    // Find user by email
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const response: AuthResponse = {
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token,
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, name, email, phone, portfolio_link, portfolio_file_url, category, other_category, is_verified, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
