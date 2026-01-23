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
      if (!portfolioFile) {
        toast.error('Please upload your portfolio');
        return;
      }

      const formData = new FormData();
      formData.append('portfolio', portfolioFile);

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
        <div className="w-full max-w-lg my-8">
          {/* Register Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 px-16 py-12">
            {/* Title */}
            <div className="mb-8 pt-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">VARA</h2>
              <p className="mt-1 text-sm text-gray-500">Create your account</p>
            </div>

            {/* Form Container */}
            <div className="mt-8 max-w-md mx-auto px-6 py-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
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
              <div className="space-y-2">
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

              

              {/* Phone Number Field */}
              <div className="space-y-2">
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
              <div className="space-y-2">
                <label htmlFor="portfolio-upload" className="block text-sm font-medium text-gray-700">
                  Portfolio <span className="text-red-500">*</span>
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
                    className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white text-sm text-gray-600 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
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
