import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Dark Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/Images/image.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 lg:px-20 lg:translate-x-20 text-center text-white">
          <p className="text-sm font-light tracking-[0.3em] mb-8 uppercase">UAE DESIGNERS</p>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            CREATIVE<br />EXCELLENCE
          </h1>
          <p className="text-lg text-gray-300 max-w-md leading-relaxed">
            Where Creativity Meets Community
          </p>
          <p className="text-sm text-gray-400 mt-4 max-w-lg leading-relaxed">
            Join the premier association for UAE's creative professionals. Connect, collaborate, and grow with fellow designers, developers, and creative minds.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Login Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 px-16 py-12">
            {/* Title */}
            <div className="mb-8 pt-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">VARA</h2>
              <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
            </div>

            {/* Form Container */}
            <div className="mt-8 max-w-md mx-auto px-60 py-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-8">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 pr-12 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 h-12 w-full rounded-lg bg-black text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </form>
          </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-black hover:underline transition-all">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
