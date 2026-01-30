import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Bell,
  LogOut,
  Menu,
  X,
  Award,
  Clock,
  Users,
  Star,
  MessageCircle,
  Settings,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Shield,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Search,
  Sun,
  Moon,
  Sparkles,
  Download,
  Eye,
  Zap,
} from 'lucide-react';

// Types
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  avatarUrl?: string;
}

interface Membership {
  id: string;
  type: string;
  category: string;
  status: 'active' | 'expired' | 'pending';
  expiryDate: string;
  joinedDate: string;
  benefits: string[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'upcoming' | 'past';
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

// Mock data
const mockUser: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main Street, New York, NY 10001',
  memberSince: 'January 2023',
};

const mockMembership: Membership = {
  id: 'VARA-2023-00156',
  type: 'Premium',
  category: 'Individual Member',
  status: 'active',
  expiryDate: 'December 31, 2025',
  joinedDate: 'January 15, 2023',
  benefits: [
    'Access to all events',
    'Priority registration',
    'Exclusive member discounts',
    'Newsletter subscription',
    'Voting rights',
    'Member directory access',
  ],
};

const mockEvents: Event[] = [
  { id: '1', title: 'Annual General Meeting', date: '2025-02-15', time: '10:00 AM', location: 'Main Hall', type: 'upcoming' },
  { id: '2', title: 'Networking Dinner', date: '2025-02-20', time: '7:00 PM', location: 'Grand Ballroom', type: 'upcoming' },
  { id: '3', title: 'Workshop: Leadership Skills', date: '2025-03-05', time: '2:00 PM', location: 'Room 201', type: 'upcoming' },
  { id: '4', title: 'Community Service Day', date: '2025-03-15', time: '9:00 AM', location: 'City Park', type: 'upcoming' },
];

const mockAnnouncements: Announcement[] = [
  { id: '1', title: 'New Membership Benefits', content: 'We are excited to announce new benefits for all premium members starting next month.', date: '2025-01-10', priority: 'high' },
  { id: '2', title: 'Office Hours Update', content: 'Our office will be closed on February 17th for Presidents Day.', date: '2025-01-08', priority: 'medium' },
  { id: '3', title: 'Volunteer Opportunities', content: 'Sign up for upcoming volunteer events and make a difference in our community.', date: '2025-01-05', priority: 'low' },
];

// Navigation items
const navItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'membership', label: 'Membership', icon: CreditCard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'announcements', label: 'Announcements', icon: Bell },
];

// Calculate membership progress
const calculateMembershipProgress = () => {
  const start = new Date('2023-01-15');
  const end = new Date('2025-12-31');
  const now = new Date();
  const total = end.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  return Math.min(Math.max((elapsed / total) * 100, 0), 100);
};

// Profile completion calculation
const calculateProfileCompletion = () => {
  const fields = [mockUser.name, mockUser.email, mockUser.phone, mockUser.address, mockUser.memberSince];
  const filled = fields.filter(f => f && f.length > 0).length;
  return (filled / fields.length) * 100;
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  const [idCardFlipped, setIdCardFlipped] = useState(false);

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

  const membershipProgress = calculateMembershipProgress();
  const profileCompletion = calculateProfileCompletion();

  // Loading skeleton with premium animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-2 border-t-white/80 animate-spin"></div>
            <div className="absolute inset-2 rounded-full border border-white/5"></div>
          </div>
          <p className="text-white/60 text-sm font-light tracking-wide">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#09090b]' : 'bg-[#f8fafc]'}`}>
      {/* Premium Multi-Layer Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base Gradient Layer */}
        <div className={`absolute inset-0 ${isDarkMode 
          ? 'bg-gradient-to-br from-[#0c0a1d] via-[#09090b] to-[#0a0d12]' 
          : 'bg-gradient-to-br from-violet-50/80 via-white to-cyan-50/60'}`}></div>
        
        {/* Animated Gradient Orbs - Dark Mode */}
        {isDarkMode && (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500/15 via-blue-600/8 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-[-15%] left-[15%] w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/12 via-teal-600/6 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-[60%] left-[50%] w-[400px] h-[400px] bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Mesh Gradient Overlay */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(at 40% 20%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
                               radial-gradient(at 80% 0%, rgba(14, 165, 233, 0.1) 0px, transparent 50%),
                               radial-gradient(at 0% 50%, rgba(168, 85, 247, 0.12) 0px, transparent 50%),
                               radial-gradient(at 80% 50%, rgba(34, 197, 94, 0.08) 0px, transparent 50%),
                               radial-gradient(at 0% 100%, rgba(244, 63, 94, 0.1) 0px, transparent 50%),
                               radial-gradient(at 80% 100%, rgba(6, 182, 212, 0.1) 0px, transparent 50%)`
            }}></div>
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </>
        )}
        
        {/* Light Mode Background Effects */}
        {!isDarkMode && (
          <>
            <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-violet-200/40 via-purple-100/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-bl from-cyan-200/35 via-blue-100/25 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-5%] left-[30%] w-[450px] h-[450px] bg-gradient-to-tr from-emerald-200/30 via-teal-100/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-[50%] right-[20%] w-[350px] h-[350px] bg-gradient-to-l from-rose-200/25 via-pink-100/15 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-gradient-to-tl from-amber-200/20 via-yellow-100/10 to-transparent rounded-full blur-3xl"></div>
            
            {/* Light Mode Mesh Gradient */}
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(at 30% 20%, rgba(139, 92, 246, 0.08) 0px, transparent 50%),
                               radial-gradient(at 70% 10%, rgba(14, 165, 233, 0.06) 0px, transparent 50%),
                               radial-gradient(at 10% 60%, rgba(168, 85, 247, 0.07) 0px, transparent 50%),
                               radial-gradient(at 90% 40%, rgba(34, 197, 94, 0.05) 0px, transparent 50%),
                               radial-gradient(at 50% 80%, rgba(244, 63, 94, 0.05) 0px, transparent 50%)`
            }}></div>
            
            {/* Light Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.4]" style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </>
        )}
        
        {/* Top Gradient Fade */}
        <div className={`absolute top-0 left-0 right-0 h-32 ${isDarkMode 
          ? 'bg-gradient-to-b from-[#09090b] to-transparent' 
          : 'bg-gradient-to-b from-white/50 to-transparent'}`}></div>
      </div>

      {/* Left Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 z-50 flex flex-col transition-all duration-300 ${isDarkMode ? 'bg-[#0c0c0e]/95 border-r border-white/[0.08]' : 'bg-white/95 border-r border-gray-200'} backdrop-blur-xl ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo Section */}
        <div className={`flex items-center gap-3 px-6 py-5 border-b ${isDarkMode ? 'border-white/[0.08]' : 'border-gray-200'}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-gray-900'}`}>
            <img 
              src="/Images/image logo.png" 
              alt="VARA Logo" 
              className="h-6 w-auto"
            />
          </div>
          <span className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>VARA</span>
        </div>

        {/* User Profile Section */}
        <div className={`px-4 py-5 border-b ${isDarkMode ? 'border-white/[0.08]' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-violet-500/30 to-cyan-500/30 ring-1 ring-white/10' : 'bg-gray-900'}`}>
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockUser.name}</p>
              <p className={`text-xs truncate ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{mockMembership.type} Member</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
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
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? (isDarkMode ? 'text-cyan-400' : 'text-gray-900') : ''}`} />
                {item.label}
                {activeSection === item.id && (
                  <div className={`ml-auto w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-cyan-400' : 'bg-gray-900'}`}></div>
                )}
              </button>
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
              <span className={`ml-auto w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-cyan-400' : 'bg-gray-900'}`}></span>
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
          
          {/* Settings */}
          <button 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            <Settings className="w-5 h-5" />
            Settings
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
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)}></div>
          <div className={`relative w-full max-w-xl rounded-2xl shadow-2xl border p-4 animate-in fade-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <Search className={`w-5 h-5 ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search anything..."
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
        <div className={`fixed top-20 left-72 w-80 max-h-[70vh] rounded-2xl shadow-2xl border z-[60] overflow-hidden animate-in slide-in-from-left-2 fade-in duration-200 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
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
                <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 sidebar-dashboard-main ${!isDarkMode ? 'light-gradient-bg' : ''}`}>
        {/* Welcome Section with Profile Completion */}
        <div className="dashboard-welcome animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Welcome back, {mockUser.name.split(' ')[0]}
                <Sparkles className="inline-block w-6 h-6 ml-2 text-white/40" />
              </h1>
              <p className={`mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>
                Manage your membership and stay updated with VARA activities.
              </p>
            </div>
            {/* Profile Completion */}
            <div className={`dashboard-inline-gap px-4 py-3 rounded-2xl border backdrop-blur-sm ${isDarkMode ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-gray-200'}`}>
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" strokeWidth="2.5" className={isDarkMode ? 'stroke-white/[0.08]' : 'stroke-gray-200'} />
                  <circle 
                    cx="24" cy="24" r="20" fill="none" strokeWidth="2.5" 
                    strokeDasharray={`${profileCompletion * 1.256} 999`}
                    className={isDarkMode ? 'stroke-white/80' : 'stroke-gray-900'}
                    strokeLinecap="round"
                  />
                </svg>
                <span className={`absolute inset-0 flex items-center justify-center text-xs font-semibold ${isDarkMode ? 'text-white/90' : 'text-gray-900'}`}>
                  {Math.round(profileCompletion)}%
                </span>
              </div>
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile Complete</p>
                <p className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Complete your profile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-grid">
          {[
            { icon: Award, label: 'Status', value: 'Active', accent: 'from-emerald-500/20 to-emerald-600/5', iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-400', shadow: 'shadow-emerald-500/10' },
            { icon: Calendar, label: 'Events', value: `${mockEvents.length} Upcoming`, accent: 'from-blue-500/20 to-blue-600/5', iconBg: 'bg-blue-500/15', iconColor: 'text-blue-400', shadow: 'shadow-blue-500/10' },
            { icon: Users, label: 'Member Since', value: 'Jan 2023', accent: 'from-violet-500/20 to-violet-600/5', iconBg: 'bg-violet-500/15', iconColor: 'text-violet-400', shadow: 'shadow-violet-500/10' },
            { icon: Star, label: 'Plan', value: mockMembership.type, accent: 'from-amber-500/20 to-amber-600/5', iconBg: 'bg-amber-500/15', iconColor: 'text-amber-400', shadow: 'shadow-amber-500/10' },
          ].map((stat, index) => (
            <div 
              key={index}
              className={`group relative rounded-2xl border dashboard-card-padding transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15' : 'bg-white border-gray-200 hover:border-gray-300'} ${isDarkMode ? `hover:shadow-xl hover:${stat.shadow}` : 'hover:shadow-lg'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Colored gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              {/* 3D inner shadow effect */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none"></div>
              
              <div className="relative flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${isDarkMode ? `${stat.iconBg} group-hover:shadow-lg` : 'bg-gray-100'}`}>
                  <stat.icon className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? `text-white/50 group-hover:${stat.iconColor}` : 'text-gray-700'}`} />
                </div>
                <div>
                  <p className={`text-[11px] font-medium uppercase tracking-wider ${isDarkMode ? 'text-white/35' : 'text-gray-500'}`}>{stat.label}</p>
                  <p className={`text-lg font-semibold mt-0.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Section */}
        {activeSection === 'profile' && (
          <div className="dashboard-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
              <button className={`text-sm font-medium px-5 py-2.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode ? 'text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                Edit Profile
              </button>
            </div>

            <div className={`dashboard-section rounded-2xl border overflow-hidden shadow-xl ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] shadow-black/20' : 'bg-white border-gray-200 shadow-gray-200/50'}`}>
              {/* Profile Header */}
              <div className={`p-8 border-b ${isDarkMode ? 'border-white/[0.06] bg-gradient-to-r from-violet-500/15 via-transparent to-cyan-500/10' : 'border-gray-100 bg-gradient-to-r from-gray-50 to-white'}`}>
                <div className="flex items-center gap-6">
                  <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden group shadow-2xl ${isDarkMode ? 'bg-gradient-to-br from-violet-500/50 to-cyan-500/50 ring-2 ring-white/20 shadow-violet-500/30' : 'bg-gradient-to-br from-gray-800 to-gray-900'}`}>
                    <span className="text-white text-2xl font-bold drop-shadow-lg">
                      {mockUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockUser.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>{mockMembership.type} Member</span>
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow-lg ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30 shadow-emerald-500/20' : 'bg-green-100 text-green-700'}`}>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details Grid */}
              <div className="dashboard-card-padding-lg">
                <div className="dashboard-grid-2">
                  {[
                    { icon: Mail, label: 'Email Address', value: mockUser.email, iconBg: 'bg-blue-500/15', iconColor: 'text-blue-400' },
                    { icon: Phone, label: 'Phone Number', value: mockUser.phone, iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-400' },
                    { icon: MapPin, label: 'Address', value: mockUser.address, iconBg: 'bg-rose-500/15', iconColor: 'text-rose-400' },
                    { icon: Clock, label: 'Member Since', value: mockUser.memberSince, iconBg: 'bg-violet-500/15', iconColor: 'text-violet-400' },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`group flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 cursor-pointer hover:-translate-y-0.5 ${isDarkMode ? 'border-white/[0.06] hover:border-white/15 hover:bg-white/[0.03] hover:shadow-lg hover:shadow-black/20' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50 hover:shadow-md'}`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${isDarkMode ? `${item.iconBg} group-hover:shadow-lg` : 'bg-gray-100'}`}>
                        <item.icon className={`w-5 h-5 ${isDarkMode ? item.iconColor : 'text-gray-600'}`} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-[11px] font-medium uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-white/35' : 'text-gray-500'}`}>{item.label}</p>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white/90' : 'text-gray-900'}`}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-2xl border dashboard-card-padding-lg shadow-xl ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] shadow-black/20' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-base font-semibold mb-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
              <div className="dashboard-grid-3">
                {[
                  { icon: Settings, label: 'Account Settings', color: 'hover:border-blue-500/40 hover:bg-blue-500/10', iconColor: 'group-hover:text-blue-400', shadow: 'hover:shadow-blue-500/20' },
                  { icon: Shield, label: 'Privacy & Security', color: 'hover:border-emerald-500/40 hover:bg-emerald-500/10', iconColor: 'group-hover:text-emerald-400', shadow: 'hover:shadow-emerald-500/20' },
                  { icon: MessageCircle, label: 'Contact Support', color: 'hover:border-violet-500/40 hover:bg-violet-500/10', iconColor: 'group-hover:text-violet-400', shadow: 'hover:shadow-violet-500/20' },
                ].map((action, index) => (
                  <button 
                    key={index}
                    className={`group flex items-center justify-center gap-3 p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? `border-white/[0.06] ${action.color} ${action.shadow}` : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                  >
                    <action.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${isDarkMode ? `text-white/40 ${action.iconColor}` : 'text-gray-600'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white/60 group-hover:text-white' : 'text-gray-700'}`}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Membership Section */}
        {activeSection === 'membership' && (
          <div className="dashboard-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Membership Details</h2>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-lg ${isDarkMode ? 'bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30 shadow-emerald-500/20' : 'bg-green-100 text-green-700'}`}>
                {mockMembership.status.charAt(0).toUpperCase() + mockMembership.status.slice(1)}
              </span>
            </div>

            {/* Membership Card with ID */}
            <div className={`dashboard-section rounded-2xl border overflow-hidden shadow-xl ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] shadow-black/30' : 'bg-white border-gray-200'}`}>
              {/* Header */}
              <div className={`p-6 border-b ${isDarkMode ? 'border-white/[0.06] bg-gradient-to-r from-amber-500/15 via-transparent to-rose-500/10' : 'border-gray-100 bg-gradient-to-r from-gray-50 to-white'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-xl ${isDarkMode ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30 shadow-amber-500/20' : 'bg-gray-100'}`}>
                    <CreditCard className={`w-6 h-6 ${isDarkMode ? 'text-amber-400' : 'text-gray-700'}`} />
                  </div>
                  <div>
                    <p className={`text-[11px] font-medium uppercase tracking-wider ${isDarkMode ? 'text-white/35' : 'text-gray-500'}`}>Membership ID</p>
                    <p className={`text-lg font-bold font-mono tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockMembership.id}</p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="dashboard-card-padding-lg">
                <div className="dashboard-grid-4">
                  {[
                    { icon: Award, label: 'Membership Type', value: mockMembership.type, iconBg: 'bg-amber-500/15', iconColor: 'text-amber-400' },
                    { icon: Users, label: 'Category', value: mockMembership.category, iconBg: 'bg-cyan-500/15', iconColor: 'text-cyan-400' },
                    { icon: Calendar, label: 'Joined Date', value: mockMembership.joinedDate, iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-400' },
                    { icon: Clock, label: 'Valid Until', value: mockMembership.expiryDate, iconBg: 'bg-rose-500/15', iconColor: 'text-rose-400' },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode ? 'border-white/[0.06] hover:border-white/15 hover:bg-white/[0.03] hover:shadow-lg hover:shadow-black/20' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isDarkMode ? item.iconBg : 'bg-gray-100'}`}>
                        <item.icon className={`w-4 h-4 ${isDarkMode ? item.iconColor : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className={`text-[10px] font-medium uppercase tracking-wider ${isDarkMode ? 'text-white/35' : 'text-gray-500'}`}>{item.label}</p>
                        <p className={`text-sm font-semibold mt-1 ${isDarkMode ? 'text-white/90' : 'text-gray-900'}`}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Membership Progress Bar */}
              <div className="dashboard-card-padding-lg pt-0">
                <div className={`dashboard-card-padding rounded-xl border ${isDarkMode ? 'border-white/[0.06] bg-white/[0.01]' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-medium uppercase tracking-wider ${isDarkMode ? 'text-white/35' : 'text-gray-500'}`}>Membership Timeline</span>
                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-cyan-400' : 'text-gray-700'}`}>{Math.round(membershipProgress)}% completed</span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden shadow-inner ${isDarkMode ? 'bg-white/[0.08]' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${isDarkMode ? 'bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 shadow-cyan-500/30' : 'bg-gradient-to-r from-gray-400 to-gray-600'}`}
                      style={{ width: `${membershipProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className={`text-[10px] ${isDarkMode ? 'text-white/25' : 'text-gray-400'}`}>Jan 2023</span>
                    <span className={`text-[10px] ${isDarkMode ? 'text-white/25' : 'text-gray-400'}`}>Dec 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className={`rounded-2xl border dashboard-card-padding-lg shadow-xl ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] shadow-black/20' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-base font-semibold mb-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Membership Benefits</h3>
              <div className="dashboard-grid-3">
                {mockMembership.benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 ${isDarkMode ? 'border-white/[0.06] hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/10' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                  >
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${isDarkMode ? 'text-emerald-500/50 group-hover:text-emerald-400' : 'text-gray-400 group-hover:text-green-500'}`} />
                    <span className={`text-sm ${isDarkMode ? 'text-white/60 group-hover:text-white' : 'text-gray-700'}`}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital ID Card Preview */}
            <div className={`rounded-2xl border dashboard-card-padding-lg ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-5">
                <h3 className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Digital Member Card</h3>
                <button 
                  onClick={() => setShowIdCard(!showIdCard)}
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${isDarkMode ? 'text-white/50 hover:text-white hover:bg-white/[0.05]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  {showIdCard ? 'Hide Card' : 'View Card'}
                </button>
              </div>
              
              {showIdCard && (
                <div className="flex justify-center">
                  <div 
                    className="relative w-full max-w-sm cursor-pointer perspective-1000"
                    onClick={() => setIdCardFlipped(!idCardFlipped)}
                  >
                    <div className={`relative w-full aspect-[1.6/1] rounded-2xl p-6 transition-all duration-700 transform-style-3d ${idCardFlipped ? 'rotate-y-180' : ''}`}>
                      {/* Front of Card */}
                      <div className={`absolute inset-0 rounded-2xl p-6 backface-hidden ${isDarkMode ? 'bg-gradient-to-br from-[#18181b] via-[#141416] to-[#0c0c0e] ring-1 ring-white/[0.08]' : 'bg-gradient-to-br from-gray-800 to-gray-900'}`}>
                        <div className="h-full flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center">
                                <img src="/Images/image logo.png" alt="VARA" className="h-5 w-auto" />
                              </div>
                              <span className="text-white font-semibold text-sm">VARA</span>
                            </div>
                            <span className="text-[10px] text-white/30 font-mono">{mockMembership.type.toUpperCase()}</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">{mockUser.name}</p>
                            <p className="text-white/35 text-xs font-mono mt-1">{mockMembership.id}</p>
                          </div>
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-[10px] text-white/30">VALID UNTIL</p>
                              <p className="text-white/70 text-xs">{mockMembership.expiryDate}</p>
                            </div>
                            <Zap className="w-5 h-5 text-white/15" />
                          </div>
                        </div>
                      </div>
                      {/* Back of Card */}
                      <div className={`absolute inset-0 rounded-2xl p-6 backface-hidden rotate-y-180 ${isDarkMode ? 'bg-gradient-to-br from-[#141416] to-[#0c0c0e] ring-1 ring-white/[0.08]' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}>
                        <div className="h-full flex flex-col justify-center items-center text-center">
                          <div className="w-20 h-20 rounded-xl bg-white p-2 mb-3">
                            <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#000,#000_2px,#fff_2px,#fff_4px)]"></div>
                          </div>
                          <p className="text-white/40 text-xs">Scan to verify membership</p>
                        </div>
                      </div>
                    </div>
                    <p className={`text-center text-xs mt-3 ${isDarkMode ? 'text-white/25' : 'text-gray-400'}`}>Click to flip</p>
                  </div>
                </div>
              )}
            </div>

            {/* Member Info & Important Dates Grid */}
            <div className="dashboard-grid-2">
              {/* Member Information */}
              <div className={`rounded-2xl border dashboard-card-padding-lg shadow-xl ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] shadow-black/20' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-base font-semibold mb-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Member Information</h3>
                <div className="space-y-1">
                  {[
                    { icon: User, label: 'Full Name', value: mockUser.name, iconColor: 'text-violet-400' },
                    { icon: Mail, label: 'Email', value: mockUser.email, iconColor: 'text-blue-400' },
                    { icon: Phone, label: 'Phone', value: mockUser.phone, iconColor: 'text-emerald-400' },
                    { icon: MapPin, label: 'Address', value: mockUser.address, iconColor: 'text-rose-400' },
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`flex items-center justify-between py-3.5 px-3 -mx-3 rounded-xl transition-colors duration-200 ${isDarkMode ? 'hover:bg-white/[0.03]' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${isDarkMode ? item.iconColor : 'text-gray-400'}`} />
                        <span className={`text-sm ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>{item.label}</span>
                      </div>
                      <span className={`text-sm font-medium text-right max-w-[200px] truncate ${isDarkMode ? 'text-white/90' : 'text-gray-900'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`rounded-2xl border dashboard-card-padding-lg shadow-xl ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] shadow-black/20' : 'bg-white border-gray-200'}`}>
                <h3 className={`text-base font-semibold mb-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
                <div className="dashboard-grid-2">
                  {[
                    { icon: Eye, label: 'View ID Card', color: 'hover:border-violet-500/40 hover:bg-violet-500/10', iconColor: 'group-hover:text-violet-400', shadow: 'hover:shadow-violet-500/15' },
                    { icon: Download, label: 'Download Certificate', color: 'hover:border-cyan-500/40 hover:bg-cyan-500/10', iconColor: 'group-hover:text-cyan-400', shadow: 'hover:shadow-cyan-500/15' },
                    { icon: Bell, label: 'Set Reminders', color: 'hover:border-amber-500/40 hover:bg-amber-500/10', iconColor: 'group-hover:text-amber-400', shadow: 'hover:shadow-amber-500/15' },
                    { icon: MessageCircle, label: 'Contact Support', color: 'hover:border-emerald-500/40 hover:bg-emerald-500/10', iconColor: 'group-hover:text-emerald-400', shadow: 'hover:shadow-emerald-500/15' },
                  ].map((action, index) => (
                    <button 
                      key={index}
                      className={`group flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl border transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 ${isDarkMode ? `border-white/[0.06] ${action.color} hover:shadow-lg ${action.shadow}` : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      <action.icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${isDarkMode ? `text-white/35 ${action.iconColor}` : 'text-gray-500'}`} />
                      <span className={`text-xs font-medium text-center ${isDarkMode ? 'text-white/50 group-hover:text-white' : 'text-gray-700'}`}>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Events Section */}
        {activeSection === 'events' && (
          <div className="dashboard-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Upcoming Events</h2>
              <button className={`text-sm font-medium px-5 py-2.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode ? 'text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                View Calendar
              </button>
            </div>

            <div className={`dashboard-grid-2 max-h-[650px] overflow-y-auto pr-2 pb-2 scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-white/10 scrollbar-track-transparent' : 'scrollbar-thumb-gray-300 scrollbar-track-gray-100'}`}>
              {mockEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`group rounded-2xl border p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer shadow-lg ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-cyan-500/40 hover:bg-cyan-500/5 shadow-black/20 hover:shadow-cyan-500/10' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                    {/* Date Badge */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg ${isDarkMode ? 'bg-gradient-to-br from-cyan-500/25 to-blue-500/25 shadow-cyan-500/20' : 'bg-gray-100'}`}>
                      <span className={`text-[10px] font-semibold uppercase ${isDarkMode ? 'text-cyan-400' : 'text-gray-500'}`}>
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className={`text-2xl font-bold -mt-0.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(event.date).getDate()}
                      </span>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{event.title}</h3>
                      <div className="space-y-2">
                        <p className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>
                          <Clock className={`w-3.5 h-3.5 ${isDarkMode ? 'text-amber-400' : ''}`} />
                          {event.time}
                        </p>
                        <p className={`text-sm flex items-center gap-2 ${isDarkMode ? 'text-white/45' : 'text-gray-500'}`}>
                          <MapPin className={`w-3.5 h-3.5 ${isDarkMode ? 'text-rose-400' : ''}`} />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <div className={`mt-5 pt-5 border-t ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-100'}`}>
                    <button className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 ${isDarkMode ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 hover:shadow-lg hover:shadow-cyan-500/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                      Register for event
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {mockEvents.length === 0 && (
              <div className={`rounded-2xl border p-12 text-center ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                <Calendar className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/15' : 'text-gray-300'}`} />
                <p className={isDarkMode ? 'text-white/45' : 'text-gray-500'}>No upcoming events at the moment.</p>
              </div>
            )}
          </div>
        )}

        {/* Announcements Section */}
        {activeSection === 'announcements' && (
          <div className="dashboard-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Announcements</h2>
              <button className={`text-sm font-medium px-5 py-2.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${isDarkMode ? 'text-violet-400 border-violet-500/30 hover:bg-violet-500/10 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/20' : 'text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
                Mark all as read
              </button>
            </div>

            <div className={`dashboard-stack-md max-h-[650px] overflow-y-auto pr-2 pb-2 scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-white/10 scrollbar-track-transparent' : 'scrollbar-thumb-gray-300 scrollbar-track-gray-100'}`}>
              {mockAnnouncements.map((announcement, index) => {
                const priorityStyles = {
                  high: { border: 'border-l-rose-500', glow: 'hover:shadow-rose-500/15', icon: 'text-rose-400' },
                  medium: { border: 'border-l-amber-500', glow: 'hover:shadow-amber-500/15', icon: 'text-amber-400' },
                  low: { border: 'border-l-blue-500', glow: 'hover:shadow-blue-500/15', icon: 'text-blue-400' },
                };
                const style = priorityStyles[announcement.priority] || priorityStyles.low;
                
                return (
                  <div 
                    key={announcement.id} 
                    className={`group rounded-2xl border border-l-4 p-6 transition-all duration-500 hover:scale-[1.01] hover:-translate-y-0.5 cursor-pointer shadow-lg ${isDarkMode ? `bg-white/[0.02] border-white/[0.06] hover:border-white/15 ${style.border} hover:shadow-xl ${style.glow}` : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {announcement.priority === 'high' && (
                            <AlertCircle className={`w-4 h-4 animate-pulse ${isDarkMode ? style.icon : 'text-red-500'}`} />
                          )}
                          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{announcement.title}</h3>
                        </div>
                        <p className={`text-sm mb-3 leading-relaxed ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>{announcement.content}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-white/25' : 'text-gray-400'}`}>{formatDate(announcement.date)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {mockAnnouncements.length === 0 && (
              <div className={`rounded-2xl border p-12 text-center ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                <Bell className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-white/15' : 'text-gray-300'}`} />
                <p className={isDarkMode ? 'text-white/45' : 'text-gray-500'}>No announcements at the moment.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-auto border-t ${isDarkMode ? 'bg-gradient-to-b from-[#09090b] via-[#07070a] to-[#050507] border-white/[0.06]' : 'bg-gradient-to-b from-gray-50 to-gray-100 border-gray-200'}`}>
        {/* Main Footer Content */}
        <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-12 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl p-1.5 flex items-center justify-center ${isDarkMode ? 'bg-white/[0.08]' : 'bg-gray-900'}`}>
                  <img src="/Images/image logo.png" alt="VARA" className="h-7 w-auto object-contain" />
                </div>
                <span className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>VARA</span>
              </div>
              <p className={`text-sm leading-relaxed text-center md:text-left max-w-[260px] ${isDarkMode ? 'text-white/35' : 'text-gray-500'}`}>
                Empowering members through community and professional development.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center">
              <h4 className={`text-xs font-semibold uppercase tracking-widest mb-5 ${isDarkMode ? 'text-white/50' : 'text-gray-700'}`}>Quick Actions</h4>
              <nav className="flex flex-col items-center gap-3">
                {['My Profile', 'Membership', 'Events', 'Support'].map((link) => (
                  <a 
                    key={link} 
                    href="#" 
                    className={`text-sm transition-all duration-200 hover:translate-x-1 ${isDarkMode ? 'text-white/35 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-end">
              <h4 className={`text-xs font-semibold uppercase tracking-widest mb-5 ${isDarkMode ? 'text-white/50' : 'text-gray-700'}`}>Contact Us</h4>
              <div className="flex flex-col items-center md:items-end gap-2 mb-5">
                <a href="mailto:info@vara.org" className={`text-sm transition-colors duration-200 ${isDarkMode ? 'text-white/35 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                  info@vara.org
                </a>
                <p className={`text-sm ${isDarkMode ? 'text-white/35' : 'text-gray-500'}`}>+1 (555) 123-4567</p>
              </div>
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-white/[0.05] text-white/35 hover:bg-white/10 hover:text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white'}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={`border-t ${isDarkMode ? 'border-white/[0.06] bg-[#050507]' : 'border-gray-200 bg-gray-100'}`}>
          <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-12 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isDarkMode ? 'bg-white/[0.08]' : 'bg-gray-900'}`}>
                  <img src="/Images/image logo.png" alt="VARA" className="h-3.5 w-auto object-contain" />
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-white/25' : 'text-gray-500'}`}>
                  © 2026 VARA Association. All rights reserved.
                </p>
              </div>
              <div className={`flex items-center gap-6 text-sm ${isDarkMode ? 'text-white/25' : 'text-gray-500'}`}>
                <a href="#" className={`transition-colors duration-200 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Privacy Policy</a>
                <span className={isDarkMode ? 'text-white/10' : 'text-gray-300'}>|</span>
                <a href="#" className={`transition-colors duration-200 ${isDarkMode ? 'hover:text-white' : 'hover:text-gray-900'}`}>Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div> {/* End of Main Content Wrapper */}

      {/* Click outside to close notification panel */}
      {notificationPanelOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setNotificationPanelOpen(false);
          }}
        />
      )}

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .slide-in-from-bottom-4 {
          transform: translateY(1rem);
          animation: slide-up 0.5s ease-out forwards;
        }
        
        @keyframes slide-up {
          to { transform: translateY(0); }
        }
        
        .slide-in-from-top-2 {
          transform: translateY(-0.5rem);
          animation: slide-down 0.2s ease-out forwards;
        }
        
        @keyframes slide-down {
          to { transform: translateY(0); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          border-radius: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
        }
      `}</style>
    </div>
  );
}
