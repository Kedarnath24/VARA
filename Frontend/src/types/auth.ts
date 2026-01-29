export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  portfolio_link?: string;
  behance_url?: string;
  dribbble_url?: string;
  instagram_handle?: string;
  portfolio_pdf_url?: string;
  image_gallery_url?: string;
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
  linkedinUrl?: string;
  portfolioLink?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  instagramHandle?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}
