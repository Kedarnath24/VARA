import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Phone,
  Linkedin,
  Link as LinkIcon,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { FileUpload } from '@/components/auth/FileUpload';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^(\+971|00971|0)?[0-9]{9}$/, 'Please enter a valid UAE phone number'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number')
    .regex(/[@$!%*?&]/, 'Password must contain a special character'),
  confirmPassword: z.string(),
  linkedinUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  portfolioLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  behanceUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  dribbbleUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  instagramHandle: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Professional Links', icon: LinkIcon },
  { id: 3, title: 'Portfolio Upload', icon: Upload },
];

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [imagesFile, setImagesFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const nextStep = async () => {
    const fieldsToValidate = currentStep === 1
      ? ['name', 'email', 'phone', 'password', 'confirmPassword']
      : currentStep === 2
      ? ['linkedinUrl', 'portfolioLink', 'behanceUrl', 'dribbbleUrl', 'instagramHandle']
      : [];

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      if (portfolioFile) formData.append('portfolio', portfolioFile);
      if (imagesFile) formData.append('images', imagesFile);

      await registerUser(data, formData);
      toast.success('Registration successful! Welcome to Vara');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Vara</h1>
          <p className="text-gray-400">Join UAE's Premier Design Community</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                    backgroundColor:
                      currentStep > step.id
                        ? 'rgba(255, 255, 255, 1)'
                        : currentStep === step.id
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-lg border ${
                    currentStep >= step.id ? 'border-white/30' : 'border-white/10'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="text-black" size={24} />
                  ) : (
                    <step.icon
                      className={currentStep === step.id ? 'text-white' : 'text-gray-500'}
                      size={24}
                    />
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-sm ${
                    currentStep === step.id ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 transition-colors duration-300 ${
                    currentStep > step.id ? 'bg-white' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                  
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    icon={<User size={20} />}
                    error={errors.name?.message}
                    {...register('name')}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    icon={<Mail size={20} />}
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <Input
                    label="Phone Number"
                    placeholder="+971 XX XXX XXXX"
                    icon={<Phone size={20} />}
                    error={errors.phone?.message}
                    {...register('phone')}
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="Create a strong password"
                    icon={<Lock size={20} />}
                    error={errors.password?.message}
                    {...register('password')}
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your password"
                    icon={<Lock size={20} />}
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Professional Links</h2>
                  <p className="text-gray-400 mb-6">Share your online presence (all optional)</p>

                  <Input
                    label="LinkedIn Profile"
                    placeholder="https://linkedin.com/in/yourprofile"
                    icon={<Linkedin size={20} />}
                    error={errors.linkedinUrl?.message}
                    {...register('linkedinUrl')}
                  />

                  <Input
                    label="Portfolio Website"
                    placeholder="https://yourportfolio.com"
                    icon={<LinkIcon size={20} />}
                    error={errors.portfolioLink?.message}
                    {...register('portfolioLink')}
                  />

                  <Input
                    label="Behance Profile"
                    placeholder="https://behance.net/yourprofile"
                    icon={<LinkIcon size={20} />}
                    error={errors.behanceUrl?.message}
                    {...register('behanceUrl')}
                  />

                  <Input
                    label="Dribbble Profile"
                    placeholder="https://dribbble.com/yourprofile"
                    icon={<LinkIcon size={20} />}
                    error={errors.dribbbleUrl?.message}
                    {...register('dribbbleUrl')}
                  />

                  <Input
                    label="Instagram Handle"
                    placeholder="@yourhandle"
                    icon={<LinkIcon size={20} />}
                    error={errors.instagramHandle?.message}
                    {...register('instagramHandle')}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Upload Portfolio</h2>
                  <p className="text-gray-400 mb-6">Showcase your best work</p>

                  <FileUpload
                    label="Portfolio PDF"
                    accept=".pdf"
                    maxSize={10}
                    onFileSelect={setPortfolioFile}
                    file={portfolioFile}
                  />

                  <FileUpload
                    label="Image Gallery (ZIP)"
                    accept=".zip"
                    maxSize={50}
                    onFileSelect={setImagesFile}
                    file={imagesFile}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  className="flex items-center"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Previous
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  type="button"
                  variant="default"
                  onClick={nextStep}
                  className="ml-auto flex items-center"
                >
                  Next
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  className="ml-auto"
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              )}
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-white font-medium hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
