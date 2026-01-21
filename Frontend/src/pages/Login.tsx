import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [rememberMe, setRememberMe] = useState(false);

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
    <div className="min-h-screen bg-[#080a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Login Card */}
        <div className="bg-[#0c0f16]/95 backdrop-blur-2xl rounded-3xl p-12 border border-[#1e2533] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold italic text-white mb-4 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white/40 text-base">
              Sign in to your account to continue
            </p>
          </motion.div>

          {/* Form */}
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-7">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                icon={<Mail size={20} />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={<Lock size={20} />}
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <div className="flex items-center justify-between mt-8 mb-10">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-white/20 bg-transparent peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200 flex items-center justify-center group-hover:border-white/40">
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-white/50 group-hover:text-white/70 transition-colors">
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-semibold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-[length:200%_100%] hover:bg-right
                text-white text-lg shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </motion.form>

          {/* Sign Up Link */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-10"
          >
            <p className="text-white/40 text-base">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-white font-semibold hover:text-blue-400 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </motion.div>

          {/* Copyright */}
          <div className="text-center mt-10 pt-8 border-t border-white/5">
            <p className="text-white/20 text-sm">© 2026 Vara. All rights reserved.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
