import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  phone: z.string().min(1, 'Phone number is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      if (portfolioFile) formData.append('portfolio', portfolioFile);

      await registerUser(data, formData);
      toast.success('Registration successful! Welcome to Vara');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size <= 10 * 1024 * 1024) { // 10MB
        setPortfolioFile(file);
      } else {
        toast.error('File size must be less than 10MB');
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
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
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <p className="text-sm font-light tracking-[0.3em] mb-8 uppercase">UAE DESIGNERS</p>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            JOIN THE<br />COMMUNITY
          </h1>
          <p className="text-lg text-gray-300 max-w-md leading-relaxed">
            Start Your Creative Journey
          </p>
          <p className="text-sm text-gray-400 mt-4 max-w-lg leading-relaxed">
            Become a part of UAE's most prestigious creative association. Access exclusive events, showcase your portfolio, and connect with industry leaders.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg my-8">
          {/* Register Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">VARA</h2>
              <p className="mt-1 text-sm text-gray-500">Create your account</p>
            </div>

            {/* Form Container with Gray Background */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-gray-800">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register('name')}
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-800">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-800">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min. 8 characters)"
                    {...register('password')}
                    className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-800">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    {...register('confirmPassword')}
                    className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-gray-800">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register('phone')}
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/30"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Portfolio Upload Field */}
              <div className="space-y-2">
                <label htmlFor="portfolio-upload" className="text-sm font-semibold text-gray-800">
                  Portfolio (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.zip,.rar"
                    onChange={handleFileChange}
                    className="hidden"
                    id="portfolio-upload"
                  />
                  <label
                    htmlFor="portfolio-upload"
                    className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white text-sm text-gray-600 transition hover:border-gray-400 hover:bg-gray-50"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    {portfolioFile ? portfolioFile.name : 'Upload PDF or ZIP'}
                  </label>
                </div>
                <p className="text-xs text-gray-500">Max file size: 10MB</p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
              >
                {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
              </form>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <button
              type="button"
              className="h-12 w-full rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>

            {/* Sign In Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-black hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
