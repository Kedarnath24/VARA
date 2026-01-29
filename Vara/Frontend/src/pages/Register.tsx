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
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(1, 'Phone number is required'),
  portfolioLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  category: z.enum(['designer', 'graphic-designer', 'web-developer', 'other'] as const, {
    message: 'Category is required',
  }),
  otherCategory: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const selectedCategory = watch('category');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      if (!portfolioFile && !data.portfolioLink?.trim()) {
        toast.error('Please upload your portfolio or add a link');
        return;
      }

      const formData = new FormData();
      if (portfolioFile) {
        formData.append('portfolio', portfolioFile);
      }

      const registerData = {
        ...data,
        confirmPassword: data.password,
      };

      await registerUser(registerData, formData);
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
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 lg:px-20 lg:translate-x-20 text-center text-white">
          <div className="max-w-lg">
            <p className="mb-8 text-sm font-light uppercase tracking-[0.3em]">UAE DESIGNERS</p>
            <h1 className="mb-6 text-6xl font-bold leading-tight">
              JOIN THE
              <br />
              COMMUNITY
            </h1>
            <p className="text-lg leading-relaxed text-gray-300">
              Start Your Creative Journey
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Become a part of UAE's most prestigious creative association. Access exclusive events, showcase your portfolio, and connect with industry leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg my-8 flex flex-col items-center">
          {/* Logo */}
          <div className="logo-container flex flex-col items-center mb-8">
          <img src="/Images/image logo.png" alt="VARA Logo" className="w-30 h-30 mx-auto mb-4 object-contain" />
          </div>
          {/* Register Form Card */}
          <div className="login-card bg-white rounded-2xl shadow-xl border border-gray-200 overflow-y-auto max-h-[80vh]">
            {/* Title */}
            <div className="mb-8 pt-2 text-center">
              
              <h2 className="login-title text-3xl font-bold tracking-tight text-gray-900">VARA</h2>
              <p className="login-description mt-1 text-sm text-gray-500">Create your account</p>
            </div>

            {/* Form Container */}
            <div className="max-w-md mx-auto items-center">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Field */}
              <div className="form-group space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...register('name')}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group space-y-2">
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
              <div className="form-group space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password (min 8 characters)"
                    {...register('password')}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 pr-12 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="form-group space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register('phone')}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Portfolio Upload Field */}
              <div className="form-group space-y-2">
                <label htmlFor="portfolio-upload" className="block text-sm font-medium text-gray-700">
                  Portfolio Upload <span className="text-red-500">*</span>
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
                    className="file-upload-label text-center"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    {portfolioFile ? portfolioFile.name : 'Upload PDF or ZIP'}
                  </label>
                </div>
                <p className="text-xs text-gray-500">Max file size: 10MB</p>
              </div>

              <p className="text-center text-xs text-gray-500">(or)</p>

              {/* Portfolio Link Field */}
              <div className="form-group space-y-2">
                <label htmlFor="portfolioLink" className="block text-sm font-medium text-gray-700">
                  Portfolio Link <span className="text-red-500">*</span>
                </label>
                <input
                  id="portfolioLink"
                  type="url"
                  placeholder="https://your-portfolio.com"
                  {...register('portfolioLink')}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
                />
                {errors.portfolioLink && (
                  <p className="text-xs text-red-500 mt-1">{errors.portfolioLink.message}</p>
                )}
              </div>

              {/* Category Field */}
              <div className="form-group space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-black outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
                >
                  <option value="">Select a category</option>
                  <option value="designer">Designer</option>
                  <option value="graphic-designer">Graphic Designer</option>
                  <option value="web-developer">Web Developer</option>
                  <option value="other">Others</option>
                </select>
                {errors.category && (
                  <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
                )}
              </div>

              {selectedCategory === 'other' && (
                <div className="form-group space-y-2">
                  <label htmlFor="otherCategory" className="block text-sm font-medium text-gray-700">
                    Please specify <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="otherCategory"
                    type="text"
                    placeholder="Enter your category"
                    {...register('otherCategory', { required: selectedCategory === 'other' })}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-black placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10"
                  />
                  {errors.otherCategory && (
                    <p className="text-xs text-red-500 mt-1">Please specify your category</p>
                  )}
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 h-12 w-full rounded-lg bg-black text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
              </form>
            </div>

            {/* Sign In Link */}
            <div className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-black hover:underline transition-all">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
