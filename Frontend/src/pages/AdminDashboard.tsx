import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Settings,
  HelpCircle,
  CheckCircle2,
  Shield,
  Search,
  Sun,
  Moon,
  Sparkles,
  Download,
  Eye,
  Users,
  Clock,
  TrendingUp,
  FileText,
  UserPlus,
  Activity,
  XCircle,
  Wallet,
  Receipt,
  CircleDollarSign,
  PiggyBank,
  ArrowUpCircle,
  ArrowDownCircle,
  BarChart3,
  Building2,
  ShoppingCart,
  Megaphone,
  Calendar,
  Send,
  Briefcase,
  Award,
  Heart,
  Link as LinkIcon,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  User,
  Lock,
  Unlock,
  Edit,
  Trash2,
  Plus,
  Check,
  MessageCircle,
  FileDown,
  Table,
  DollarSign,
} from 'lucide-react';

// Types
interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  avatarUrl?: string;
  adminSince: string;
}

interface MemberAccount {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  status: 'approved' | 'pending' | 'rejected';
  dateJoined: string;
  expiryDate: string;
  phone: string;
  lastActive: string;
  // Extended registration details
  gender: string;
  ageCategory: string;
  bloodGroup: string;
  profilePhoto: string;
  varaWhatsappGroup: string;
  companyName: string;
  jobTitle: string;
  visaStatus: string;
  yearsInUAE: string;
  monthsInUAE: string;
  totalIndustryExperience: string;
  primaryAreaOfWork: string;
  skillsets: string[];
  otherSkill: string;
  portfolioLink: string;
  interestedInVolunteering: string;
  volunteeringAreas: string[];
  country: string;
  emirate: string;
  areaName: string;
  countryCode: string;
  contactNumber: string;
  whatsappCountryCode: string;
  whatsappNumber: string;
  keralaDistrict: string;
  proceedWithMembershipFee: string;
  message: string;
}

interface MembershipProof {
  id: string;
  memberId: string;
  memberName: string;
  documentType: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
  fileUrl: string;
}

interface PendingMemberApplication {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  ageCategory: string;
  bloodGroup: string;
  profilePhoto: string;
  varaWhatsappGroup: string;
  companyName: string;
  jobTitle: string;
  visaStatus: string;
  yearsInUAE: string;
  monthsInUAE: string;
  totalIndustryExperience: string;
  primaryAreaOfWork: string;
  skillsets: string[];
  otherSkill: string;
  portfolioLink: string;
  interestedInVolunteering: string;
  volunteeringAreas: string[];
  country: string;
  emirate: string;
  areaName: string;
  countryCode: string;
  contactNumber: string;
  whatsappCountryCode: string;
  whatsappNumber: string;
  keralaDistrict: string;
  proceedWithMembershipFee: string;
  message: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface DashboardStat {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: any;
}

interface IncomeRecord {
  id: string;
  source: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'received' | 'pending';
  paymentMode: string;
}

interface ExpenseRecord {
  id: string;
  category: string;
  vendor: string;
  description: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  paymentMode: string;
}

interface BalanceSheetItem {
  category: string;
  label: string;
  amount: number;
  paymentMode: string;
  type: 'income' | 'expense';
}

  interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    registrationLink: string;
    status: 'draft' | 'published';
    createdAt: string;
    maxParticipants?: number;
    category: string;
    bannerImage?: string;
  }

  interface Announcement {
    id: string;
    title: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
    type: 'news' | 'alert' | 'update' | 'general';
    status: 'draft' | 'published';
    createdAt: string;
    expiryDate?: string;
  }

  interface Job {
  id: string;
  jobTitle: string;
  description: string;
  role: string;
  applicationLink: string;
  applyByDate: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  salary?: string;
  status: 'draft' | 'published';
  createdAt: string;
  applicants: JobApplicant[];
}

interface JobApplicant {
  id: string;
  jobId: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'rejected' | 'hired';
  resumeLink?: string;
  coverLetter?: string;
}

interface Permission {
  id: string;
  module: string;
  label: string;
  description: string;
  icon: any;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // Array of permission IDs
  createdAt: string;
  color: string;
}

interface BoardMember {
  id: string;
  name: string;
  email: string;
  roleId: string;
  assignedDate: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

// Mock Data
const mockAdminProfile: AdminProfile = {
  name: 'Sarah Johnson',
  email: 'admin@vara.org',
  phone: '+1 (555) 987-6543',
  role: 'Administrator',
  department: 'Membership Management',
  adminSince: 'March 2022',
};

const mockAccounts: MemberAccount[] = [
  {
    id: 'VARA-2024-001',
    name: 'John Anderson',
    email: 'john.anderson@email.com',
    membershipType: 'Premium',
    status: 'approved',
    dateJoined: '2024-01-15',
    expiryDate: '2025-01-15',
    phone: '+1 (555) 111-2222',
    lastActive: '2025-01-28',
    gender: 'Male',
    ageCategory: '31-40',
    bloodGroup: 'O+',
    profilePhoto: 'https://avatar.iran.liara.run/public/boy',
    varaWhatsappGroup: 'Yes',
    companyName: 'Tech Solutions Inc',
    jobTitle: 'Senior Software Engineer',
    visaStatus: 'Employment Visa',
    yearsInUAE: '5',
    monthsInUAE: '3',
    totalIndustryExperience: '10 years',
    primaryAreaOfWork: 'Software Development',
    skillsets: ['React', 'Node.js', 'TypeScript', 'AWS'],
    otherSkill: 'Cloud Architecture',
    portfolioLink: 'https://johnanderson.dev',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Mentorship', 'Technical Workshops'],
    country: 'United Arab Emirates',
    emirate: 'Dubai',
    areaName: 'Dubai Marina',
    countryCode: '+971',
    contactNumber: '50 111 2222',
    whatsappCountryCode: '+971',
    whatsappNumber: '50 111 2222',
    keralaDistrict: 'Ernakulam',
    proceedWithMembershipFee: 'Yes',
    message: 'Excited to be part of the VARA community!',
  },
  {
    id: 'VARA-2024-002',
    name: 'Emma Rodriguez',
    email: 'emma.r@email.com',
    membershipType: 'Standard',
    status: 'pending',
    dateJoined: '2024-01-20',
    expiryDate: '2025-01-20',
    phone: '+1 (555) 333-4444',
    lastActive: '2025-01-29',
    gender: 'Female',
    ageCategory: '26-30',
    bloodGroup: 'A+',
    profilePhoto: 'https://avatar.iran.liara.run/public/girl',
    varaWhatsappGroup: 'Yes',
    companyName: 'Digital Marketing Pro',
    jobTitle: 'Marketing Manager',
    visaStatus: 'Employment Visa',
    yearsInUAE: '3',
    monthsInUAE: '6',
    totalIndustryExperience: '7 years',
    primaryAreaOfWork: 'Digital Marketing',
    skillsets: ['SEO', 'Content Marketing', 'Social Media', 'Analytics'],
    otherSkill: 'Email Marketing',
    portfolioLink: 'https://emmarodriguez.com',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Social Media Management', 'Marketing Workshops'],
    country: 'United Arab Emirates',
    emirate: 'Dubai',
    areaName: 'JLT',
    countryCode: '+971',
    contactNumber: '55 333 4444',
    whatsappCountryCode: '+971',
    whatsappNumber: '55 333 4444',
    keralaDistrict: 'Kottayam',
    proceedWithMembershipFee: 'No',
    message: 'Looking forward to networking opportunities.',
  },
  {
    id: 'VARA-2024-003',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    membershipType: 'Premium',
    status: 'approved',
    dateJoined: '2023-12-10',
    expiryDate: '2024-12-10',
    phone: '+1 (555) 555-6666',
    lastActive: '2025-01-30',
    gender: 'Male',
    ageCategory: '31-40',
    bloodGroup: 'B+',
    profilePhoto: 'https://avatar.iran.liara.run/public/boy',
    varaWhatsappGroup: 'Yes',
    companyName: 'Design Studio LLC',
    jobTitle: 'UX Designer',
    visaStatus: 'Employment Visa',
    yearsInUAE: '4',
    monthsInUAE: '2',
    totalIndustryExperience: '9 years',
    primaryAreaOfWork: 'UX Design',
    skillsets: ['Figma', 'Adobe XD', 'User Research', 'Wireframing'],
    otherSkill: 'Prototyping',
    portfolioLink: 'https://michaelchen.design',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Design Workshops', 'Mentorship'],
    country: 'United Arab Emirates',
    emirate: 'Dubai',
    areaName: 'Downtown',
    countryCode: '+971',
    contactNumber: '52 555 6666',
    whatsappCountryCode: '+971',
    whatsappNumber: '52 555 6666',
    keralaDistrict: 'Thrissur',
    proceedWithMembershipFee: 'Yes',
    message: 'Happy to contribute my design expertise.',
  },
  {
    id: 'VARA-2024-004',
    name: 'Lisa Thompson',
    email: 'lisa.t@email.com',
    membershipType: 'Standard',
    status: 'rejected',
    dateJoined: '2024-01-25',
    expiryDate: '2025-01-25',
    phone: '+1 (555) 777-8888',
    lastActive: '2025-01-27',
    gender: 'Female',
    ageCategory: '26-30',
    bloodGroup: 'AB+',
    profilePhoto: 'https://avatar.iran.liara.run/public/girl',
    varaWhatsappGroup: 'No',
    companyName: 'Freelance',
    jobTitle: 'Content Writer',
    visaStatus: 'Freelance Visa',
    yearsInUAE: '2',
    monthsInUAE: '1',
    totalIndustryExperience: '5 years',
    primaryAreaOfWork: 'Content Writing',
    skillsets: ['Copywriting', 'Blog Writing', 'SEO Writing'],
    otherSkill: 'Editing',
    portfolioLink: 'https://lisathompson.writer',
    interestedInVolunteering: 'No',
    volunteeringAreas: [],
    country: 'United Arab Emirates',
    emirate: 'Dubai',
    areaName: 'Al Barsha',
    countryCode: '+971',
    contactNumber: '56 777 8888',
    whatsappCountryCode: '+971',
    whatsappNumber: '56 777 8888',
    keralaDistrict: 'Kozhikode',
    proceedWithMembershipFee: 'No',
    message: 'Interested in joining the community.',
  },
  {
    id: 'VARA-2024-005',
    name: 'David Park',
    email: 'dpark@email.com',
    membershipType: 'Premium',
    status: 'approved',
    dateJoined: '2024-01-05',
    expiryDate: '2025-01-05',
    phone: '+1 (555) 999-0000',
    lastActive: '2025-01-30',
    gender: 'Male',
    ageCategory: '31-40',
    bloodGroup: 'O-',
    profilePhoto: 'https://avatar.iran.liara.run/public/boy',
    varaWhatsappGroup: 'Yes',
    companyName: 'Data Analytics Corp',
    jobTitle: 'Data Scientist',
    visaStatus: 'Employment Visa',
    yearsInUAE: '6',
    monthsInUAE: '9',
    totalIndustryExperience: '12 years',
    primaryAreaOfWork: 'Data Science',
    skillsets: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    otherSkill: 'Deep Learning',
    portfolioLink: 'https://davidpark.ai',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Data Workshops', 'Technical Mentorship'],
    country: 'United Arab Emirates',
    emirate: 'Abu Dhabi',
    areaName: 'Al Reem Island',
    countryCode: '+971',
    contactNumber: '50 999 0000',
    whatsappCountryCode: '+971',
    whatsappNumber: '50 999 0000',
    keralaDistrict: 'Thiruvananthapuram',
    proceedWithMembershipFee: 'Yes',
    message: 'Looking forward to data science collaborations.',
  },
];

// Commented out since replaced with pending applications
/* const mockProofs: MembershipProof[] = [
  {
    id: 'PROOF-001',
    memberId: 'VARA-2024-001',
    memberName: 'John Anderson',
    documentType: 'ID Card',
    uploadDate: '2024-01-15',
    status: 'verified',
    fileUrl: '/uploads/proof1.jpg',
  },
  {
    id: 'PROOF-002',
    memberId: 'VARA-2024-002',
    memberName: 'Emma Rodriguez',
    documentType: 'Passport',
    uploadDate: '2024-01-20',
    status: 'pending',
    fileUrl: '/uploads/proof2.jpg',
  },
  {
    id: 'PROOF-003',
    memberId: 'VARA-2024-003',
    memberName: 'Michael Chen',
    documentType: 'Driver License',
    uploadDate: '2023-12-10',
    status: 'verified',
    fileUrl: '/uploads/proof3.jpg',
  },
  {
    id: 'PROOF-004',
    memberId: 'VARA-2024-005',
    memberName: 'David Park',
    documentType: 'ID Card',
    uploadDate: '2024-01-05',
    status: 'verified',
    fileUrl: '/uploads/proof4.jpg',
  },
]; */

const mockPendingApplications: PendingMemberApplication[] = [
  {
    id: 'APP-2026-001',
    fullName: 'Ahmed Al Mansoori',
    email: 'ahmed.mansoori@email.com',
    gender: 'Male',
    ageCategory: '32-38',
    bloodGroup: 'O+',
    profilePhoto: '/uploads/ahmed-profile.jpg',
    varaWhatsappGroup: 'Yes',
    companyName: 'Creative Hub Dubai',
    jobTitle: 'Senior UI/UX Designer',
    visaStatus: 'Employment Visa',
    yearsInUAE: '5',
    monthsInUAE: '7',
    totalIndustryExperience: '8',
    primaryAreaOfWork: 'Digital Design & User Experience',
    skillsets: ['UI/UX Design', 'Graphic Design', 'Web Development', 'Motion Graphics'],
    otherSkill: 'Figma, Adobe Creative Suite, Webflow',
    portfolioLink: 'https://behance.net/ahmedmansoori',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Event Management', 'Creative Support', 'Workshops'],
    country: 'UAE',
    emirate: 'Dubai',
    areaName: 'Business Bay',
    countryCode: '+971',
    contactNumber: '50 234 5678',
    whatsappCountryCode: '+971',
    whatsappNumber: '50 234 5678',
    keralaDistrict: 'Kozhikode',
    proceedWithMembershipFee: 'Yes',
    message: 'Excited to join VARA and contribute to the creative community!',
    applicationDate: '2026-01-28',
    status: 'pending',
  },
  {
    id: 'APP-2026-002',
    fullName: 'Priya Nair',
    email: 'priya.nair@email.com',
    gender: 'Female',
    ageCategory: '25-31',
    bloodGroup: 'A+',
    profilePhoto: '/uploads/priya-profile.jpg',
    varaWhatsappGroup: 'No',
    companyName: 'MediaWorks FZ LLC',
    jobTitle: 'Brand Strategist & Content Creator',
    visaStatus: 'Employment Visa',
    yearsInUAE: '3',
    monthsInUAE: '2',
    totalIndustryExperience: '6',
    primaryAreaOfWork: 'Marketing & Brand Strategy',
    skillsets: ['Social Media Marketing', 'Content Creation', 'Graphic Design', 'Photography'],
    otherSkill: 'Video Editing, Copywriting',
    portfolioLink: 'https://dribbble.com/priyanair',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Media & PR', 'Women Empowerment Wing', 'Community Support'],
    country: 'UAE',
    emirate: 'Dubai',
    areaName: 'JLT',
    countryCode: '+971',
    contactNumber: '56 789 1234',
    whatsappCountryCode: '+971',
    whatsappNumber: '56 789 1234',
    keralaDistrict: 'Ernakulam',
    proceedWithMembershipFee: 'Yes',
    message: 'Looking forward to networking with fellow creatives and sharing knowledge.',
    applicationDate: '2026-01-29',
    status: 'pending',
  },
  {
    id: 'APP-2026-003',
    fullName: 'Rahul Krishnan',
    email: 'rahul.k@email.com',
    gender: 'Male',
    ageCategory: '25-31',
    bloodGroup: 'B+',
    profilePhoto: '/uploads/rahul-profile.jpg',
    varaWhatsappGroup: 'Yes',
    companyName: 'TechVision Solutions',
    jobTitle: 'Full Stack Developer',
    visaStatus: 'Employment Visa',
    yearsInUAE: '2',
    monthsInUAE: '8',
    totalIndustryExperience: '5',
    primaryAreaOfWork: 'Web & App Development',
    skillsets: ['Web Development', 'App Development', 'UI/UX Design'],
    otherSkill: 'React, Node.js, TypeScript, Flutter',
    portfolioLink: 'https://github.com/rahulkrishnan',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Technical Support', 'Workshops', 'Student Mentorship'],
    country: 'UAE',
    emirate: 'Dubai',
    areaName: 'Dubai Marina',
    countryCode: '+971',
    contactNumber: '52 345 6789',
    whatsappCountryCode: '+971',
    whatsappNumber: '52 345 6789',
    keralaDistrict: 'Thrissur',
    proceedWithMembershipFee: 'Yes',
    message: 'Keen to collaborate on innovative projects and mentor aspiring developers.',
    applicationDate: '2026-01-30',
    status: 'pending',
  },
  {
    id: 'APP-2026-004',
    fullName: 'Sara Thomas',
    email: 'sara.thomas@email.com',
    gender: 'Female',
    ageCategory: '32-38',
    bloodGroup: 'AB+',
    profilePhoto: '/uploads/sara-profile.jpg',
    varaWhatsappGroup: 'No',
    companyName: 'Freelance',
    jobTitle: 'Professional Photographer & Videographer',
    visaStatus: 'Golden Visa',
    yearsInUAE: '7',
    monthsInUAE: '4',
    totalIndustryExperience: '12',
    primaryAreaOfWork: 'Photography & Videography',
    skillsets: ['Photography', 'Videography', 'Motion Graphics', 'Content Creation'],
    otherSkill: 'Final Cut Pro, DaVinci Resolve, Drone Photography',
    portfolioLink: 'https://sarathomasstudio.com',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Event Management', 'Creative Support', 'Media & PR'],
    country: 'UAE',
    emirate: 'Abu Dhabi',
    areaName: 'Al Reem Island',
    countryCode: '+971',
    contactNumber: '50 987 6543',
    whatsappCountryCode: '+971',
    whatsappNumber: '50 987 6543',
    keralaDistrict: 'Kottayam',
    proceedWithMembershipFee: 'Yes',
    message: 'Passionate about capturing moments and telling stories through visual media.',
    applicationDate: '2026-01-30',
    status: 'pending',
  },
  {
    id: 'APP-2026-005',
    fullName: 'Vishnu Menon',
    email: 'vishnu.menon@email.com',
    gender: 'Male',
    ageCategory: '39-45',
    bloodGroup: 'O-',
    profilePhoto: '/uploads/vishnu-profile.jpg',
    varaWhatsappGroup: 'Yes',
    companyName: '3D Innovators LLC',
    jobTitle: '3D Artist & Motion Designer',
    visaStatus: 'Employment Visa',
    yearsInUAE: '6',
    monthsInUAE: '11',
    totalIndustryExperience: '14',
    primaryAreaOfWork: '3D Design & Animation',
    skillsets: ['3D Visualization', 'Motion Graphics', 'Graphic Design'],
    otherSkill: 'Blender, Cinema 4D, After Effects, Unreal Engine',
    portfolioLink: 'https://vimeo.com/vishnumenon',
    interestedInVolunteering: 'Yes',
    volunteeringAreas: ['Workshops', 'Student Mentorship', 'Creative Support'],
    country: 'UAE',
    emirate: 'Sharjah',
    areaName: 'Al Majaz',
    countryCode: '+971',
    contactNumber: '55 123 4567',
    whatsappCountryCode: '+971',
    whatsappNumber: '55 123 4567',
    keralaDistrict: 'Thiruvananthapuram',
    proceedWithMembershipFee: 'Yes',
    message: 'Eager to share my expertise in 3D design and learn from the community.',
    applicationDate: '2026-01-31',
    status: 'pending',
  },
];

const dashboardStats: DashboardStat[] = [
  { label: 'Total Members', value: 1247, change: '+12%', trend: 'up', icon: Users },
  { label: 'Active Memberships', value: 1089, change: '+8%', trend: 'up', icon: Activity },
  { label: 'Pending Approvals', value: 23, change: '-15%', trend: 'down', icon: Clock },
  { label: 'Revenue This Month', value: '$45,230', change: '+23%', trend: 'up', icon: TrendingUp },
];

// Income mock data
const mockIncomeRecords: IncomeRecord[] = [
  { id: 'INC-001', source: 'Membership Fees', category: 'Membership Fees', description: 'Premium membership renewals', amount: 25430, date: '2025-01-28', status: 'received', paymentMode: 'Bank Transfer' },
  { id: 'INC-002', source: 'Event Revenue', category: 'Event Revenue', description: 'Annual Gala 2025 ticket sales', amount: 12800, date: '2025-01-25', status: 'received', paymentMode: 'UPI' },
  { id: 'INC-003', source: 'Membership Fees', category: 'Membership Fees', description: 'Standard membership new signups', amount: 5600, date: '2025-01-22', status: 'received', paymentMode: 'Cash' },
  { id: 'INC-004', source: 'Donations', category: 'Donations', description: 'Corporate sponsorship - TechCorp', amount: 10000, date: '2025-01-20', status: 'pending', paymentMode: 'NEFT' },
  { id: 'INC-005', source: 'Event Revenue', category: 'Event Revenue', description: 'Workshop registration fees', amount: 3400, date: '2025-01-18', status: 'received', paymentMode: 'UPI' },
];

// Expenses mock data
const mockExpenseRecords: ExpenseRecord[] = [
  { id: 'EXP-001', category: 'Operations', vendor: 'Landlord Properties LLC', description: 'Office rent - January 2025', amount: 4500, date: '2025-01-01', status: 'paid', paymentMode: 'Bank Transfer' },
  { id: 'EXP-002', category: 'Marketing', vendor: 'Social Media Solutions', description: 'Social media advertising campaign', amount: 2800, date: '2025-01-15', status: 'paid', paymentMode: 'UPI' },
  { id: 'EXP-003', category: 'Operations', vendor: 'DEWA', description: 'Utilities and maintenance', amount: 1200, date: '2025-01-10', status: 'paid', paymentMode: 'Cash' },
  { id: 'EXP-004', category: 'Events', vendor: 'Grand Catering Services', description: 'Annual Gala venue and catering', amount: 8500, date: '2025-01-24', status: 'paid', paymentMode: 'NEFT' },
  { id: 'EXP-005', category: 'Marketing', vendor: 'Print Pro UAE', description: 'Print materials and flyers', amount: 950, date: '2025-01-20', status: 'pending', paymentMode: 'Cash' },
  { id: 'EXP-006', category: 'Technology', vendor: 'HostGator', description: 'Website hosting and maintenance', amount: 450, date: '2025-01-05', status: 'paid', paymentMode: 'UPI' },
];

// Balance Sheet mock data
const mockAssets: BalanceSheetItem[] = [
  { category: 'Membership Fees', label: 'Premium Memberships', amount: 25430, paymentMode: 'Bank Transfer', type: 'income' },
  { category: 'Membership Fees', label: 'Standard Memberships', amount: 15400, paymentMode: 'Cash', type: 'income' },
  { category: 'Event Revenue', label: 'Annual Gala', amount: 12800, paymentMode: 'UPI', type: 'income' },
  { category: 'Event Revenue', label: 'Workshops', amount: 3400, paymentMode: 'UPI', type: 'income' },
  { category: 'Donations', label: 'Corporate Sponsorships', amount: 10000, paymentMode: 'NEFT', type: 'income' },
];

const mockLiabilities: BalanceSheetItem[] = [
  { category: 'Operations', label: 'Office Rent & Utilities', amount: 5700, paymentMode: 'Bank Transfer', type: 'expense' },
  { category: 'Marketing', label: 'Advertising & Print', amount: 3750, paymentMode: 'UPI', type: 'expense' },
  { category: 'Events', label: 'Event Expenses', amount: 8500, paymentMode: 'NEFT', type: 'expense' },
  { category: 'Technology', label: 'IT & Hosting', amount: 450, paymentMode: 'UPI', type: 'expense' },
];

// Vendor suggestions for expense form
const vendorSuggestions = [
  'Landlord Properties LLC',
  'DEWA',
  'ADDC',
  'Etisalat',
  'Du Telecom',
  'Grand Catering Services',
  'Print Pro UAE',
  'Social Media Solutions',
  'HostGator',
  'GoDaddy',
  'Amazon Web Services',
  'Microsoft Azure',
  'Google Workspace',
  'Zoom Communications',
  'Office Supplies Co.',
  'Transportation Services LLC',
  'Security Services UAE',
];

// Events mock data
const mockEvents: Event[] = [
  { 
    id: 'EVT-001', 
    title: 'Annual Tech Conference 2026', 
    description: 'Join us for our annual technology conference featuring industry leaders and networking opportunities.', 
    date: '2026-03-15', 
    time: '09:00 AM', 
    location: 'Grand Convention Center, Hall A', 
    registrationLink: 'https://vara.events/tech-conference-2026', 
    status: 'published', 
    createdAt: '2026-01-20',
    maxParticipants: 500,
    category: 'Conference'
  },
  { 
    id: 'EVT-002', 
    title: 'Leadership Workshop', 
    description: 'Interactive workshop on developing leadership skills for aspiring managers.', 
    date: '2026-02-20', 
    time: '02:00 PM', 
    location: 'Training Room B, VARA HQ', 
    registrationLink: 'https://vara.events/leadership-workshop', 
    status: 'published', 
    createdAt: '2026-01-18',
    maxParticipants: 50,
    category: 'Workshop'
  },
];

// Announcements mock data
const mockAnnouncements: Announcement[] = [
  {
    id: 'ANN-001',
    title: 'New Membership Benefits',
    message: 'We are excited to announce new benefits for premium members including exclusive access to workshops and networking events.',
    priority: 'high',
    type: 'news',
    status: 'published',
    createdAt: '2026-01-28',
    expiryDate: '2026-02-28'
  },
  {
    id: 'ANN-002',
    title: 'System Maintenance Notice',
    message: 'Our portal will undergo scheduled maintenance on February 5th from 2 AM to 4 AM. Services may be temporarily unavailable.',
    priority: 'medium',
    type: 'alert',
    status: 'published',
    createdAt: '2026-01-25',
    expiryDate: '2026-02-05'
  },
];

const mockJobs: Job[] = [
  {
    id: 'JOB-001',
    jobTitle: 'Senior Software Engineer',
    description: 'We are looking for an experienced software engineer to join our team and work on cutting-edge projects.',
    role: 'Software Development',
    applicationLink: 'https://careers.vara.ae/apply/senior-software-engineer',
    applyByDate: '2026-02-28',
    location: 'Dubai, UAE',
    employmentType: 'Full-time',
    experienceLevel: '5+ years',
    salary: 'AED 15,000 - 20,000',
    status: 'published',
    createdAt: '2026-01-20',
    applicants: [
      {
        id: 'APP-001',
        jobId: 'JOB-001',
        memberId: 'VARA-2024-001',
        memberName: 'John Anderson',
        memberEmail: 'john.anderson@email.com',
        appliedDate: '2026-01-22',
        status: 'shortlisted',
        resumeLink: 'https://example.com/resume.pdf',
        coverLetter: 'I am very interested in this position...'
      }
    ]
  },
  {
    id: 'JOB-002',
    jobTitle: 'Marketing Manager',
    description: 'Seeking a creative marketing manager to lead our digital marketing campaigns and brand strategy.',
    role: 'Marketing',
    applicationLink: 'https://careers.vara.ae/apply/marketing-manager',
    applyByDate: '2026-03-15',
    location: 'Abu Dhabi, UAE',
    employmentType: 'Full-time',
    experienceLevel: '3-5 years',
    salary: 'AED 12,000 - 18,000',
    status: 'published',
    createdAt: '2026-01-25',
    applicants: []
  },
  {
    id: 'JOB-003',
    jobTitle: 'UI/UX Designer',
    description: 'Join our design team to create beautiful and intuitive user experiences for our digital products.',
    role: 'Design',
    applicationLink: 'https://careers.vara.ae/apply/ui-ux-designer',
    applyByDate: '2026-02-20',
    location: 'Dubai, UAE',
    employmentType: 'Contract',
    experienceLevel: '2-4 years',
    salary: 'AED 10,000 - 15,000',
    status: 'draft',
    createdAt: '2026-01-28',
    applicants: []
  }
];

// RBAC Mock Data
const availablePermissions: Permission[] = [
  {
    id: 'accounts-income',
    module: 'accounts',
    label: 'Accounts - Income',
    description: 'View and manage income records',
    icon: ArrowUpCircle,
  },
  {
    id: 'accounts-expenses',
    module: 'accounts',
    label: 'Accounts - Expenses',
    description: 'View and manage expense records',
    icon: ArrowDownCircle,
  },
  {
    id: 'accounts-balance',
    module: 'accounts',
    label: 'Accounts - Balance Sheet',
    description: 'View balance sheet and financial reports',
    icon: BarChart3,
  },
  {
    id: 'membership-details',
    module: 'membership',
    label: 'Membership Details',
    description: 'View and manage member accounts',
    icon: CreditCard,
  },
  {
    id: 'membership-approvals',
    module: 'proofs',
    label: 'Membership Approvals',
    description: 'Approve or reject membership applications',
    icon: FileText,
  },
  {
    id: 'events-management',
    module: 'events',
    label: 'Events Management',
    description: 'Create and manage events',
    icon: Calendar,
  },
  {
    id: 'announcements-management',
    module: 'events',
    label: 'Announcements Management',
    description: 'Create and publish announcements',
    icon: Megaphone,
  },
];

const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'Finance Manager',
    description: 'Full access to accounts and financial records',
    permissions: ['accounts-income', 'accounts-expenses', 'accounts-balance'],
    createdAt: '2025-12-01',
    color: 'emerald',
  },
  {
    id: 'role-2',
    name: 'Membership Coordinator',
    description: 'Manages membership approvals and member details',
    permissions: ['membership-details', 'membership-approvals'],
    createdAt: '2025-12-05',
    color: 'blue',
  },
  {
    id: 'role-3',
    name: 'Events Manager',
    description: 'Manages events and announcements',
    permissions: ['events-management', 'announcements-management'],
    createdAt: '2025-12-10',
    color: 'purple',
  },
  {
    id: 'role-4',
    name: 'Limited Approver',
    description: 'Only handles membership approvals',
    permissions: ['membership-approvals'],
    createdAt: '2026-01-15',
    color: 'amber',
  },
  {
    id: 'role-5',
    name: 'Full Administrator',
    description: 'Complete access to all modules',
    permissions: [
      'accounts-income',
      'accounts-expenses',
      'accounts-balance',
      'membership-details',
      'membership-approvals',
      'events-management',
      'announcements-management',
    ],
    createdAt: '2025-11-20',
    color: 'red',
  },
];

const mockBoardMembers: BoardMember[] = [
  {
    id: 'bm-1',
    name: 'Mohammed Abdullah',
    email: 'mohammed.abdullah@vara.ae',
    roleId: 'role-1',
    assignedDate: '2025-12-15',
    status: 'active',
    lastLogin: '2026-02-01',
  },
  {
    id: 'bm-2',
    name: 'Lakshmi Menon',
    email: 'lakshmi.menon@vara.ae',
    roleId: 'role-2',
    assignedDate: '2025-12-20',
    status: 'active',
    lastLogin: '2026-01-31',
  },
  {
    id: 'bm-3',
    name: 'Aisha Rahman',
    email: 'aisha.rahman@vara.ae',
    roleId: 'role-3',
    assignedDate: '2026-01-05',
    status: 'active',
    lastLogin: '2026-01-30',
  },
  {
    id: 'bm-4',
    name: 'Suresh Kumar',
    email: 'suresh.kumar@vara.ae',
    roleId: 'role-4',
    assignedDate: '2026-01-20',
    status: 'active',
    lastLogin: '2026-02-01',
  },
  {
    id: 'bm-5',
    name: 'Fatima Hassan',
    email: 'fatima.hassan@vara.ae',
    roleId: 'role-5',
    assignedDate: '2025-11-25',
    status: 'inactive',
    lastLogin: '2026-01-15',
  },
];

// Navigation items
const adminNavItems = [
  { id: 'profile', label: 'Admin Profile', icon: Shield },
  { id: 'accounts', label: 'Accounts', icon: Wallet, hasDropdown: true },
  { id: 'membership', label: 'Membership Details', icon: CreditCard },
  { id: 'proofs', label: 'Membership Approvals', icon: FileText },
  { id: 'events', label: 'Events Announcements', icon: Megaphone, hasDropdown: true },
  { id: 'jobs', label: 'Job Creation', icon: Briefcase },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const accountsDropdownItems = [
  { id: 'income', label: 'Income', icon: ArrowUpCircle },
  { id: 'expenses', label: 'Expenses', icon: ArrowDownCircle },
  { id: 'balance', label: 'Balance Sheet', icon: BarChart3 },
];

const eventsDropdownItems = [
  { id: 'events-list', label: 'Events', icon: Calendar },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [accountsSubSection, setAccountsSubSection] = useState('income'); // income, expenses, balance
  const [eventsSubSection, setEventsSubSection] = useState('events-list'); // events-list, announcements
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountsDropdownOpen, setAccountsDropdownOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<MembershipProof | null>(null);
  const [selectedMember, setSelectedMember] = useState<MemberAccount | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<PendingMemberApplication | null>(null);
  const [pendingApplications, setPendingApplications] = useState<PendingMemberApplication[]>(mockPendingApplications);
  const [memberAccounts, setMemberAccounts] = useState<MemberAccount[]>(mockAccounts);
  
  // Modal states
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddAnnouncementModal, setShowAddAnnouncementModal] = useState(false);
  
  // Search states
  const [membershipSearchTerm, setMembershipSearchTerm] = useState('');
  const [proofsSearchTerm, setProofsSearchTerm] = useState('');
  const [eventsSearchTerm, setEventsSearchTerm] = useState('');
  const [announcementsSearchTerm, setAnnouncementsSearchTerm] = useState('');
  const [incomeSearchTerm, setIncomeSearchTerm] = useState('');
  const [expensesSearchTerm, setExpensesSearchTerm] = useState('');
  const [jobsSearchTerm, setJobsSearchTerm] = useState('');
  
  // Payment mode states
  const [incomePaymentMode, setIncomePaymentMode] = useState('Cash');
  const [expensePaymentMode, setExpensePaymentMode] = useState('Cash');
  const [balancePaymentMode, setBalancePaymentMode] = useState('Cash');
  
  // Category and vendor states
  const [incomeCategory, setIncomeCategory] = useState('Membership Fees');
  const [expenseCategory, setExpenseCategory] = useState('Operations');
  const [vendorInput, setVendorInput] = useState('');
  
  // RBAC states
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(mockBoardMembers);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showAddBoardMemberModal, setShowAddBoardMemberModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showEditBoardMemberModal, setShowEditBoardMemberModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedBoardMember, setSelectedBoardMember] = useState<BoardMember | null>(null);
  const [rbacSearchTerm, setRbacSearchTerm] = useState('');
  const [activeRbacTab, setActiveRbacTab] = useState<'roles' | 'members'>('members');
  
  // Report states
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState<'income' | 'expense' | 'balance' | 'membership' | 'approvals' | 'events' | 'announcements'>('income');
  const [reportPeriod, setReportPeriod] = useState<'today' | 'weekly' | 'monthly' | 'yearly' | 'custom'>('today');
  const [reportDropdownOpen, setReportDropdownOpen] = useState<string | null>(null);
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  
  // Form states
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>(mockIncomeRecords);
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>(mockExpenseRecords);
  const [assets, setAssets] = useState<BalanceSheetItem[]>(mockAssets);
  const [liabilities, setLiabilities] = useState<BalanceSheetItem[]>(mockLiabilities);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  
  // Job states
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Event banner preview state
  const [eventBannerPreview, setEventBannerPreview] = useState<string | null>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'verified':
        return isDarkMode
          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
          : 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return isDarkMode
          ? 'bg-amber-500/15 text-amber-400 border-amber-500/20'
          : 'bg-amber-50 text-amber-700 border-amber-200';
      case 'rejected':
        return isDarkMode
          ? 'bg-red-500/15 text-red-400 border-red-500/20'
          : 'bg-red-50 text-red-700 border-red-200';
      default:
        return isDarkMode
          ? 'bg-gray-500/15 text-gray-400 border-gray-500/20'
          : 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Handler functions for adding records
  const handleAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const paymentModeValue = formData.get('paymentMode') as string;
    const customPaymentMode = formData.get('customPaymentMode') as string;
    const finalPaymentMode = paymentModeValue === 'Others' ? customPaymentMode : paymentModeValue;
    
    const categoryValue = formData.get('category') as string;
    const customCategory = formData.get('customCategory') as string;
    const finalCategory = categoryValue === 'Custom' ? customCategory : categoryValue;
    
    const newIncome: IncomeRecord = {
      id: `INC-${String(incomeRecords.length + 1).padStart(3, '0')}`,
      source: formData.get('source') as string,
      category: finalCategory,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      date: formData.get('date') as string,
      status: formData.get('status') as 'received' | 'pending',
      paymentMode: finalPaymentMode,
    };
    setIncomeRecords([newIncome, ...incomeRecords]);
    setShowAddIncomeModal(false);
    setIncomePaymentMode('Cash');
    setIncomeCategory('Membership Fees');
  };

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const paymentModeValue = formData.get('paymentMode') as string;
    const customPaymentMode = formData.get('customPaymentMode') as string;
    const finalPaymentMode = paymentModeValue === 'Others' ? customPaymentMode : paymentModeValue;
    
    const categoryValue = formData.get('category') as string;
    const customCategory = formData.get('customCategory') as string;
    const finalCategory = categoryValue === 'Custom' ? customCategory : categoryValue;
    
    const newExpense: ExpenseRecord = {
      id: `EXP-${String(expenseRecords.length + 1).padStart(3, '0')}`,
      category: finalCategory,
      vendor: formData.get('vendor') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      date: formData.get('date') as string,
      status: formData.get('status') as 'paid' | 'pending',
      paymentMode: finalPaymentMode,
    };
    setExpenseRecords([newExpense, ...expenseRecords]);
    setShowAddExpenseModal(false);
    setExpensePaymentMode('Cash');
    setExpenseCategory('Operations');
    setVendorInput('');
  };

  const handleAddBalanceEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as 'income' | 'expense';
    const category = formData.get('category') as string;
    const label = formData.get('label') as string;
    const amount = Number(formData.get('amount'));
    const paymentModeValue = formData.get('paymentMode') as string;
    const customPaymentMode = formData.get('customPaymentMode') as string;
    const finalPaymentMode = paymentModeValue === 'Others' ? customPaymentMode : paymentModeValue;
    
    const newItem: BalanceSheetItem = { 
      category, 
      label, 
      amount, 
      paymentMode: finalPaymentMode,
      type 
    };
    
    if (type === 'income') {
      setAssets([...assets, newItem]);
    } else {
      setLiabilities([...liabilities, newItem]);
    }
    setShowAddBalanceModal(false);
    setBalancePaymentMode('Cash');
  };

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: Event = {
      id: `EVT-${String(events.length + 1).padStart(3, '0')}`,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      location: formData.get('location') as string,
      registrationLink: formData.get('registrationLink') as string,
      maxParticipants: Number(formData.get('maxParticipants')) || undefined,
      category: formData.get('category') as string,
      bannerImage: eventBannerPreview || undefined,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setEvents([newEvent, ...events]);
    setShowAddEventModal(false);
    setEventBannerPreview(null);
  };

  const handlePublishEvent = (eventId: string) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, status: 'published' } : event
    ));
  };

  const handleAddAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newAnnouncement: Announcement = {
      id: `ANN-${String(announcements.length + 1).padStart(3, '0')}`,
      title: formData.get('title') as string,
      message: formData.get('message') as string,
      priority: formData.get('priority') as 'high' | 'medium' | 'low',
      type: formData.get('type') as 'news' | 'alert' | 'update' | 'general',
      expiryDate: formData.get('expiryDate') as string || undefined,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setShowAddAnnouncementModal(false);
  };

  const handlePublishAnnouncement = (announcementId: string) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === announcementId ? { ...announcement, status: 'published' } : announcement
    ));
  };

  // Job Handlers
  const handleAddJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newJob: Job = {
      id: `JOB-${String(jobs.length + 1).padStart(3, '0')}`,
      jobTitle: formData.get('jobTitle') as string,
      description: formData.get('description') as string,
      role: formData.get('role') as string,
      applicationLink: formData.get('applicationLink') as string,
      applyByDate: formData.get('applyByDate') as string,
      location: formData.get('location') as string,
      employmentType: formData.get('employmentType') as string,
      experienceLevel: formData.get('experienceLevel') as string,
      salary: formData.get('salary') as string,
      status: 'published',
      createdAt: new Date().toISOString().split('T')[0],
      applicants: []
    };
    
    setJobs([...jobs, newJob]);
    setShowAddJobModal(false);
  };

  const handlePublishJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: 'published' } : job
    ));
  };

  // Membership Application Handlers
  const handleApproveApplication = (applicationId: string) => {
    const application = pendingApplications.find(app => app.id === applicationId);
    if (!application) return;

    // Update application status
    setPendingApplications(pendingApplications.map(app =>
      app.id === applicationId ? { ...app, status: 'approved' } : app
    ));

    // Create new member account with all registration details
    const newMember: MemberAccount = {
      id: `VARA-2026-${String(memberAccounts.length + 1).padStart(3, '0')}`,
      name: application.fullName,
      email: application.email,
      membershipType: application.proceedWithMembershipFee === 'Yes' ? 'Premium' : 'Standard',
      status: 'approved',
      dateJoined: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      phone: `${application.countryCode} ${application.contactNumber}`,
      lastActive: new Date().toISOString().split('T')[0],
      // All registration details
      gender: application.gender,
      ageCategory: application.ageCategory,
      bloodGroup: application.bloodGroup,
      profilePhoto: application.profilePhoto,
      varaWhatsappGroup: application.varaWhatsappGroup,
      companyName: application.companyName,
      jobTitle: application.jobTitle,
      visaStatus: application.visaStatus,
      yearsInUAE: application.yearsInUAE,
      monthsInUAE: application.monthsInUAE,
      totalIndustryExperience: application.totalIndustryExperience,
      primaryAreaOfWork: application.primaryAreaOfWork,
      skillsets: application.skillsets,
      otherSkill: application.otherSkill,
      portfolioLink: application.portfolioLink,
      interestedInVolunteering: application.interestedInVolunteering,
      volunteeringAreas: application.volunteeringAreas,
      country: application.country,
      emirate: application.emirate,
      areaName: application.areaName,
      countryCode: application.countryCode,
      contactNumber: application.contactNumber,
      whatsappCountryCode: application.whatsappCountryCode,
      whatsappNumber: application.whatsappNumber,
      keralaDistrict: application.keralaDistrict,
      proceedWithMembershipFee: application.proceedWithMembershipFee,
      message: application.message,
    };
    
    setMemberAccounts([...memberAccounts, newMember]);
    setSelectedApplication(null);
  };

  const handleRejectApplication = (applicationId: string) => {
    // Update application status to rejected
    setPendingApplications(pendingApplications.map(app =>
      app.id === applicationId ? { ...app, status: 'rejected' } : app
    ));
    
    setSelectedApplication(null);
  };

  // RBAC Handler Functions
  const handleAddRole = (newRole: Omit<Role, 'id' | 'createdAt'>) => {
    const role: Role = {
      ...newRole,
      id: `role-${roles.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setRoles([...roles, role]);
    setShowAddRoleModal(false);
  };

  const handleEditRole = (roleId: string, updatedRole: Partial<Role>) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, ...updatedRole } : role
    ));
    setShowEditRoleModal(false);
    setSelectedRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    // Check if any board members are assigned this role
    const hasMembers = boardMembers.some(member => member.roleId === roleId);
    if (hasMembers) {
      alert('Cannot delete role that is assigned to board members. Please reassign members first.');
      return;
    }
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handleAddBoardMember = (newMember: Omit<BoardMember, 'id' | 'assignedDate'>) => {
    const member: BoardMember = {
      ...newMember,
      id: `bm-${boardMembers.length + 1}`,
      assignedDate: new Date().toISOString().split('T')[0],
    };
    setBoardMembers([...boardMembers, member]);
    setShowAddBoardMemberModal(false);
  };

  const handleEditBoardMember = (memberId: string, updatedMember: Partial<BoardMember>) => {
    setBoardMembers(boardMembers.map(member => 
      member.id === memberId ? { ...member, ...updatedMember } : member
    ));
    setShowEditBoardMemberModal(false);
    setSelectedBoardMember(null);
  };

  const handleToggleMemberStatus = (memberId: string) => {
    setBoardMembers(boardMembers.map(member => 
      member.id === memberId 
        ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' } 
        : member
    ));
  };

  const handleRemoveBoardMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this board member?')) {
      setBoardMembers(boardMembers.filter(member => member.id !== memberId));
    }
  };

  const getRoleById = (roleId: string) => roles.find(role => role.id === roleId);

  const getPermissionsByRoleId = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return [];
    return availablePermissions.filter(perm => role.permissions.includes(perm.id));
  };

  // Removed unused filteredAccounts variable

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-2 border-t-white/80 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border border-white/5"></div>
          </div>
          <p className="text-white/60 text-sm font-light tracking-wide">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0B0D10]' : 'bg-[#f8fafc]'}`}>
      {/* Premium Multi-Layer Background Effects - Admin */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base Gradient Layer */}
        <div className={`absolute inset-0 ${isDarkMode 
          ? 'bg-gradient-to-br from-[#0d0a1a] via-[#0B0D10] to-[#0a0f14]' 
          : 'bg-gradient-to-br from-violet-50/70 via-slate-50 to-cyan-50/50'}`}></div>
        
        {/* Animated Gradient Orbs - Dark Mode (Admin-specific purple/blue theme) */}
        {isDarkMode && (
          <>
            <div className="absolute top-[-15%] left-[-8%] w-[750px] h-[750px] bg-gradient-to-br from-violet-700/20 via-purple-600/12 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute top-[25%] right-[-12%] w-[650px] h-[650px] bg-gradient-to-bl from-indigo-500/18 via-blue-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.2s' }}></div>
            <div className="absolute bottom-[-12%] left-[10%] w-[580px] h-[580px] bg-gradient-to-tr from-cyan-500/15 via-teal-600/8 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2.4s' }}></div>
            <div className="absolute top-[55%] left-[45%] w-[450px] h-[450px] bg-gradient-to-r from-fuchsia-500/12 via-pink-500/6 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '0.8s' }}></div>
            <div className="absolute top-[10%] left-[60%] w-[350px] h-[350px] bg-gradient-to-bl from-emerald-500/10 via-green-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.8s' }}></div>
            
            {/* Admin Mesh Gradient Overlay */}
            <div className="absolute inset-0 opacity-35" style={{
              backgroundImage: `radial-gradient(at 20% 30%, rgba(139, 92, 246, 0.18) 0px, transparent 50%),
                               radial-gradient(at 85% 15%, rgba(99, 102, 241, 0.12) 0px, transparent 50%),
                               radial-gradient(at 5% 65%, rgba(168, 85, 247, 0.14) 0px, transparent 50%),
                               radial-gradient(at 75% 55%, rgba(6, 182, 212, 0.1) 0px, transparent 50%),
                               radial-gradient(at 35% 85%, rgba(236, 72, 153, 0.08) 0px, transparent 50%),
                               radial-gradient(at 90% 85%, rgba(34, 197, 94, 0.08) 0px, transparent 50%)`
            }}></div>
            
            {/* Subtle Dot Pattern */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}></div>
            
            {/* Diagonal Lines Accent */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(139, 92, 246, 0.1) 35px, rgba(139, 92, 246, 0.1) 36px)`
            }}></div>
          </>
        )}
        
        {/* Light Mode Background Effects - Admin */}
        {!isDarkMode && (
          <>
            <div className="absolute top-[-8%] left-[-3%] w-[650px] h-[650px] bg-gradient-to-br from-violet-200/50 via-purple-100/35 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-[15%] right-[-8%] w-[550px] h-[550px] bg-gradient-to-bl from-indigo-200/40 via-blue-100/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-8%] left-[25%] w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200/35 via-teal-100/25 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-[45%] right-[15%] w-[380px] h-[380px] bg-gradient-to-l from-fuchsia-200/30 via-pink-100/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-[25%] left-[5%] w-[420px] h-[420px] bg-gradient-to-tr from-emerald-200/25 via-green-100/15 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-[5%] left-[40%] w-[300px] h-[300px] bg-gradient-to-b from-amber-200/20 via-orange-100/10 to-transparent rounded-full blur-3xl"></div>
            
            {/* Light Mode Admin Mesh Gradient */}
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(at 25% 25%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
                               radial-gradient(at 75% 15%, rgba(99, 102, 241, 0.08) 0px, transparent 50%),
                               radial-gradient(at 15% 70%, rgba(168, 85, 247, 0.08) 0px, transparent 50%),
                               radial-gradient(at 85% 50%, rgba(6, 182, 212, 0.06) 0px, transparent 50%),
                               radial-gradient(at 45% 90%, rgba(236, 72, 153, 0.05) 0px, transparent 50%)`
            }}></div>
            
            {/* Light Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.35]" style={{
              backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }}></div>
          </>
        )}
        
        {/* Top Gradient Fade */}
        <div className={`absolute top-0 left-0 right-0 h-40 ${isDarkMode 
          ? 'bg-gradient-to-b from-[#0B0D10] to-transparent' 
          : 'bg-gradient-to-b from-white/60 to-transparent'}`}></div>
        
        {/* Bottom Gradient Fade */}
        <div className={`absolute bottom-0 left-0 right-0 h-24 ${isDarkMode 
          ? 'bg-gradient-to-t from-[#0B0D10]/50 to-transparent' 
          : 'bg-gradient-to-t from-slate-100/50 to-transparent'}`}></div>
      </div>

      {/* Left Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-72 z-50 flex flex-col transition-all duration-300 ${isDarkMode ? 'bg-[#0c0c0e]/95 border-r border-white/[0.08]' : 'bg-white/95 border-r border-gray-200'} backdrop-blur-xl ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo Section */}
        <div className={`flex items-center gap-3 px-6 py-5 border-b ${isDarkMode ? 'border-white/[0.08]' : 'border-gray-200'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-gray-900'}`}>
            <img 
              src="/Images/image logo.png" 
              alt="VARA Logo" 
              className="h-6 w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>VARA</span>
            <span className={`text-xs px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>Admin</span>
          </div>
        </div>

        {/* Admin Profile Section */}
        <div className={`px-4 py-5 border-b ${isDarkMode ? 'border-white/[0.08]' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-violet-500/30 to-purple-500/10 ring-1 ring-white/10' : 'bg-gray-900'}`}>
              <Shield className={`w-5 h-5 ${isDarkMode ? 'text-violet-300' : 'text-white'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockAdminProfile.name}</p>
              <p className={`text-xs truncate ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{mockAdminProfile.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {adminNavItems.map((item) => (
              <div key={item.id}>
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => {
                        if (item.id === 'accounts') {
                          setActiveSection('accounts');
                          setAccountsDropdownOpen(!accountsDropdownOpen);
                          setEventsDropdownOpen(false);
                        } else if (item.id === 'events') {
                          setActiveSection('events');
                          setEventsDropdownOpen(!eventsDropdownOpen);
                          setAccountsDropdownOpen(false);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeSection === item.id
                          ? isDarkMode 
                            ? 'text-white bg-white/10 shadow-lg shadow-white/5' 
                            : 'text-gray-900 bg-gray-100 shadow-md'
                          : isDarkMode
                            ? 'text-white/60 hover:text-white hover:bg-white/5'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${activeSection === item.id ? (isDarkMode ? 'text-violet-400' : 'text-gray-900') : ''}`} />
                        {item.label}
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        (item.id === 'accounts' && accountsDropdownOpen) || (item.id === 'events' && eventsDropdownOpen) ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Accounts Sub-menu */}
                    {item.id === 'accounts' && accountsDropdownOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {accountsDropdownItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              setAccountsSubSection(subItem.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                              accountsSubSection === subItem.id
                                ? isDarkMode ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-100'
                                : isDarkMode ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Events Sub-menu */}
                    {item.id === 'events' && eventsDropdownOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {eventsDropdownItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              setEventsSubSection(subItem.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                              eventsSubSection === subItem.id
                                ? isDarkMode ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-100'
                                : isDarkMode ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setActiveSection(item.id);
                      setAccountsDropdownOpen(false);
                      setEventsDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? isDarkMode 
                          ? 'text-white bg-white/10 shadow-lg shadow-white/5' 
                          : 'text-gray-900 bg-gray-100 shadow-md'
                        : isDarkMode
                          ? 'text-white/60 hover:text-white hover:bg-white/5'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${activeSection === item.id ? (isDarkMode ? 'text-violet-400' : 'text-gray-900') : ''}`} />
                    {item.label}
                    {activeSection === item.id && (
                      <div className={`ml-auto w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-violet-400' : 'bg-gray-900'}`}></div>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className={`my-4 border-t ${isDarkMode ? 'border-white/[0.08]' : 'border-gray-200'}`}></div>

          {/* Quick Actions */}
          <div className="space-y-1">
            
            <button 
              onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <Bell className="w-5 h-5" />
              Notifications
              <span className={`ml-auto w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-violet-400' : 'bg-violet-600'}`}></span>
            </button>
            <button 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </button>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className={`px-3 py-4 border-t ${isDarkMode ? 'border-white/[0.08]' : 'border-gray-200'}`}>
          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isDarkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Toggle - Fixed position */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`fixed top-4 left-4 z-50 md:hidden p-3 rounded-xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-[#14161A] text-white/80 hover:text-white border border-white/10' : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'}`}
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-72 flex flex-col min-h-screen">
        {/* Search Modal */}
        {searchOpen && (
          <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)}></div>
            <div className={`relative w-full max-w-xl rounded-2xl shadow-2xl border p-4 animate-in fade-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <Search className={`w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search members, transactions..."
                  autoFocus
                  className={`flex-1 bg-transparent text-base outline-none ${isDarkMode ? 'text-white placeholder:text-white/40' : 'text-gray-900 placeholder:text-gray-400'}`}
                />
                <kbd className={`px-2 py-1 text-xs rounded-md ${isDarkMode ? 'bg-white/10 text-white/40' : 'bg-gray-100 text-gray-500'}`}>ESC</kbd>
              </div>
            </div>
          </div>
        )}

        {/* Notification Panel - Positioned relative to sidebar */}
        {notificationPanelOpen && (
          <div className={`fixed top-20 left-80 w-80 max-h-[70vh] rounded-2xl shadow-2xl border z-[60] overflow-hidden animate-in slide-in-from-left-2 fade-in duration-200 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
              <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
              <button 
                onClick={() => setNotificationPanelOpen(false)}
                className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/50' : 'hover:bg-gray-100 text-gray-400'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {mockAnnouncements.map((item) => (
                <div key={item.id} className={`p-3 rounded-xl mb-1 transition-colors cursor-pointer ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</p>
                  <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 relative z-10 sidebar-dashboard-main">
          {/* Job Creation Section - Full Width Layout */}
          {activeSection === 'jobs' ? (
            <div className={`h-full ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Job Creation
                    </h2>
                    <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Manage job postings and track applications
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddJobModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Job
                  </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={jobsSearchTerm}
                      onChange={(e) => setJobsSearchTerm(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs
                    .filter(job =>
                      job.jobTitle.toLowerCase().includes(jobsSearchTerm.toLowerCase()) ||
                      job.role.toLowerCase().includes(jobsSearchTerm.toLowerCase()) ||
                      job.location.toLowerCase().includes(jobsSearchTerm.toLowerCase())
                    )
                    .map((job) => (
                      <div
                        key={job.id}
                        className={`p-6 rounded-lg border ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600'
                            : 'bg-white border-gray-200'
                        } hover:shadow-lg transition-shadow cursor-pointer`}
                        onClick={() => setSelectedJob(job)}
                      >
                        {/* Job Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {job.jobTitle}
                            </h3>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {job.role}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              job.status === 'published'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {job.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                        </div>

                        {/* Job Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <MapPin className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {job.location}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Briefcase className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {job.employmentType} • {job.experienceLevel}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                              Apply by: {new Date(job.applyByDate).toLocaleDateString()}
                            </span>
                          </div>
                          {job.salary && (
                            <div className="flex items-center text-sm">
                              <DollarSign className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                {job.salary}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Applicants Count */}
                        <div className={`pt-4 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Users className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {job.applicants.length} Applicant{job.applicants.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            {job.status === 'draft' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePublishJob(job.id);
                                }}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Empty State */}
                {jobs.filter(job =>
                  job.jobTitle.toLowerCase().includes(jobsSearchTerm.toLowerCase()) ||
                  job.role.toLowerCase().includes(jobsSearchTerm.toLowerCase()) ||
                  job.location.toLowerCase().includes(jobsSearchTerm.toLowerCase())
                ).length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {jobsSearchTerm ? 'No jobs found matching your search' : 'No jobs created yet'}
                    </p>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      {jobsSearchTerm ? 'Try adjusting your search terms' : 'Click "Create New Job" to get started'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Admin Dashboard
                      <Sparkles className={`inline-block w-6 h-6 ml-2 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                    </h1>
                    <p className={`mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>
                      Manage memberships, accounts, and monitor VARA activities
                    </p>
                  </div>
                  
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
                {dashboardStats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`group relative rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:shadow-xl hover:shadow-white/5' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}
                  >
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.trend === 'up' ? 'from-emerald-500/10' : 'from-violet-500/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                          <stat.icon className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`} />
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                          stat.trend === 'up'
                            ? isDarkMode ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                            : isDarkMode ? 'bg-violet-500/15 text-violet-400' : 'bg-violet-50 text-violet-700'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <div>
                        <p className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Content Sections */}
              <div className="space-y-8">
            {/* Admin Profile Section */}
            {activeSection === 'profile' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`rounded-2xl border p-8 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                  <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Shield className="w-5 h-5" />
                    Administrator Profile
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-32 h-32 rounded-2xl flex items-center justify-center mb-4 ${isDarkMode ? 'bg-gradient-to-br from-violet-500/30 to-purple-500/10 ring-1 ring-white/10' : 'bg-gray-900'}`}>
                        <Shield className={`w-16 h-16 ${isDarkMode ? 'text-violet-300' : 'text-white'}`} />
                      </div>
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockAdminProfile.name}</h3>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{mockAdminProfile.role}</p>
                      <span className={`mt-3 px-3 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
                        Admin Since {mockAdminProfile.adminSince}
                      </span>
                    </div>

                    {/* Contact Information */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <Mail className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
                          <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Email Address</span>
                        </div>
                        <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockAdminProfile.email}</p>
                      </div>

                      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <Phone className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
                          <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Phone Number</span>
                        </div>
                        <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockAdminProfile.phone}</p>
                      </div>

                      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
                          <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Department</span>
                        </div>
                        <p className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockAdminProfile.department}</p>
                      </div>

                      <button className={`w-full mt-4 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'}`}>
                        <Settings className="w-4 h-4 inline mr-2" />
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accounts Section - Income, Expenses, Balance Sheet */}
            {activeSection === 'accounts' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                {/* Income Section */}
                {accountsSubSection === 'income' && (
                  <>
                    {/* Income Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {[
                        { label: 'Total Monthly Income', value: '$57,230', icon: CircleDollarSign, color: 'emerald' },
                        { label: 'Membership Fees', value: '$31,030', icon: Users, color: 'blue' },
                        { label: 'Event Revenue', value: '$16,200', icon: Receipt, color: 'violet' },
                        { label: 'Other Sources', value: '$10,000', icon: PiggyBank, color: 'amber' },
                      ].map((stat, index) => (
                        <div 
                          key={index}
                          className={`group relative rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:shadow-xl hover:shadow-white/5' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                <stat.icon className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`} />
                              </div>
                              <ArrowUpCircle className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                            </div>
                            <div>
                              <p className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                              <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{stat.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Income Table */}
                    <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                      <div className={`p-6 border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div>
                            <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              <ArrowUpCircle className="w-5 h-5 text-emerald-400" />
                              Income Records
                            </h2>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                              Track all income sources and transactions
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            {/* Search Input */}
                            <div className="relative w-full sm:w-80">
                              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                              <input
                                type="text"
                                placeholder="Search income by source, description, or amount..."
                                value={incomeSearchTerm}
                                onChange={(e) => setIncomeSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode 
                                  ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 focus:ring-violet-500/20' 
                                  : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-violet-300 focus:ring-violet-500/20'}`}
                              />
                              {incomeSearchTerm && (
                                <button
                                  onClick={() => setIncomeSearchTerm('')}
                                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-white/70' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            {/* Report Button */}
                            <div className="relative">
                              <button
                                onClick={() => setReportDropdownOpen(reportDropdownOpen === 'income' ? null : 'income')}
                                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                              >
                                <FileText className="w-4 h-4" />
                                Report
                                <ChevronDown className={`w-4 h-4 transition-transform ${reportDropdownOpen === 'income' ? 'rotate-180' : ''}`} />
                              </button>
                              {reportDropdownOpen === 'income' && (
                                <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                                  {[
                                    { label: 'Today Report', value: 'today' },
                                    { label: 'Weekly Report', value: 'weekly' },
                                    { label: 'Monthly Report', value: 'monthly' },
                                    { label: 'Yearly Report', value: 'yearly' },
                                    { label: 'Custom Range', value: 'custom' },
                                  ].map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => {
                                        setReportType('income');
                                        setReportPeriod(option.value as any);
                                        setShowReportModal(true);
                                        setReportDropdownOpen(null);
                                      }}
                                      className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${isDarkMode ? 'hover:bg-white/5 text-white/70 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => setShowAddIncomeModal(true)}
                              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                            >
                              <UserPlus className="w-4 h-4" />
                              Add Income
                            </button>
                          </div>
                        </div>
                        
                        {/* Search Results Info */}
                        {incomeSearchTerm && (
                          <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                            Found {incomeRecords.filter(record => 
                              record.source.toLowerCase().includes(incomeSearchTerm.toLowerCase()) ||
                              record.description.toLowerCase().includes(incomeSearchTerm.toLowerCase()) ||
                              record.amount.toString().includes(incomeSearchTerm.toLowerCase()) ||
                              record.paymentMode.toLowerCase().includes(incomeSearchTerm.toLowerCase()) ||
                              record.status.toLowerCase().includes(incomeSearchTerm.toLowerCase())
                            ).length} income record(s) matching "{incomeSearchTerm}"
                          </div>
                        )}
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                            <tr>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>ID</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Source</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Description</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Amount</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Date</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Payment Mode</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.06]">
                            {incomeRecords
                              .filter(record => {
                                if (!incomeSearchTerm) return true;
                                const searchTerm = incomeSearchTerm.toLowerCase();
                                return (
                                  record.source.toLowerCase().includes(searchTerm) ||
                                  record.description.toLowerCase().includes(searchTerm) ||
                                  record.amount.toString().includes(searchTerm) ||
                                  record.paymentMode.toLowerCase().includes(searchTerm) ||
                                  record.status.toLowerCase().includes(searchTerm) ||
                                  record.id.toLowerCase().includes(searchTerm)
                                );
                              })
                              .map((record) => (
                              <tr 
                                key={record.id}
                                className={`transition-colors duration-200 ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}
                              >
                                <td className={`px-6 py-4 text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                                  {record.id}
                                </td>
                                <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {record.source}
                                </td>
                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                  {record.description}
                                </td>
                                <td className={`px-6 py-4 text-sm font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                  ${record.amount.toLocaleString()}
                                </td>
                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                  {formatDate(record.date)}
                                </td>
                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                                    {record.paymentMode}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                    record.status === 'received'
                                      ? isDarkMode ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : isDarkMode ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'
                                  }`}>
                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* No Results Message for Income */}
                      {incomeSearchTerm && incomeRecords.filter(record => {
                        const searchTerm = incomeSearchTerm.toLowerCase();
                        return (
                          record.source.toLowerCase().includes(searchTerm) ||
                          record.description.toLowerCase().includes(searchTerm) ||
                          record.amount.toString().includes(searchTerm) ||
                          record.paymentMode.toLowerCase().includes(searchTerm) ||
                          record.status.toLowerCase().includes(searchTerm) ||
                          record.id.toLowerCase().includes(searchTerm)
                        );
                      }).length === 0 && (
                        <div className={`text-center py-12 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          <ArrowUpCircle className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                          <p className="text-lg font-medium mb-2">No income records found</p>
                          <p className="text-sm">Try adjusting your search terms or check the spelling.</p>
                          <button
                            onClick={() => setIncomeSearchTerm('')}
                            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                          >
                            Clear Search
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Expenses Section */}
                {accountsSubSection === 'expenses' && (
                  <>
                    {/* Expense Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {[
                        { label: 'Total Expenses', value: '$18,400', icon: CircleDollarSign, color: 'red' },
                        { label: 'Operations Cost', value: '$5,700', icon: Building2, color: 'blue' },
                        { label: 'Marketing Cost', value: '$3,750', icon: Megaphone, color: 'violet' },
                        { label: 'Other Expenses', value: '$8,950', icon: ShoppingCart, color: 'amber' },
                      ].map((stat, index) => (
                        <div 
                          key={index}
                          className={`group relative rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:shadow-xl hover:shadow-white/5' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                <stat.icon className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`} />
                              </div>
                              <ArrowDownCircle className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                            </div>
                            <div>
                              <p className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                              <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{stat.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expense Table */}
                    <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                      <div className={`p-6 border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div>
                            <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              <ArrowDownCircle className="w-5 h-5 text-red-400" />
                              Expense Records
                            </h2>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                              Monitor all expenses and operational costs
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            {/* Search Input */}
                            <div className="relative w-full sm:w-80">
                              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                              <input
                                type="text"
                                placeholder="Search expenses by category, description, or amount..."
                                value={expensesSearchTerm}
                                onChange={(e) => setExpensesSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode 
                                  ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 focus:ring-violet-500/20' 
                                  : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-violet-300 focus:ring-violet-500/20'}`}
                              />
                              {expensesSearchTerm && (
                                <button
                                  onClick={() => setExpensesSearchTerm('')}
                                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-white/70' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            {/* Report Button */}
                            <div className="relative">
                              <button
                                onClick={() => setReportDropdownOpen(reportDropdownOpen === 'expense' ? null : 'expense')}
                                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                              >
                                <FileText className="w-4 h-4" />
                                Report
                                <ChevronDown className={`w-4 h-4 transition-transform ${reportDropdownOpen === 'expense' ? 'rotate-180' : ''}`} />
                              </button>
                              {reportDropdownOpen === 'expense' && (
                                <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                                  {[
                                    { label: 'Today Report', value: 'today' },
                                    { label: 'Weekly Report', value: 'weekly' },
                                    { label: 'Monthly Report', value: 'monthly' },
                                    { label: 'Yearly Report', value: 'yearly' },
                                    { label: 'Custom Range', value: 'custom' },
                                  ].map((option) => (
                                    <button
                                      key={option.value}
                                      onClick={() => {
                                        setReportType('expense');
                                        setReportPeriod(option.value as any);
                                        setShowReportModal(true);
                                        setReportDropdownOpen(null);
                                      }}
                                      className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${isDarkMode ? 'hover:bg-white/5 text-white/70 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                                    >
                                      {option.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => setShowAddExpenseModal(true)}
                              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30' : 'bg-red-600 text-white hover:bg-red-700'}`}
                            >
                              <UserPlus className="w-4 h-4" />
                              Add Expense
                            </button>
                          </div>
                        </div>
                        
                        {/* Search Results Info */}
                        {expensesSearchTerm && (
                          <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                            Found {expenseRecords.filter(record => 
                              record.category.toLowerCase().includes(expensesSearchTerm.toLowerCase()) ||
                              record.description.toLowerCase().includes(expensesSearchTerm.toLowerCase()) ||
                              record.amount.toString().includes(expensesSearchTerm.toLowerCase()) ||
                              record.paymentMode.toLowerCase().includes(expensesSearchTerm.toLowerCase()) ||
                              record.status.toLowerCase().includes(expensesSearchTerm.toLowerCase())
                            ).length} expense record(s) matching "{expensesSearchTerm}"
                          </div>
                        )}
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className={`${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                            <tr>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>ID</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Category</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Description</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Amount</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Date</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Payment Mode</th>
                              <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.06]">
                            {expenseRecords
                              .filter(record => {
                                if (!expensesSearchTerm) return true;
                                const searchTerm = expensesSearchTerm.toLowerCase();
                                return (
                                  record.category.toLowerCase().includes(searchTerm) ||
                                  record.description.toLowerCase().includes(searchTerm) ||
                                  record.amount.toString().includes(searchTerm) ||
                                  record.paymentMode.toLowerCase().includes(searchTerm) ||
                                  record.status.toLowerCase().includes(searchTerm) ||
                                  record.id.toLowerCase().includes(searchTerm)
                                );
                              })
                              .map((record) => (
                              <tr 
                                key={record.id}
                                className={`transition-colors duration-200 ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}
                              >
                                <td className={`px-6 py-4 text-sm font-mono ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                                  {record.id}
                                </td>
                                <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  <span className={`px-2.5 py-1 rounded-lg text-xs ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    {record.category}
                                  </span>
                                </td>
                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                  {record.description}
                                </td>
                                <td className={`px-6 py-4 text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                                  ${record.amount.toLocaleString()}
                                </td>
                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                  {formatDate(record.date)}
                                </td>
                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                                    {record.paymentMode}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                    record.status === 'paid'
                                      ? isDarkMode ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                      : isDarkMode ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'
                                  }`}>
                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* No Results Message for Expenses */}
                      {expensesSearchTerm && expenseRecords.filter(record => {
                        const searchTerm = expensesSearchTerm.toLowerCase();
                        return (
                          record.category.toLowerCase().includes(searchTerm) ||
                          record.description.toLowerCase().includes(searchTerm) ||
                          record.amount.toString().includes(searchTerm) ||
                          record.paymentMode.toLowerCase().includes(searchTerm) ||
                          record.status.toLowerCase().includes(searchTerm) ||
                          record.id.toLowerCase().includes(searchTerm)
                        );
                      }).length === 0 && (
                        <div className={`text-center py-12 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          <ArrowDownCircle className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                          <p className="text-lg font-medium mb-2">No expense records found</p>
                          <p className="text-sm">Try adjusting your search terms or check the spelling.</p>
                          <button
                            onClick={() => setExpensesSearchTerm('')}
                            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                          >
                            Clear Search
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Balance Sheet Section */}
                {accountsSubSection === 'balance' && (
                  <>
                    {/* Report Button */}
                    <div className="flex justify-end gap-3 mb-4">
                      <div className="relative">
                        <button
                          onClick={() => setReportDropdownOpen(reportDropdownOpen === 'balance' ? null : 'balance')}
                          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                        >
                          <FileText className="w-4 h-4" />
                          Report
                          <ChevronDown className={`w-4 h-4 transition-transform ${reportDropdownOpen === 'balance' ? 'rotate-180' : ''}`} />
                        </button>
                        {reportDropdownOpen === 'balance' && (
                          <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                            {[
                              { label: 'Today Report', value: 'today' },
                              { label: 'Weekly Report', value: 'weekly' },
                              { label: 'Monthly Report', value: 'monthly' },
                              { label: 'Yearly Report', value: 'yearly' },
                              { label: 'Custom Range', value: 'custom' },
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setReportType('balance');
                                  setReportPeriod(option.value as any);
                                  setShowReportModal(true);
                                  setReportDropdownOpen(null);
                                }}
                                className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${isDarkMode ? 'hover:bg-white/5 text-white/70 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Total Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-emerald-500/10' : 'bg-emerald-100'}`}>
                            <ArrowUpCircle className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          </div>
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Total Income</span>
                        </div>
                        <p className={`text-3xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                          ${assets.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                        </p>
                      </div>

                      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gradient-to-br from-red-500/10 to-transparent border-red-500/20' : 'bg-gradient-to-br from-red-50 to-white border-red-200'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-500/10' : 'bg-red-100'}`}>
                            <ArrowDownCircle className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                          </div>
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Total Expenses</span>
                        </div>
                        <p className={`text-3xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                          ${liabilities.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                        </p>
                      </div>

                      <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-gradient-to-br from-violet-500/10 to-transparent border-violet-500/20' : 'bg-gradient-to-br from-violet-50 to-white border-violet-200'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-violet-500/10' : 'bg-violet-100'}`}>
                            <BarChart3 className={`w-5 h-5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                          </div>
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Net Profit</span>
                        </div>
                        <p className={`text-3xl font-bold ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                          ${(assets.reduce((sum, item) => sum + item.amount, 0) - liabilities.reduce((sum, item) => sum + item.amount, 0)).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Income by Category */}
                      <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                        <div className={`p-6 border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            Income by Category
                          </h3>
                        </div>
                        <div className="p-6 space-y-3">
                          {Object.entries(
                            assets.reduce((acc, item) => {
                              if (!acc[item.category]) acc[item.category] = { total: 0, items: [] };
                              acc[item.category].total += item.amount;
                              acc[item.category].items.push(item);
                              return acc;
                            }, {} as Record<string, { total: number; items: BalanceSheetItem[] }>)
                          ).map(([category, data]) => (
                            <div key={category} className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                              <div className={`p-4 ${isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-50'}`}>
                                <div className="flex items-center justify-between">
                                  <span className={`text-sm font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>{category}</span>
                                  <span className={`text-lg font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                    ${data.total.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div className="p-3 space-y-2">
                                {data.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-sm">
                                    <div className="flex flex-col gap-0.5">
                                      <span className={`${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{item.label}</span>
                                      <span className={`text-xs px-2 py-0.5 rounded w-fit ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                        {item.paymentMode}
                                      </span>
                                    </div>
                                    <span className={`font-semibold ${isDarkMode ? 'text-white/90' : 'text-gray-900'}`}>
                                      ${item.amount.toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className={`pt-4 mt-4 border-t ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Income</span>
                              <span className={`text-xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                ${assets.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expenses by Category */}
                      <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                        <div className={`p-6 border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <ArrowDownCircle className="w-5 h-5 text-red-400" />
                            Expenses by Category
                          </h3>
                        </div>
                        <div className="p-6 space-y-3">
                          {Object.entries(
                            liabilities.reduce((acc, item) => {
                              if (!acc[item.category]) acc[item.category] = { total: 0, items: [] };
                              acc[item.category].total += item.amount;
                              acc[item.category].items.push(item);
                              return acc;
                            }, {} as Record<string, { total: number; items: BalanceSheetItem[] }>)
                          ).map(([category, data]) => (
                            <div key={category} className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                              <div className={`p-4 ${isDarkMode ? 'bg-red-500/5' : 'bg-red-50'}`}>
                                <div className="flex items-center justify-between">
                                  <span className={`text-sm font-bold ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>{category}</span>
                                  <span className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                                    ${data.total.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                              <div className="p-3 space-y-2">
                                {data.items.map((item, idx) => (
                                  <div key={idx} className="flex items-center justify-between text-sm">
                                    <div className="flex flex-col gap-0.5">
                                      <span className={`${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{item.label}</span>
                                      <span className={`text-xs px-2 py-0.5 rounded w-fit ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                        {item.paymentMode}
                                      </span>
                                    </div>
                                    <span className={`font-semibold ${isDarkMode ? 'text-white/90' : 'text-gray-900'}`}>
                                      ${item.amount.toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className={`pt-4 mt-4 border-t ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Expenses</span>
                              <span className={`text-xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                                ${liabilities.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Net Profit/Loss Summary */}
                    <div className={`rounded-2xl border p-8 relative overflow-hidden group hover:scale-[1.01] transition-all duration-500 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:shadow-2xl hover:shadow-violet-500/20' : 'bg-white border-gray-200 hover:border-violet-300 hover:shadow-xl'}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className={`text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              <BarChart3 className="w-7 h-7 text-violet-400" />
                              Profit & Loss Statement
                            </h3>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                              Total Income - Total Expenses = Net Profit
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Net Profit</p>
                            <p className={`text-4xl font-bold ${(assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 0 ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}`}>
                              ${Math.abs(assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)).toLocaleString()}
                            </p>
                            <p className={`text-xs mt-1 ${(assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 0 ? (isDarkMode ? 'text-emerald-400/70' : 'text-emerald-600/70') : (isDarkMode ? 'text-red-400/70' : 'text-red-600/70')}`}>
                              {(assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 0 ? 'Profit' : 'Loss'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Calculation Breakdown */}
                        <div className={`grid grid-cols-3 gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                          <div className="text-center">
                            <p className={`text-sm mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Income</p>
                            <p className={`text-xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                              ${assets.reduce((sum, a) => sum + a.amount, 0).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-center flex items-center justify-center">
                            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white/30' : 'text-gray-300'}`}>−</span>
                          </div>
                          <div className="text-center">
                            <p className={`text-sm mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Expenses</p>
                            <p className={`text-xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                              ${liabilities.reduce((sum, l) => sum + l.amount, 0).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Financial Health Indicator */}
                        <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Financial Health</span>
                            <span className={`text-sm font-bold ${(assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 40000 ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : (assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 20000 ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-600') : (isDarkMode ? 'text-red-400' : 'text-red-600')}`}>
                              {(assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 40000 ? 'Excellent' : (assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 20000 ? 'Good' : 'Needs Attention'}
                            </span>
                          </div>
                          <div className={`w-full h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${(assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 40000 ? 'bg-gradient-to-r from-emerald-500 to-violet-500' : (assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) >= 20000 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}
                              style={{ width: `${Math.min(((assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)) / 50000) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Events Announcements Section */}
            {activeSection === 'events' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Events Section */}
                {eventsSubSection === 'events-list' && (
                  <>
                    {/* Header with Add Event Button */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div>
                        <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <Calendar className="w-6 h-6 text-violet-400" />
                          Events Management
                        </h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          Create and manage events for members
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                          <input
                            type="text"
                            placeholder="Search events by title, location, or category..."
                            value={eventsSearchTerm}
                            onChange={(e) => setEventsSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode 
                              ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 focus:ring-violet-500/20' 
                              : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-violet-300 focus:ring-violet-500/20'}`}
                          />
                          {eventsSearchTerm && (
                            <button
                              onClick={() => setEventsSearchTerm('')}
                              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-white/70' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        {/* Report Button */}
                        <div className="relative">
                          <button
                            onClick={() => setReportDropdownOpen(reportDropdownOpen === 'events' ? null : 'events')}
                            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                          >
                            <FileText className="w-4 h-4" />
                            Report
                            <ChevronDown className={`w-4 h-4 transition-transform ${reportDropdownOpen === 'events' ? 'rotate-180' : ''}`} />
                          </button>
                          {reportDropdownOpen === 'events' && (
                            <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                              {[
                                { label: 'Today Report', value: 'today' },
                                { label: 'Weekly Report', value: 'weekly' },
                                { label: 'Monthly Report', value: 'monthly' },
                                { label: 'Yearly Report', value: 'yearly' },
                                { label: 'Custom Range', value: 'custom' },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    setReportType('events');
                                    setReportPeriod(option.value as any);
                                    setShowReportModal(true);
                                    setReportDropdownOpen(null);
                                  }}
                                  className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${isDarkMode ? 'hover:bg-white/5 text-white/70 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setShowAddEventModal(true)}
                          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                        >
                          <UserPlus className="w-4 h-4" />
                          Create Event
                        </button>
                      </div>
                    </div>

                    {/* Search Results Info */}
                    {eventsSearchTerm && (
                      <div className={`mb-4 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                        Found {events.filter(event => 
                          event.title.toLowerCase().includes(eventsSearchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(eventsSearchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(eventsSearchTerm.toLowerCase()) ||
                          event.category.toLowerCase().includes(eventsSearchTerm.toLowerCase()) ||
                          event.status.toLowerCase().includes(eventsSearchTerm.toLowerCase())
                        ).length} event(s) matching "{eventsSearchTerm}"
                      </div>
                    )}

                    {/* Events List */}
                    <div className="grid grid-cols-1 gap-6">
                      {events
                        .filter(event => {
                          if (!eventsSearchTerm) return true;
                          const searchTerm = eventsSearchTerm.toLowerCase();
                          return (
                            event.title.toLowerCase().includes(searchTerm) ||
                            event.description.toLowerCase().includes(searchTerm) ||
                            event.location.toLowerCase().includes(searchTerm) ||
                            event.category.toLowerCase().includes(searchTerm) ||
                            event.status.toLowerCase().includes(searchTerm)
                          );
                        })
                        .map((event, index) => (
                        <div 
                          key={event.id}
                          className={`rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          {/* Banner Image */}
                          {event.bannerImage && (
                            <div className="w-full h-48 overflow-hidden">
                              <img 
                                src={event.bannerImage} 
                                alt={event.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {event.title}
                                  </h3>
                                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                                    event.status === 'published'
                                      ? isDarkMode ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                                      : isDarkMode ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-50 text-amber-700'
                                  }`}>
                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                  </span>
                                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                                    {event.category}
                                  </span>
                                </div>
                                <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                                  {event.description}
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Date</p>
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{formatDate(event.date)}</p>
                                  </div>
                                  <div>
                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Time</p>
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{event.time}</p>
                                  </div>
                                  <div>
                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Location</p>
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{event.location}</p>
                                  </div>
                                  {event.maxParticipants && (
                                    <div>
                                      <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Max Participants</p>
                                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{event.maxParticipants}</p>
                                    </div>
                                  )}
                                </div>
                                {event.registrationLink && (
                                  <div className="mt-4">
                                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Registration Link</p>
                                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className={`text-sm ${isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'} break-all`}>
                                      {event.registrationLink}
                                    </a>
                                  </div>
                                )}
                              </div>
                              {event.status === 'draft' && (
                                <button
                                  onClick={() => handlePublishEvent(event.id)}
                                  className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDarkMode ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                                >
                                  Publish Event
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* No Results Message */}
                    {eventsSearchTerm && events.filter(event => {
                      const searchTerm = eventsSearchTerm.toLowerCase();
                      return (
                        event.title.toLowerCase().includes(searchTerm) ||
                        event.description.toLowerCase().includes(searchTerm) ||
                        event.location.toLowerCase().includes(searchTerm) ||
                        event.category.toLowerCase().includes(searchTerm) ||
                        event.status.toLowerCase().includes(searchTerm)
                      );
                    }).length === 0 && (
                      <div className={`text-center py-12 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        <Calendar className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                        <p className="text-lg font-medium mb-2">No events found</p>
                        <p className="text-sm">Try adjusting your search terms or check the spelling.</p>
                        <button
                          onClick={() => setEventsSearchTerm('')}
                          className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Announcements Section */}
                {eventsSubSection === 'announcements' && (
                  <>
                    {/* Header with Add Announcement Button */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div>
                        <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <Megaphone className="w-6 h-6 text-orange-400" />
                          Announcements
                        </h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          Create and manage announcements for members
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                          <input
                            type="text"
                            placeholder="Search announcements by title, message, or type..."
                            value={announcementsSearchTerm}
                            onChange={(e) => setAnnouncementsSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode 
                              ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 focus:ring-violet-500/20' 
                              : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-violet-300 focus:ring-violet-500/20'}`}
                          />
                          {announcementsSearchTerm && (
                            <button
                              onClick={() => setAnnouncementsSearchTerm('')}
                              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-white/70' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        {/* Report Button */}
                        <div className="relative">
                          <button
                            onClick={() => setReportDropdownOpen(reportDropdownOpen === 'announcements' ? null : 'announcements')}
                            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                          >
                            <FileText className="w-4 h-4" />
                            Report
                            <ChevronDown className={`w-4 h-4 transition-transform ${reportDropdownOpen === 'announcements' ? 'rotate-180' : ''}`} />
                          </button>
                          {reportDropdownOpen === 'announcements' && (
                            <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                              {[
                                { label: 'Today Report', value: 'today' },
                                { label: 'Weekly Report', value: 'weekly' },
                                { label: 'Monthly Report', value: 'monthly' },
                                { label: 'Yearly Report', value: 'yearly' },
                                { label: 'Custom Range', value: 'custom' },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    setReportType('announcements');
                                    setReportPeriod(option.value as any);
                                    setShowReportModal(true);
                                    setReportDropdownOpen(null);
                                  }}
                                  className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${isDarkMode ? 'hover:bg-white/5 text-white/70 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setShowAddAnnouncementModal(true)}
                          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
                        >
                          <Send className="w-4 h-4" />
                          Create Announcement
                        </button>
                      </div>
                    </div>

                    {/* Search Results Info */}
                    {announcementsSearchTerm && (
                      <div className={`mb-4 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                        Found {announcements.filter(announcement => 
                          announcement.title.toLowerCase().includes(announcementsSearchTerm.toLowerCase()) ||
                          announcement.message.toLowerCase().includes(announcementsSearchTerm.toLowerCase()) ||
                          announcement.type.toLowerCase().includes(announcementsSearchTerm.toLowerCase()) ||
                          announcement.priority.toLowerCase().includes(announcementsSearchTerm.toLowerCase()) ||
                          announcement.status.toLowerCase().includes(announcementsSearchTerm.toLowerCase())
                        ).length} announcement(s) matching "{announcementsSearchTerm}"
                      </div>
                    )}

                    {/* Announcements List */}
                    <div className="grid grid-cols-1 gap-6">
                      {announcements
                        .filter(announcement => {
                          if (!announcementsSearchTerm) return true;
                          const searchTerm = announcementsSearchTerm.toLowerCase();
                          return (
                            announcement.title.toLowerCase().includes(searchTerm) ||
                            announcement.message.toLowerCase().includes(searchTerm) ||
                            announcement.type.toLowerCase().includes(searchTerm) ||
                            announcement.priority.toLowerCase().includes(searchTerm) ||
                            announcement.status.toLowerCase().includes(searchTerm)
                          );
                        })
                        .map((announcement, index) => (
                        <div 
                          key={announcement.id}
                          className={`rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.01] ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {announcement.title}
                                </h3>
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                                  announcement.status === 'published'
                                    ? isDarkMode ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                                    : isDarkMode ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                                </span>
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                                  announcement.priority === 'high'
                                    ? isDarkMode ? 'bg-red-500/15 text-red-400' : 'bg-red-50 text-red-700'
                                    : announcement.priority === 'medium'
                                    ? isDarkMode ? 'bg-yellow-500/15 text-yellow-400' : 'bg-yellow-50 text-yellow-700'
                                    : isDarkMode ? 'bg-green-500/15 text-green-400' : 'bg-green-50 text-green-700'
                                }`}>
                                  {announcement.priority.toUpperCase()}
                                </span>
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-purple-500/15 text-purple-400' : 'bg-purple-50 text-purple-700'}`}>
                                  {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                                </span>
                              </div>
                              <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                                {announcement.message}
                              </p>
                              <div className="flex gap-6">
                                <div>
                                  <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Created</p>
                                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{formatDate(announcement.createdAt)}</p>
                                </div>
                                {announcement.expiryDate && (
                                  <div>
                                    <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Expires</p>
                                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white/80' : 'text-gray-800'}`}>{formatDate(announcement.expiryDate)}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            {announcement.status === 'draft' && (
                              <button
                                onClick={() => handlePublishAnnouncement(announcement.id)}
                                className={`ml-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isDarkMode ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* No Results Message */}
                    {announcementsSearchTerm && announcements.filter(announcement => {
                      const searchTerm = announcementsSearchTerm.toLowerCase();
                      return (
                        announcement.title.toLowerCase().includes(searchTerm) ||
                        announcement.message.toLowerCase().includes(searchTerm) ||
                        announcement.type.toLowerCase().includes(searchTerm) ||
                        announcement.priority.toLowerCase().includes(searchTerm) ||
                        announcement.status.toLowerCase().includes(searchTerm)
                      );
                    }).length === 0 && (
                      <div className={`text-center py-12 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        <Megaphone className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                        <p className="text-lg font-medium mb-2">No announcements found</p>
                        <p className="text-sm">Try adjusting your search terms or check the spelling.</p>
                        <button
                          onClick={() => setAnnouncementsSearchTerm('')}
                          className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Membership Details Section */}
            {activeSection === 'membership' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`rounded-2xl border p-8 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <CreditCard className="w-5 h-5" />
                      Membership Details Overview
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {/* Search Input */}
                      <div className="relative w-full sm:w-80">
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                        <input
                          type="text"
                          placeholder="Search members by name, email, or ID..."
                          value={membershipSearchTerm}
                          onChange={(e) => setMembershipSearchTerm(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode 
                            ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 focus:ring-violet-500/20' 
                            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-violet-300 focus:ring-violet-500/20'}`}
                        />
                        {membershipSearchTerm && (
                          <button
                            onClick={() => setMembershipSearchTerm('')}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-white/70' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      {/* Report Button */}
                      <div className="relative">
                        <button
                          onClick={() => setReportDropdownOpen(reportDropdownOpen === 'membership' ? null : 'membership')}
                          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                        >
                          <FileText className="w-4 h-4" />
                          Report
                          <ChevronDown className={`w-4 h-4 transition-transform ${reportDropdownOpen === 'membership' ? 'rotate-180' : ''}`} />
                        </button>
                        {reportDropdownOpen === 'membership' && (
                          <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                            {[
                              { label: 'Today Report', value: 'today' },
                              { label: 'Weekly Report', value: 'weekly' },
                              { label: 'Monthly Report', value: 'monthly' },
                              { label: 'Yearly Report', value: 'yearly' },
                              { label: 'Custom Range', value: 'custom' },
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setReportType('membership');
                                  setReportPeriod(option.value as any);
                                  setShowReportModal(true);
                                  setReportDropdownOpen(null);
                                }}
                                className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${isDarkMode ? 'hover:bg-white/5 text-white/70 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  

                  {/* Search Results Info */}
                  {membershipSearchTerm && (
                    <div className={`mb-4 text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                      Found {memberAccounts.filter(account => 
                        account.status === 'approved' &&
                        (account.name.toLowerCase().includes(membershipSearchTerm.toLowerCase()) ||
                        account.email.toLowerCase().includes(membershipSearchTerm.toLowerCase()) ||
                        account.id.toLowerCase().includes(membershipSearchTerm.toLowerCase()) ||
                        account.membershipType.toLowerCase().includes(membershipSearchTerm.toLowerCase()))
                      ).length} member(s) matching "{membershipSearchTerm}"
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {memberAccounts
                      .filter(account => {
                        // Only show approved members
                        if (account.status !== 'approved') return false;
                        if (!membershipSearchTerm) return true;
                        const searchTerm = membershipSearchTerm.toLowerCase();
                        return (
                          account.name.toLowerCase().includes(searchTerm) ||
                          account.email.toLowerCase().includes(searchTerm) ||
                          account.id.toLowerCase().includes(searchTerm) ||
                          account.membershipType.toLowerCase().includes(searchTerm)
                        );
                      })
                      .map((account, index) => (
                      <div 
                        key={account.id}
                        className={`group relative rounded-xl border p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:shadow-xl hover:shadow-white/5' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Status indicator */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-mono ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>{account.id}</span>
                          <span className={`px-2 py-0.5 rounded-lg text-xs font-medium border ${getStatusColor(account.status)}`}>
                            {account.status === 'approved' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                            {account.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                            {account.status === 'rejected' && <XCircle className="w-3 h-3 inline mr-1" />}
                            {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                          </span>
                        </div>

                        {/* Member info */}
                        <div className="space-y-3">
                          <div>
                            <p className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{account.name}</p>
                            <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{account.email}</p>
                          </div>

                          <div className={`pt-3 border-t ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-100'} space-y-2`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Type:</span>
                              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{account.membershipType}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Joined:</span>
                              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(account.dateJoined)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Expires:</span>
                              <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(account.expiryDate)}</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => setSelectedMember(account)}
                            className={`w-full mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* No Results Message */}
                  {membershipSearchTerm && memberAccounts.filter(account => {
                    if (account.status !== 'approved') return false;
                    const searchTerm = membershipSearchTerm.toLowerCase();
                    return (
                      account.name.toLowerCase().includes(searchTerm) ||
                      account.email.toLowerCase().includes(searchTerm) ||
                      account.id.toLowerCase().includes(searchTerm) ||
                      account.membershipType.toLowerCase().includes(searchTerm)
                    );
                  }).length === 0 && (
                    <div className={`text-center py-12 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                      <Users className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                      <p className="text-lg font-medium mb-2">No members found</p>
                      <p className="text-sm">Try adjusting your search terms or check the spelling.</p>
                      <button
                        onClick={() => setMembershipSearchTerm('')}
                        className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                  
                  {/* No Approved Members Message */}
                  {!membershipSearchTerm && memberAccounts.filter(account => account.status === 'approved').length === 0 && (
                    <div className={`text-center py-12 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                      <Users className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                      <p className="text-lg font-medium mb-2">No approved members yet</p>
                      <p className="text-sm">Members will appear here once they are approved in the Membership Approvals section.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Membership Approvals Section */}
            {activeSection === 'proofs' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                  <div className={`p-6 border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <UserPlus className="w-5 h-5" />
                          Membership Applications
                        </h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          Review pending applications and approve or reject membership requests
                        </p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                          <input
                            type="text"
                            placeholder="Search by name, email, or skills..."
                            value={proofsSearchTerm}
                            onChange={(e) => setProofsSearchTerm(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${isDarkMode 
                              ? 'bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-white/20 focus:ring-violet-500/20' 
                              : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-violet-300 focus:ring-violet-500/20'}`}
                          />
                          {proofsSearchTerm && (
                            <button
                              onClick={() => setProofsSearchTerm('')}
                              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/40 hover:text-white/70' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        {/* Report Button */}
                        <div className="relative">
                          <button
                            onClick={() => setReportDropdownOpen(reportDropdownOpen === 'approvals' ? null : 'approvals')}
                            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 whitespace-nowrap ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                          >
                            <FileText className="w-4 h-4" />
                            Report
                            <ChevronDown className={`w-4 h-4 transition-transform ${reportDropdownOpen === 'approvals' ? 'rotate-180' : ''}`} />
                          </button>
                          {reportDropdownOpen === 'approvals' && (
                            <div className={`absolute right-0 mt-2 w-48 rounded-xl border shadow-xl z-50 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                              {[
                                { label: 'Today Report', value: 'today' },
                                { label: 'Weekly Report', value: 'weekly' },
                                { label: 'Monthly Report', value: 'monthly' },
                                { label: 'Yearly Report', value: 'yearly' },
                                { label: 'Custom Range', value: 'custom' },
                              ].map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => {
                                    setReportType('approvals');
                                    setReportPeriod(option.value as any);
                                    setShowReportModal(true);
                                    setReportDropdownOpen(null);
                                  }}
                                  className={`w-full px-4 py-3 text-left text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${isDarkMode ? 'hover:bg-white/5 text-white/70 hover:text-white' : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'}`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
                        <div className="flex items-center gap-3">
                          <Clock className={`w-5 h-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                          <div>
                            <p className={`text-xs ${isDarkMode ? 'text-amber-400/70' : 'text-amber-600/70'}`}>Pending</p>
                            <p className={`text-lg font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                              {pendingApplications.filter(app => app.status === 'pending').length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          <div>
                            <p className={`text-xs ${isDarkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}`}>Approved</p>
                            <p className={`text-lg font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                              {pendingApplications.filter(app => app.status === 'approved').length}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                        <div className="flex items-center gap-3">
                          <XCircle className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                          <div>
                            <p className={`text-xs ${isDarkMode ? 'text-red-400/70' : 'text-red-600/70'}`}>Rejected</p>
                            <p className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
                              {pendingApplications.filter(app => app.status === 'rejected').length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {pendingApplications
                        .filter(app => {
                          if (!proofsSearchTerm) return app.status === 'pending';
                          const searchTerm = proofsSearchTerm.toLowerCase();
                          return app.status === 'pending' && (
                            app.fullName.toLowerCase().includes(searchTerm) ||
                            app.email.toLowerCase().includes(searchTerm) ||
                            app.jobTitle.toLowerCase().includes(searchTerm) ||
                            app.companyName.toLowerCase().includes(searchTerm) ||
                            app.skillsets.some(skill => skill.toLowerCase().includes(searchTerm))
                          );
                        })
                        .map((app, index) => (
                      <div 
                        key={app.id}
                        className={`group relative rounded-xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] cursor-pointer ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:shadow-xl hover:shadow-white/5' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => setSelectedApplication(app)}
                      >
                        {/* Header with Profile Photo */}
                        <div className={`p-5 border-b ${isDarkMode ? 'border-white/[0.06] bg-gradient-to-br from-violet-500/10 to-cyan-500/10' : 'border-gray-200 bg-gradient-to-br from-violet-50 to-cyan-50'}`}>
                          <div className="flex items-start gap-4">
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-violet-500 to-cyan-500' : 'bg-gradient-to-br from-violet-600 to-cyan-600'} text-white shadow-lg`}>
                              <User className="w-8 h-8" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={`text-lg font-bold mb-1 truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.fullName}</h3>
                              <p className={`text-sm mb-1 truncate ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>{app.jobTitle}</p>
                              <p className={`text-xs truncate ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{app.companyName}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(app.status)}`}>
                              <Clock className="w-3 h-3 inline mr-1" />
                              Pending
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 space-y-4">
                          {/* Quick Info */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                              <MapPin className={`w-4 h-4 mb-1 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Location</p>
                              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.emirate}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                              <Briefcase className={`w-4 h-4 mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                              <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Experience</p>
                              <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.totalIndustryExperience} years</p>
                            </div>
                          </div>

                          {/* Skills Preview */}
                          <div>
                            <p className={`text-xs font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>
                              <Award className="w-3 h-3 inline mr-1" />
                              Skills ({app.skillsets.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {app.skillsets.slice(0, 3).map((skill, idx) => (
                                <span key={idx} className={`px-2 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-700 border border-violet-200'}`}>
                                  {skill}
                                </span>
                              ))}
                              {app.skillsets.length > 3 && (
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-white/5 text-white/50' : 'bg-gray-100 text-gray-600'}`}>
                                  +{app.skillsets.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Portfolio Link */}
                          {app.portfolioLink && (
                            <div className={`p-3 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-gradient-to-r from-violet-500/10 to-transparent border border-violet-500/20' : 'bg-gradient-to-r from-violet-50 to-transparent border border-violet-200'}`}>
                              <LinkIcon className={`w-4 h-4 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                              <span className={`text-xs font-medium flex-1 truncate ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>Portfolio Available</span>
                              <ExternalLink className={`w-3 h-3 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                            </div>
                          )}

                          {/* Volunteering Interest */}
                          {app.interestedInVolunteering === 'Yes' && (
                            <div className={`p-3 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20' : 'bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-200'}`}>
                              <Heart className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                              <span className={`text-xs font-medium ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Interested in Volunteering ({app.volunteeringAreas.length} areas)</span>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-3 border-t border-white/5">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(app);
                              }}
                              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                            >
                              <Eye className="w-4 h-4" />
                              View Full Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    </div>
                    
                    {/* No Results Message */}
                    {pendingApplications.filter(app => app.status === 'pending').length === 0 && (
                      <div className={`text-center py-12 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        <UserPlus className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                        <p className="text-lg font-medium mb-2">No pending applications</p>
                        <p className="text-sm">All applications have been reviewed.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Section - Role-Based Access Control */}
            {activeSection === 'settings' && (
              <div className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                      <Settings className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Role-Based Access Control
                    </h2>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    Manage board member roles and permissions. Control access to different modules based on assigned roles.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-white border-blue-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Shield className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{roles.length}</span>
                    </div>
                    <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Total Roles</h3>
                  </div>

                  <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20' : 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Users className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{boardMembers.filter(m => m.status === 'active').length}</span>
                    </div>
                    <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Active Members</h3>
                  </div>

                  <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20' : 'bg-gradient-to-br from-purple-50 to-white border-purple-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Lock className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                      <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{availablePermissions.length}</span>
                    </div>
                    <h3 className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Module Permissions</h3>
                  </div>
                </div>

                {/* Tabs */}
                <div className={`flex gap-2 mb-6 p-1 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <button
                    onClick={() => setActiveRbacTab('members')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeRbacTab === 'members' ? (isDarkMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-blue-600 text-white shadow-lg') : (isDarkMode ? 'text-white/50 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}
                  >
                    <Users className="w-4 h-4 inline mr-2" />
                    Board Members
                  </button>
                  <button
                    onClick={() => setActiveRbacTab('roles')}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeRbacTab === 'roles' ? (isDarkMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-blue-600 text-white shadow-lg') : (isDarkMode ? 'text-white/50 hover:text-white' : 'text-gray-600 hover:text-gray-900')}`}
                  >
                    <Shield className="w-4 h-4 inline mr-2" />
                    Roles & Permissions
                  </button>
                </div>

                {/* Board Members Tab */}
                {activeRbacTab === 'members' && (
                  <div>
                    {/* Search and Add Button */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                        <input
                          type="text"
                          placeholder="Search by name or email..."
                          value={rbacSearchTerm}
                          onChange={(e) => setRbacSearchTerm(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500' : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500'}`}
                        />
                      </div>
                      <button
                        onClick={() => setShowAddBoardMemberModal(true)}
                        className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'}`}
                      >
                        <UserPlus className="w-4 h-4" />
                        Add Board Member
                      </button>
                    </div>

                    {/* Board Members List */}
                    <div className="space-y-4">
                      {boardMembers
                        .filter(member => 
                          member.name.toLowerCase().includes(rbacSearchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(rbacSearchTerm.toLowerCase())
                        )
                        .map((member) => {
                          const role = getRoleById(member.roleId);
                          const permissions = getPermissionsByRoleId(member.roleId);
                          
                          return (
                            <div key={member.id} className={`p-6 rounded-xl border transition-all duration-300 ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                  {/* Avatar */}
                                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30' : 'bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-300'}`}>
                                    <User className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                                  </div>

                                  {/* Info */}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${member.status === 'active' ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200') : (isDarkMode ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-50 text-red-700 border border-red-200')}`}>
                                        {member.status}
                                      </span>
                                    </div>
                                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{member.email}</p>

                                    {/* Role Badge */}
                                    {role && (
                                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3 ${isDarkMode ? `bg-${role.color}-500/10 border border-${role.color}-500/20` : `bg-${role.color}-50 border border-${role.color}-200`}`}>
                                        <Shield className={`w-4 h-4 ${isDarkMode ? `text-${role.color}-400` : `text-${role.color}-600`}`} />
                                        <span className={`text-sm font-medium ${isDarkMode ? `text-${role.color}-400` : `text-${role.color}-700`}`}>{role.name}</span>
                                      </div>
                                    )}

                                    {/* Permissions */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                      {permissions.slice(0, 3).map((perm) => {
                                        const PermIcon = perm.icon;
                                        return (
                                          <div key={perm.id} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs ${isDarkMode ? 'bg-white/5 text-white/70' : 'bg-gray-100 text-gray-700'}`}>
                                            <PermIcon className="w-3 h-3" />
                                            <span>{perm.label}</span>
                                          </div>
                                        );
                                      })}
                                      {permissions.length > 3 && (
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${isDarkMode ? 'bg-white/5 text-white/50' : 'bg-gray-100 text-gray-600'}`}>
                                          +{permissions.length - 3} more
                                        </span>
                                      )}
                                    </div>

                                    {/* Meta Info */}
                                    <div className={`flex items-center gap-4 text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>
                                      <span>Assigned: {member.assignedDate}</span>
                                      {member.lastLogin && <span>Last login: {member.lastLogin}</span>}
                                    </div>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setSelectedBoardMember(member);
                                      setShowEditBoardMemberModal(true);
                                    }}
                                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                                    title="Edit member"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleToggleMemberStatus(member.id)}
                                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                                    title={member.status === 'active' ? 'Deactivate' : 'Activate'}
                                  >
                                    {member.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                  </button>
                                  <button
                                    onClick={() => handleRemoveBoardMember(member.id)}
                                    className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                                    title="Remove member"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                    {/* No Results */}
                    {boardMembers.filter(member => 
                      member.name.toLowerCase().includes(rbacSearchTerm.toLowerCase()) ||
                      member.email.toLowerCase().includes(rbacSearchTerm.toLowerCase())
                    ).length === 0 && (
                      <div className={`text-center py-12 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        <Users className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                        <p className="text-lg font-medium mb-2">No board members found</p>
                        <p className="text-sm">Try adjusting your search or add a new board member.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Roles Tab */}
                {activeRbacTab === 'roles' && (
                  <div>
                    {/* Add Role Button */}
                    <div className="flex justify-end mb-6">
                      <button
                        onClick={() => setShowAddRoleModal(true)}
                        className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'}`}
                      >
                        <Plus className="w-4 h-4" />
                        Create New Role
                      </button>
                    </div>

                    {/* Roles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roles.map((role) => {
                        const assignedCount = boardMembers.filter(m => m.roleId === role.id).length;
                        const rolePermissions = availablePermissions.filter(p => role.permissions.includes(p.id));

                        return (
                          <div key={role.id} className={`p-6 rounded-xl border transition-all duration-300 ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isDarkMode ? `bg-${role.color}-500/10` : `bg-${role.color}-50`}`}>
                                  <Shield className={`w-5 h-5 ${isDarkMode ? `text-${role.color}-400` : `text-${role.color}-600`}`} />
                                </div>
                                <div>
                                  <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{role.name}</h3>
                                  <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`}>Created {role.createdAt}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    setSelectedRole(role);
                                    setShowEditRoleModal(true);
                                  }}
                                  className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteRole(role.id)}
                                  className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Description */}
                            <p className={`text-sm mb-4 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>{role.description}</p>

                            {/* Stats */}
                            <div className={`flex items-center gap-3 mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                              <div className="flex items-center gap-2">
                                <Users className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                                <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                                  {assignedCount} {assignedCount === 1 ? 'member' : 'members'}
                                </span>
                              </div>
                              <div className={`w-px h-4 ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
                              <div className="flex items-center gap-2">
                                <Lock className={`w-4 h-4 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                                <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                                  {role.permissions.length} {role.permissions.length === 1 ? 'permission' : 'permissions'}
                                </span>
                              </div>
                            </div>

                            {/* Permissions List */}
                            <div className="space-y-2">
                              {rolePermissions.map((perm) => {
                                const PermIcon = perm.icon;
                                return (
                                  <div key={perm.id} className={`flex items-center gap-2 p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    <PermIcon className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`} />
                                    <span className={`text-sm flex-1 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{perm.label}</span>
                                    <Check className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            </div>
            </div>
          )}
        </main>

      {/* Document Viewer Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProof(null)}></div>
          <div className={`relative w-full max-w-4xl rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            {/* Modal header */}
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedProof.memberName}</h3>
                <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{selectedProof.memberId} • {selectedProof.documentType}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                  <Download className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`} />
                </button>
                <button 
                  onClick={() => setSelectedProof(null)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                >
                  <X className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`} />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className={`p-6 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
              <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                <FileText className={`w-32 h-32 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
              </div>
            </div>

            {/* Modal footer */}
            <div className={`p-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(selectedProof.status)}`}>
                  {selectedProof.status.charAt(0).toUpperCase() + selectedProof.status.slice(1)}
                </span>
                <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  Uploaded {formatDate(selectedProof.uploadDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>
                  Reject
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedApplication(null)}></div>
          <div className={`relative w-full max-w-5xl rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 my-8 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            {/* Modal header with gradient */}
            <div className={`p-6 border-b relative overflow-hidden ${isDarkMode ? 'border-white/10 bg-gradient-to-br from-violet-500/20 to-cyan-500/20' : 'border-gray-200 bg-gradient-to-br from-violet-100 to-cyan-100'}`}>
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-violet-500 to-cyan-500' : 'bg-gradient-to-br from-violet-600 to-cyan-600'} text-white shadow-lg`}>
                    <User className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.fullName}</h3>
                    <p className={`text-base mt-1 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>{selectedApplication.jobTitle}</p>
                    <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{selectedApplication.companyName}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(selectedApplication.status)}`}>
                        {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                        Applied {formatDate(selectedApplication.applicationDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApplication(null)}
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                >
                  <X className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`} />
                </button>
              </div>
            </div>

            {/* Modal body - scrollable content */}
            <div className={`p-6 max-h-[calc(100vh-300px)] overflow-y-auto ${isDarkMode ? 'bg-[#14161A]' : 'bg-white'}`}>
              <div className="space-y-6">
                
                {/* Personal Information */}
                <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <User className="w-5 h-5" />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Gender</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.gender}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Age Category</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.ageCategory}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Blood Group</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.bloodGroup}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>VARA WhatsApp Group</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.varaWhatsappGroup}</p>
                    </div>
                    <div className="col-span-2">
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Email</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.email}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Briefcase className="w-5 h-5" />
                    Professional Details
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Visa Status</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.visaStatus}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>UAE Experience</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.yearsInUAE}y {selectedApplication.monthsInUAE}m</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Industry Experience</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.totalIndustryExperience} years</p>
                    </div>
                    <div className="col-span-2 md:col-span-3">
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Primary Area of Work</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.primaryAreaOfWork}</p>
                    </div>
                  </div>
                </div>

                {/* Skills & Portfolio - HIGHLIGHTED */}
                <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border-violet-500/30' : 'bg-gradient-to-br from-violet-50 to-cyan-50 border-violet-300'}`}>
                  <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Award className="w-5 h-5" />
                    Skills & Portfolio
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                        Core Skills ({selectedApplication.skillsets.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.skillsets.map((skill, idx) => (
                          <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' : 'bg-violet-100 text-violet-800 border border-violet-300'}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedApplication.otherSkill && (
                      <div>
                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Additional Skills</p>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.otherSkill}</p>
                      </div>
                    )}
                    {selectedApplication.portfolioLink && (
                      <div className={`p-4 rounded-lg flex items-center justify-between ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
                            <LinkIcon className={`w-5 h-5 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Portfolio</p>
                            <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'} truncate max-w-md`}>{selectedApplication.portfolioLink}</p>
                          </div>
                        </div>
                        <a
                          href={selectedApplication.portfolioLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${isDarkMode ? 'bg-violet-500/20 text-violet-400 hover:bg-violet-500/30' : 'bg-violet-100 text-violet-700 hover:bg-violet-200'}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Portfolio
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Volunteering Interest */}
                {selectedApplication.interestedInVolunteering === 'Yes' && (
                  <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/30' : 'bg-gradient-to-br from-emerald-50 to-transparent border-emerald-300'}`}>
                    <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Heart className="w-5 h-5" />
                      Volunteering Interest
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.volunteeringAreas.map((area, idx) => (
                        <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'}`}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact & Location */}
                <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <MapPin className="w-5 h-5" />
                    Contact & Location
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Emirate</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.emirate}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Area</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.areaName}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Kerala District</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.keralaDistrict}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Contact</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.countryCode} {selectedApplication.contactNumber}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>WhatsApp</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.whatsappCountryCode} {selectedApplication.whatsappNumber}</p>
                    </div>
                    <div>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Membership Fee</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedApplication.proceedWithMembershipFee}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                {selectedApplication.message && (
                  <div className={`rounded-xl border p-5 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Message from Applicant</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'} italic`}>"{selectedApplication.message}"</p>
                  </div>
                )}

              </div>
            </div>

            {/* Modal footer - Action buttons */}
            <div className={`p-6 border-t ${isDarkMode ? 'border-white/10 bg-[#14161A]' : 'border-gray-200 bg-white'} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  Application ID: {selectedApplication.id}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleRejectApplication(selectedApplication.id)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isDarkMode ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'}`}
                >
                  <ThumbsDown className="w-4 h-4" />
                  Reject Application
                </button>
                <button 
                  onClick={() => handleApproveApplication(selectedApplication.id)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isDarkMode ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800'} shadow-lg shadow-emerald-500/30`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Approve & Add to Members
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Income Modal */}
      {showAddIncomeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddIncomeModal(false)}></div>
          <div className={`relative w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <ArrowUpCircle className="w-5 h-5 text-emerald-400" />
                Add New Income
              </h3>
            </div>
            <form onSubmit={handleAddIncome} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Income Category</label>
                <select 
                  name="category" 
                  value={incomeCategory}
                  onChange={(e) => setIncomeCategory(e.target.value)}
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'}`}
                >
                  <option value="Membership Fees" className="text-gray-900 bg-white">Membership Fees</option>
                  <option value="Event Revenue" className="text-gray-900 bg-white">Event Revenue</option>
                  <option value="Donations" className="text-gray-900 bg-white">Donations</option>
                  <option value="Sponsorships" className="text-gray-900 bg-white">Sponsorships</option>
                  <option value="Grants" className="text-gray-900 bg-white">Grants</option>
                  <option value="Merchandise Sales" className="text-gray-900 bg-white">Merchandise Sales</option>
                  <option value="Custom" className="text-gray-900 bg-white">Custom Category</option>
                </select>
              </div>
              {incomeCategory === 'Custom' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Custom Category Name</label>
                  <input 
                    type="text" 
                    name="customCategory" 
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500 placeholder:text-gray-400'}`} 
                    placeholder="Enter custom category..." 
                  />
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Income Source</label>
                <select name="source" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'}`}>
                  <option value="Membership Fees" className="text-gray-900 bg-white">Membership Fees</option>
                  <option value="Event Revenue" className="text-gray-900 bg-white">Event Revenue</option>
                  <option value="Donations" className="text-gray-900 bg-white">Donations</option>
                  <option value="Other" className="text-gray-900 bg-white">Other</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Description</label>
                <input type="text" name="description" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500 placeholder:text-gray-400'}`} placeholder="Enter description..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Amount</label>
                <input type="number" name="amount" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500 placeholder:text-gray-400'}`} placeholder="0.00" step="0.01" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Date</label>
                <input type="date" name="date" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Payment Mode</label>
                <select 
                  name="paymentMode" 
                  value={incomePaymentMode} 
                  onChange={(e) => setIncomePaymentMode(e.target.value)}
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'}`}
                >
                  <option value="Cash" className="text-gray-900 bg-white">Cash</option>
                  <option value="UPI" className="text-gray-900 bg-white">UPI</option>
                  <option value="Bank Transfer" className="text-gray-900 bg-white">Bank Transfer</option>
                  <option value="NEFT" className="text-gray-900 bg-white">NEFT</option>
                  <option value="Others" className="text-gray-900 bg-white">Others</option>
                </select>
              </div>
              {incomePaymentMode === 'Others' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Custom Payment Mode</label>
                  <input 
                    type="text" 
                    name="customPaymentMode" 
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500 placeholder:text-gray-400'}`} 
                    placeholder="Enter payment mode..." 
                  />
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Status</label>
                <select name="status" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'}`}>
                  <option value="received">Received</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddIncomeModal(false)} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}>
                  Add Income
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddExpenseModal(false)}></div>
          <div className={`relative w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <ArrowDownCircle className="w-5 h-5 text-red-400" />
                Add New Expense
              </h3>
            </div>
            <form onSubmit={handleAddExpense} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Category</label>
                <select 
                  name="category" 
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500'}`}
                >
                  <option value="Operations" className="text-gray-900 bg-white">Operations</option>
                  <option value="Marketing" className="text-gray-900 bg-white">Marketing</option>
                  <option value="Events" className="text-gray-900 bg-white">Events</option>
                  <option value="Technology" className="text-gray-900 bg-white">Technology</option>
                  <option value="Salaries" className="text-gray-900 bg-white">Salaries</option>
                  <option value="Travel" className="text-gray-900 bg-white">Travel</option>
                  <option value="Utilities" className="text-gray-900 bg-white">Utilities</option>
                  <option value="Misc" className="text-gray-900 bg-white">Miscellaneous</option>
                  <option value="Custom" className="text-gray-900 bg-white">Custom Category</option>
                </select>
              </div>
              {expenseCategory === 'Custom' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Custom Category Name</label>
                  <input 
                    type="text" 
                    name="customCategory" 
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500 placeholder:text-gray-400'}`} 
                    placeholder="Enter custom category..." 
                  />
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Vendor</label>
                <input 
                  type="text" 
                  name="vendor" 
                  value={vendorInput}
                  onChange={(e) => setVendorInput(e.target.value)}
                  required 
                  list="vendor-suggestions"
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500 placeholder:text-gray-400'}`} 
                  placeholder="Enter or select vendor..." 
                />
                <datalist id="vendor-suggestions">
                  {vendorSuggestions.map((vendor, index) => (
                    <option key={index} value={vendor} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Description</label>
                <input type="text" name="description" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500 placeholder:text-gray-400'}`} placeholder="Enter description..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Amount</label>
                <input type="number" name="amount" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500 placeholder:text-gray-400'}`} placeholder="0.00" step="0.01" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Date</label>
                <input type="date" name="date" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500'}`} />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Payment Mode</label>
                <select 
                  name="paymentMode" 
                  value={expensePaymentMode} 
                  onChange={(e) => setExpensePaymentMode(e.target.value)}
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500'}`}
                >
                  <option value="Cash" className="text-gray-900 bg-white">Cash</option>
                  <option value="UPI" className="text-gray-900 bg-white">UPI</option>
                  <option value="Bank Transfer" className="text-gray-900 bg-white">Bank Transfer</option>
                  <option value="NEFT" className="text-gray-900 bg-white">NEFT</option>
                  <option value="Others" className="text-gray-900 bg-white">Others</option>
                </select>
              </div>
              {expensePaymentMode === 'Others' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Custom Payment Mode</label>
                  <input 
                    type="text" 
                    name="customPaymentMode" 
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500 placeholder:text-gray-400'}`} 
                    placeholder="Enter payment mode..." 
                  />
                </div>
              )}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Status</label>
                <select name="status" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500'}`}>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddExpenseModal(false)} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Balance Entry Modal */}
      {showAddBalanceModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddBalanceModal(false)}></div>
          <div className={`relative w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <BarChart3 className="w-5 h-5 text-violet-400" />
                Add Balance Sheet Entry
              </h3>
            </div>
            <form onSubmit={handleAddBalanceEntry} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Type</label>
                <select name="type" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500'}`}>
                  <option value="income" className="text-gray-900 bg-white">Income</option>
                  <option value="expense" className="text-gray-900 bg-white">Expense</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Category</label>
                <input type="text" name="category" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="e.g., Membership Fees, Operations..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Description</label>
                <input type="text" name="label" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="Enter description..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Amount</label>
                <input type="number" name="amount" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="0.00" step="0.01" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Payment Mode</label>
                <select 
                  name="paymentMode" 
                  value={balancePaymentMode} 
                  onChange={(e) => setBalancePaymentMode(e.target.value)}
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500'}`}
                >
                  <option value="Cash" className="text-gray-900 bg-white">Cash</option>
                  <option value="UPI" className="text-gray-900 bg-white">UPI</option>
                  <option value="Bank Transfer" className="text-gray-900 bg-white">Bank Transfer</option>
                  <option value="NEFT" className="text-gray-900 bg-white">NEFT</option>
                  <option value="Others" className="text-gray-900 bg-white">Others</option>
                </select>
              </div>
              {balancePaymentMode === 'Others' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Custom Payment Mode</label>
                  <input 
                    type="text" 
                    name="customPaymentMode" 
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} 
                    placeholder="Enter payment mode..." 
                  />
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddBalanceModal(false)} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600' : 'bg-violet-600 text-white hover:bg-violet-700'}`}>
                  Add Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => { setShowAddEventModal(false); setEventBannerPreview(null); }}></div>
          <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Calendar className="w-5 h-5 text-violet-400" />
                Create New Event
              </h3>
            </div>
            <form onSubmit={handleAddEvent} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Event Title</label>
                <input type="text" name="title" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="Enter event title..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Description</label>
                <textarea name="description" required rows={3} className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="Enter event description..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Date</label>
                  <input type="date" name="date" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500'}`} />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Time</label>
                  <input type="time" name="time" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500'}`} />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Location</label>
                <input type="text" name="location" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="Enter location..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Category</label>
                <select name="category" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500'}`}>
                  <option value="Conference" className="text-gray-900 bg-white">Conference</option>
                  <option value="Workshop" className="text-gray-900 bg-white">Workshop</option>
                  <option value="Seminar" className="text-gray-900 bg-white">Seminar</option>
                  <option value="Networking" className="text-gray-900 bg-white">Networking</option>
                  <option value="Training" className="text-gray-900 bg-white">Training</option>
                  <option value="Meetup" className="text-gray-900 bg-white">Meetup</option>
                  <option value="Other" className="text-gray-900 bg-white">Other</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Event Banner Image</label>
                <input 
                  type="file" 
                  name="bannerImage" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEventBannerPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-violet-500 file:text-white file:cursor-pointer hover:file:bg-violet-600' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-violet-600 file:text-white file:cursor-pointer hover:file:bg-violet-700'}`} 
                />
                {eventBannerPreview && (
                  <div className="mt-3">
                    <img src={eventBannerPreview} alt="Banner preview" className="w-full h-40 object-cover rounded-lg" />
                  </div>
                )}
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Registration Link</label>
                <input type="url" name="registrationLink" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="https://..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Max Participants (Optional)</label>
                <input type="number" name="maxParticipants" min="1" className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="Enter max participants..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => { setShowAddEventModal(false); setEventBannerPreview(null); }} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600' : 'bg-violet-600 text-white hover:bg-violet-700'}`}>
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      {showAddAnnouncementModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddAnnouncementModal(false)}></div>
          <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Megaphone className="w-5 h-5 text-orange-400" />
                Create New Announcement
              </h3>
            </div>
            <form onSubmit={handleAddAnnouncement} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Announcement Title</label>
                <input type="text" name="title" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 placeholder:text-gray-400'}`} placeholder="Enter announcement title..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Message</label>
                <textarea name="message" required rows={4} className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500 placeholder:text-gray-400'}`} placeholder="Enter announcement message..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Priority</label>
                  <select name="priority" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500' : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500'}`}>
                    <option value="low" className="text-gray-900 bg-white">Low</option>
                    <option value="medium" className="text-gray-900 bg-white">Medium</option>
                    <option value="high" className="text-gray-900 bg-white">High</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Type</label>
                  <select name="type" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500' : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500'}`}>
                    <option value="general" className="text-gray-900 bg-white">General</option>
                    <option value="news" className="text-gray-900 bg-white">News</option>
                    <option value="alert" className="text-gray-900 bg-white">Alert</option>
                    <option value="update" className="text-gray-900 bg-white">Update</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Expiry Date (Optional)</label>
                <input type="date" name="expiryDate" className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-orange-500' : 'bg-white border-gray-200 text-gray-900 focus:border-orange-500'}`} />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddAnnouncementModal(false)} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
                  Create Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedMember(null)}></div>
          <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in slide-in-from-right duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            {/* Header */}
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Member Details</h3>
                <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{selectedMember.id}</p>
              </div>
              <button onClick={() => setSelectedMember(null)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                <X className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`} />
              </button>
            </div>

            {/* Content - Scrollable */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold ${isDarkMode ? 'bg-gradient-to-br from-violet-500/30 to-purple-500/10 ring-1 ring-white/10 text-white' : 'bg-gray-900 text-white'}`}>
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.name}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>{selectedMember.email}</p>
                  <span className={`inline-block mt-2 px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusColor(selectedMember.status)}`}>
                    {selectedMember.status.charAt(0).toUpperCase() + selectedMember.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <User className="w-4 h-4" />
                  Personal Information
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {selectedMember.gender && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Gender</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.gender}</p>
                    </div>
                  )}
                  {selectedMember.ageCategory && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Age Category</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.ageCategory}</p>
                    </div>
                  )}
                  {selectedMember.bloodGroup && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Blood Group</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.bloodGroup}</p>
                    </div>
                  )}
                  {selectedMember.varaWhatsappGroup && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>WhatsApp Group</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.varaWhatsappGroup}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Briefcase className="w-4 h-4" />
                  Professional Information
                </h5>
                <div className="space-y-3">
                  {selectedMember.companyName && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Company Name</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.companyName}</p>
                    </div>
                  )}
                  {selectedMember.jobTitle && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Job Title</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.jobTitle}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {selectedMember.visaStatus && (
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Visa Status</p>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.visaStatus}</p>
                      </div>
                    )}
                    {selectedMember.primaryAreaOfWork && (
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Primary Area</p>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.primaryAreaOfWork}</p>
                      </div>
                    )}
                    {(selectedMember.yearsInUAE !== undefined || selectedMember.monthsInUAE !== undefined) && (
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>UAE Experience</p>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {selectedMember.yearsInUAE || 0}y {selectedMember.monthsInUAE || 0}m
                        </p>
                      </div>
                    )}
                    {selectedMember.totalIndustryExperience && (
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Industry Experience</p>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.totalIndustryExperience} years</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills & Portfolio */}
              {(selectedMember.skillsets && selectedMember.skillsets.length > 0) || selectedMember.portfolioLink && (
                <div>
                  <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Award className="w-4 h-4" />
                    Skills & Portfolio
                  </h5>
                  {selectedMember.skillsets && selectedMember.skillsets.length > 0 && (
                    <div className={`p-3 rounded-lg mb-3 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-2 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Skillsets</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skillsets.map((skill, idx) => (
                          <span key={idx} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-violet-100 text-violet-700 border border-violet-200'}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedMember.otherSkill && (
                    <div className={`p-3 rounded-lg mb-3 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Other Skills</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.otherSkill}</p>
                    </div>
                  )}
                  {selectedMember.portfolioLink && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Portfolio</p>
                      <a href={selectedMember.portfolioLink} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium hover:underline flex items-center gap-1 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                        {selectedMember.portfolioLink}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Volunteering */}
              {selectedMember.interestedInVolunteering === 'Yes' && selectedMember.volunteeringAreas && selectedMember.volunteeringAreas.length > 0 && (
                <div>
                  <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Heart className="w-4 h-4" />
                    Volunteering
                  </h5>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-2 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Areas of Interest</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.volunteeringAreas.map((area, idx) => (
                        <span key={idx} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Location Details */}
              <div>
                <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <MapPin className="w-4 h-4" />
                  Location Details
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {selectedMember.country && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Country</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.country}</p>
                    </div>
                  )}
                  {selectedMember.emirate && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Emirate</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.emirate}</p>
                    </div>
                  )}
                  {selectedMember.areaName && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Area</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.areaName}</p>
                    </div>
                  )}
                  {selectedMember.keralaDistrict && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Kerala District</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.keralaDistrict}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Phone className="w-4 h-4" />
                  Contact Information
                </h5>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{selectedMember.email}</span>
                    </div>
                  </div>
                  {selectedMember.phone && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Phone Number</p>
                      <div className="flex items-center gap-3">
                        <Phone className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{selectedMember.phone}</span>
                      </div>
                    </div>
                  )}
                  {selectedMember.whatsappCountryCode && selectedMember.whatsappNumber && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>WhatsApp Number</p>
                      <div className="flex items-center gap-3">
                        <MessageCircle className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                          {selectedMember.whatsappCountryCode} {selectedMember.whatsappNumber}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Membership Information */}
              <div>
                <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <CreditCard className="w-4 h-4" />
                  Membership Information
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Type</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.membershipType}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Status</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.status}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Joined</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedMember.dateJoined)}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Expires</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedMember.expiryDate)}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Last Active</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedMember.lastActive)}</p>
                  </div>
                  {selectedMember.proceedWithMembershipFee && (
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Membership Fee</p>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.proceedWithMembershipFee}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Message */}
              {selectedMember.message && (
                <div>
                  <h5 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <MessageCircle className="w-4 h-4" />
                    Additional Message
                  </h5>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{selectedMember.message}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className={`p-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex gap-3`}>
              <button className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                Edit Member
              </button>
              <button className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600' : 'bg-violet-600 text-white hover:bg-violet-700'}`}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Board Member Modal */}
      {showAddBoardMemberModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddBoardMemberModal(false)}></div>
          <div className={`relative w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <UserPlus className="w-5 h-5 text-blue-400" />
                Add Board Member
              </h3>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddBoardMember({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                roleId: formData.get('roleId') as string,
                status: 'active',
              });
            }} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 placeholder:text-gray-400'}`} 
                  placeholder="Enter full name..." 
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 placeholder:text-gray-400'}`} 
                  placeholder="member@vara.ae" 
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Assign Role</label>
                <select 
                  name="roleId" 
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'}`}
                >
                  <option value="" className="text-gray-900 bg-white">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id} className="text-gray-900 bg-white">{role.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddBoardMemberModal(false)} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Board Member Modal */}
      {showEditBoardMemberModal && selectedBoardMember && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => {
            setShowEditBoardMemberModal(false);
            setSelectedBoardMember(null);
          }}></div>
          <div className={`relative w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Edit className="w-5 h-5 text-blue-400" />
                Edit Board Member
              </h3>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleEditBoardMember(selectedBoardMember.id, {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                roleId: formData.get('roleId') as string,
              });
            }} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={selectedBoardMember.name}
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 placeholder:text-gray-400'}`} 
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  defaultValue={selectedBoardMember.email}
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 placeholder:text-gray-400'}`} 
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Assign Role</label>
                <select 
                  name="roleId" 
                  defaultValue={selectedBoardMember.roleId}
                  required 
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'}`}
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id} className="text-gray-900 bg-white">{role.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => {
                  setShowEditBoardMemberModal(false);
                  setSelectedBoardMember(null);
                }} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddRoleModal(false)}></div>
          <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Shield className="w-5 h-5 text-blue-400" />
                Create New Role
              </h3>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const selectedPermissions = Array.from(formData.getAll('permissions')) as string[];
              handleAddRole({
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                permissions: selectedPermissions,
                color: formData.get('color') as string,
              });
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Role Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 placeholder:text-gray-400'}`} 
                    placeholder="e.g., Finance Manager" 
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Color Theme</label>
                  <select 
                    name="color" 
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'}`}
                  >
                    <option value="blue" className="text-gray-900 bg-white">Blue</option>
                    <option value="emerald" className="text-gray-900 bg-white">Emerald</option>
                    <option value="purple" className="text-gray-900 bg-white">Purple</option>
                    <option value="amber" className="text-gray-900 bg-white">Amber</option>
                    <option value="red" className="text-gray-900 bg-white">Red</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Description</label>
                <textarea 
                  name="description" 
                  required 
                  rows={2}
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 placeholder:text-gray-400'}`} 
                  placeholder="Brief description of this role..." 
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Module Permissions</label>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {availablePermissions.map((perm) => {
                    const PermIcon = perm.icon;
                    return (
                      <label key={perm.id} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                        <input
                          type="checkbox"
                          name="permissions"
                          value={perm.id}
                          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <PermIcon className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`} />
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{perm.label}</span>
                          </div>
                          <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{perm.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddRoleModal(false)} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Create Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditRoleModal && selectedRole && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => {
            setShowEditRoleModal(false);
            setSelectedRole(null);
          }}></div>
          <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Edit className="w-5 h-5 text-blue-400" />
                Edit Role
              </h3>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const selectedPermissions = Array.from(formData.getAll('permissions')) as string[];
              handleEditRole(selectedRole.id, {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                permissions: selectedPermissions,
                color: formData.get('color') as string,
              });
            }} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Role Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    defaultValue={selectedRole.name}
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 placeholder:text-gray-400'}`} 
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Color Theme</label>
                  <select 
                    name="color" 
                    defaultValue={selectedRole.color}
                    required 
                    className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500'}`}
                  >
                    <option value="blue" className="text-gray-900 bg-white">Blue</option>
                    <option value="emerald" className="text-gray-900 bg-white">Emerald</option>
                    <option value="purple" className="text-gray-900 bg-white">Purple</option>
                    <option value="amber" className="text-gray-900 bg-white">Amber</option>
                    <option value="red" className="text-gray-900 bg-white">Red</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Description</label>
                <textarea 
                  name="description" 
                  defaultValue={selectedRole.description}
                  required 
                  rows={2}
                  className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors resize-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 placeholder:text-gray-400'}`} 
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-3 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Module Permissions</label>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {availablePermissions.map((perm) => {
                    const PermIcon = perm.icon;
                    return (
                      <label key={perm.id} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                        <input
                          type="checkbox"
                          name="permissions"
                          value={perm.id}
                          defaultChecked={selectedRole.permissions.includes(perm.id)}
                          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <PermIcon className={`w-4 h-4 ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`} />
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{perm.label}</span>
                          </div>
                          <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>{perm.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => {
                  setShowEditRoleModal(false);
                  setSelectedRole(null);
                }} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAddJobModal(false)} />
          <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`sticky top-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-4 flex justify-between items-center`}>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Create New Job
              </h3>
              <button
                onClick={() => setShowAddJobModal(false)}
                className={`p-2 rounded-lg hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'text-gray-600'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddJob} className="p-6 space-y-6">
              {/* Job Title */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Job Title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  required
                  placeholder="e.g., Senior Software Engineer"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Role */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Role/Department *
                </label>
                <input
                  type="text"
                  name="role"
                  required
                  placeholder="e.g., Software Development"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Job Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe the job responsibilities, requirements, and qualifications..."
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Location and Employment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g., Dubai, UAE"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Employment Type *
                  </label>
                  <select
                    name="employmentType"
                    required
                    className={`w-full px-4 py-2 border rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Select type</option>
                    <option value="Full-time" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Full-time</option>
                    <option value="Part-time" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Part-time</option>
                    <option value="Contract" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Contract</option>
                    <option value="Internship" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Internship</option>
                  </select>
                </div>
              </div>

              {/* Experience Level and Salary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Experience Level *
                  </label>
                  <select
                    name="experienceLevel"
                    required
                    className={`w-full px-4 py-2 border rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Select level</option>
                    <option value="Entry Level" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Entry Level</option>
                    <option value="Mid Level" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Mid Level</option>
                    <option value="Senior Level" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Senior Level</option>
                    <option value="Expert Level" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>Expert Level</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Salary Range
                  </label>
                  <input
                    type="text"
                    name="salary"
                    placeholder="e.g., AED 15,000 - 20,000"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Application Link and Apply By Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Application Link *
                  </label>
                  <input
                    type="url"
                    name="applicationLink"
                    required
                    placeholder="https://careers.example.com/apply"
                    className={`w-full px-4 py-2 border rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Apply By Date *
                  </label>
                  <input
                    type="date"
                    name="applyByDate"
                    required
                    className={`w-full px-4 py-2 border rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddJobModal(false)}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Job Details Modal (View Applicants) */}
      {selectedJob && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSelectedJob(null)} />
          <div className={`relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`sticky top-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-4 flex justify-between items-center`}>
              <div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedJob.jobTitle}
                </h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedJob.role} • {selectedJob.location}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className={`p-2 rounded-lg hover:bg-gray-100 ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'text-gray-600'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Job Details */}
              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Job Details
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Employment Type</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.employmentType}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Experience Level</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.experienceLevel}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Salary</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedJob.salary || 'Not disclosed'}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Apply By</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(selectedJob.applyByDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Posted On</p>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(selectedJob.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                    <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      selectedJob.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedJob.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Description</p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{selectedJob.description}</p>
                </div>
                <div className="mt-4">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Application Link</p>
                  <a
                    href={selectedJob.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {selectedJob.applicationLink}
                  </a>
                </div>
              </div>

              {/* Applicants Section */}
              <div>
                <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Applicants ({selectedJob.applicants.length})
                </h4>
                
                {selectedJob.applicants.length > 0 ? (
                  <div className="space-y-3">
                    {selectedJob.applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className={`p-4 rounded-lg border ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {applicant.memberName}
                              </h5>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                applicant.status === 'hired' ? 'bg-green-100 text-green-800' :
                                applicant.status === 'shortlisted' ? 'bg-blue-100 text-blue-800' :
                                applicant.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <Mail className="w-4 h-4 inline mr-2" />
                                {applicant.memberEmail}
                              </p>
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                <Calendar className="w-4 h-4 inline mr-2" />
                                Applied on: {new Date(applicant.appliedDate).toLocaleDateString()}
                              </p>
                              {applicant.resumeLink && (
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  <FileText className="w-4 h-4 inline mr-2" />
                                  <a
                                    href={applicant.resumeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 hover:underline"
                                  >
                                    View Resume
                                  </a>
                                </p>
                              )}
                            </div>
                            {applicant.coverLetter && (
                              <div className="mt-3">
                                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  Cover Letter:
                                </p>
                                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {applicant.coverLetter}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      No applicants yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowReportModal(false)}></div>
          <div className={`relative w-full max-w-7xl max-h-[90vh] rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            {/* Header */}
            <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
              <div>
                <h3 className={`text-xl font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <FileText className="w-6 h-6 text-violet-400" />
                  {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
                  <span className={`text-sm font-normal ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    ({reportPeriod === 'today' ? 'Today' : reportPeriod === 'weekly' ? 'This Week' : reportPeriod === 'monthly' ? 'This Month' : reportPeriod === 'yearly' ? 'This Year' : 'Custom Range'})
                  </span>
                </h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  Generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <button onClick={() => setShowReportModal(false)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                <X className={`w-5 h-5 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`} />
              </button>
            </div>

            {/* Report Content - Scrollable */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Custom Date Range Selection */}
              {reportPeriod === 'custom' && (
                <div className={`p-4 rounded-xl mb-6 ${isDarkMode ? 'bg-white/[0.02] border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                  <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Select Date Range</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>Start Date</label>
                      <input
                        type="date"
                        value={customDateRange.start}
                        onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}>End Date</label>
                      <input
                        type="date"
                        value={customDateRange.end}
                        onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-emerald-400/70' : 'text-emerald-600/70'}`}>Total {reportType === 'income' ? 'Income' : reportType === 'expense' ? 'Expenses' : reportType === 'balance' ? 'Net Profit' : 'Records'}</p>
                      <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {reportType === 'income' ? '$57,230' : reportType === 'expense' ? '$18,400' : reportType === 'balance' ? '$38,830' : reportType === 'membership' ? '348' : reportType === 'approvals' ? '23' : reportType === 'events' ? '12' : '8'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                      <TrendingUp className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    </div>
                  </div>
                </div>
                <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-violet-500/10 border-violet-500/20' : 'bg-violet-50 border-violet-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-violet-400/70' : 'text-violet-600/70'}`}>Average</p>
                      <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-violet-400' : 'text-violet-700'}`}>
                        {reportType === 'income' || reportType === 'expense' || reportType === 'balance' ? '$1,430' : '8.5'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
                      <BarChart3 className={`w-6 h-6 ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`} />
                    </div>
                  </div>
                </div>
                <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-blue-400/70' : 'text-blue-600/70'}`}>Growth</p>
                      <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>+12.5%</p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                      <Activity className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-200'}`}>
                <div className={`p-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
                  <h4 className={`text-sm font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <Table className="w-4 h-4" />
                    Detailed {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Data
                  </h4>
                  <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    {reportType === 'income' ? incomeRecords.length : reportType === 'expense' ? expenseRecords.length : reportType === 'membership' ? memberAccounts.length : reportType === 'approvals' ? pendingApplications.length : reportType === 'events' ? events.length : announcements.length} Records
                  </span>
                </div>
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                  <table className="w-full">
                    <thead className={`sticky top-0 z-10 ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                      <tr>
                        {reportType === 'income' && (
                          <>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>ID</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Source</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Category</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Amount</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Date</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Payment Mode</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Status</th>
                          </>
                        )}
                        {reportType === 'expense' && (
                          <>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>ID</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Category</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Vendor</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Amount</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Date</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Payment Mode</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Status</th>
                          </>
                        )}
                        {reportType === 'balance' && (
                          <>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Type</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Category</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Description</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Amount</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Date</th>
                          </>
                        )}
                        {reportType === 'membership' && (
                          <>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>ID</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Name</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Email</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Type</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Status</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Joined Date</th>
                          </>
                        )}
                        {reportType === 'approvals' && (
                          <>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>ID</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Name</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Email</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Job Title</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Status</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Applied Date</th>
                          </>
                        )}
                        {reportType === 'events' && (
                          <>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>ID</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Title</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Date</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Location</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Attendees</th>
                          </>
                        )}
                        {reportType === 'announcements' && (
                          <>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>ID</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Title</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Category</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Posted By</th>
                            <th className={`px-4 py-3 text-left text-xs font-semibold uppercase ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Date</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className={`${isDarkMode ? 'divide-y divide-white/5' : 'divide-y divide-gray-200'}`}>
                      {reportType === 'income' && incomeRecords.map((record) => (
                        <tr key={record.id} className={`transition-colors ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{record.id}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{record.source}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{record.category}</td>
                          <td className={`px-4 py-3 text-sm font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>${record.amount.toLocaleString()}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{formatDate(record.date)}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{record.paymentMode}</td>
                          <td className={`px-4 py-3`}>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(record.status)}`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {reportType === 'expense' && expenseRecords.map((record) => (
                        <tr key={record.id} className={`transition-colors ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{record.id}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{record.category}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{record.vendor || '-'}</td>
                          <td className={`px-4 py-3 text-sm font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>${record.amount.toLocaleString()}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{formatDate(record.date)}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{record.paymentMode}</td>
                          <td className={`px-4 py-3`}>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(record.status)}`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {reportType === 'membership' && memberAccounts.map((member) => (
                        <tr key={member.id} className={`transition-colors ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{member.id}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{member.email}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{member.membershipType}</td>
                          <td className={`px-4 py-3`}>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(member.status)}`}>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </span>
                          </td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{formatDate(member.dateJoined)}</td>
                        </tr>
                      ))}
                      {reportType === 'approvals' && pendingApplications.map((app) => (
                        <tr key={app.id} className={`transition-colors ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{app.id}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{app.fullName}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{app.email}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{app.jobTitle}</td>
                          <td className={`px-4 py-3`}>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(app.status)}`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Jan 2026</td>
                        </tr>
                      ))}
                      {reportType === 'events' && events.map((event) => (
                        <tr key={event.id} className={`transition-colors ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{event.id}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.title}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{formatDate(event.date)}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{event.location}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>-</td>
                        </tr>
                      ))}
                      {reportType === 'announcements' && announcements.map((announcement) => (
                        <tr key={announcement.id} className={`transition-colors ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{announcement.id}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{announcement.title}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{announcement.type}</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Admin</td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{formatDate(announcement.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer Actions - Download Options */}
            <div className={`p-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'} flex items-center justify-between`}>
              <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                Select a format to download this report
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => alert('Downloading PDF...')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isDarkMode ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' : 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'}`}
                >
                  <FileDown className="w-4 h-4" />
                  PDF
                </button>
                <button 
                  onClick={() => alert('Downloading Excel...')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'}`}
                >
                  <FileDown className="w-4 h-4" />
                  Excel
                </button>
                <button 
                  onClick={() => alert('Downloading CSV...')}
                  className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isDarkMode ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'}`}
                >
                  <FileDown className="w-4 h-4" />
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 z-40 ${isDarkMode ? 'bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20' : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'}`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>
      </div>
    </div>
  );
}
