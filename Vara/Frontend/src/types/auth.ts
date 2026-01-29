export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  portfolio_link?: string;
  portfolio_file_url?: string;
  category: string;
  other_category?: string;
  is_verified: boolean;
  created_at: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  portfolioLink?: string;
  category: string;
  otherCategory?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}
