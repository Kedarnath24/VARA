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
  Settings,
  HelpCircle,
  CheckCircle2,
  Shield,
  ChevronUp,
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
  description: string;
  amount: number;
  date: string;
  status: 'received' | 'pending';
  paymentMode: string;
}

interface ExpenseRecord {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending';
  paymentMode: string;
}

interface BalanceSheetItem {
  label: string;
  amount: number;
  paymentMode: string;
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
  },
];

const mockProofs: MembershipProof[] = [
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
];

const dashboardStats: DashboardStat[] = [
  { label: 'Total Members', value: 1247, change: '+12%', trend: 'up', icon: Users },
  { label: 'Active Memberships', value: 1089, change: '+8%', trend: 'up', icon: Activity },
  { label: 'Pending Approvals', value: 23, change: '-15%', trend: 'down', icon: Clock },
  { label: 'Revenue This Month', value: '$45,230', change: '+23%', trend: 'up', icon: TrendingUp },
];

// Income mock data
const mockIncomeRecords: IncomeRecord[] = [
  { id: 'INC-001', source: 'Membership Fees', description: 'Premium membership renewals', amount: 25430, date: '2025-01-28', status: 'received', paymentMode: 'Bank Transfer' },
  { id: 'INC-002', source: 'Event Revenue', description: 'Annual Gala 2025 ticket sales', amount: 12800, date: '2025-01-25', status: 'received', paymentMode: 'UPI' },
  { id: 'INC-003', source: 'Membership Fees', description: 'Standard membership new signups', amount: 5600, date: '2025-01-22', status: 'received', paymentMode: 'Cash' },
  { id: 'INC-004', source: 'Donations', description: 'Corporate sponsorship - TechCorp', amount: 10000, date: '2025-01-20', status: 'pending', paymentMode: 'NEFT' },
  { id: 'INC-005', source: 'Event Revenue', description: 'Workshop registration fees', amount: 3400, date: '2025-01-18', status: 'received', paymentMode: 'UPI' },
];

// Expenses mock data
const mockExpenseRecords: ExpenseRecord[] = [
  { id: 'EXP-001', category: 'Operations', description: 'Office rent - January 2025', amount: 4500, date: '2025-01-01', status: 'paid', paymentMode: 'Bank Transfer' },
  { id: 'EXP-002', category: 'Marketing', description: 'Social media advertising campaign', amount: 2800, date: '2025-01-15', status: 'paid', paymentMode: 'UPI' },
  { id: 'EXP-003', category: 'Operations', description: 'Utilities and maintenance', amount: 1200, date: '2025-01-10', status: 'paid', paymentMode: 'Cash' },
  { id: 'EXP-004', category: 'Events', description: 'Annual Gala venue and catering', amount: 8500, date: '2025-01-24', status: 'paid', paymentMode: 'NEFT' },
  { id: 'EXP-005', category: 'Marketing', description: 'Print materials and flyers', amount: 950, date: '2025-01-20', status: 'pending', paymentMode: 'Cash' },
  { id: 'EXP-006', category: 'Technology', description: 'Website hosting and maintenance', amount: 450, date: '2025-01-05', status: 'paid', paymentMode: 'UPI' },
];

// Balance Sheet mock data
const mockAssets: BalanceSheetItem[] = [
  { label: 'Cash Balance', amount: 87650, paymentMode: 'Cash' },
  { label: 'Membership Receivables', amount: 15400, paymentMode: 'Bank Transfer' },
  { label: 'Event Earnings', amount: 16200, paymentMode: 'UPI' },
  { label: 'Investment Portfolio', amount: 42000, paymentMode: 'Bank Transfer' },
];

const mockLiabilities: BalanceSheetItem[] = [
  { label: 'Pending Payments', amount: 12950, paymentMode: 'NEFT' },
  { label: 'Operational Costs', amount: 8700, paymentMode: 'Cash' },
  { label: 'Event Deposits', amount: 5200, paymentMode: 'Bank Transfer' },
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

// Navigation items
const adminNavItems = [
  { id: 'profile', label: 'Admin Profile', icon: Shield },
  { id: 'accounts', label: 'Accounts', icon: Wallet, hasDropdown: true },
  { id: 'membership', label: 'Membership Details', icon: CreditCard },
  { id: 'proofs', label: 'Membership Approvals', icon: FileText },
  { id: 'events', label: 'Events Announcements', icon: Megaphone, hasDropdown: true },
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
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [accountsDropdownOpen, setAccountsDropdownOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<MembershipProof | null>(null);
  const [selectedMember, setSelectedMember] = useState<MemberAccount | null>(null);
  
  // Modal states
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddAnnouncementModal, setShowAddAnnouncementModal] = useState(false);
  
  // Payment mode states
  const [incomePaymentMode, setIncomePaymentMode] = useState('Cash');
  const [expensePaymentMode, setExpensePaymentMode] = useState('Cash');
  const [balancePaymentMode, setBalancePaymentMode] = useState('Cash');
  
  // Form states
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>(mockIncomeRecords);
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>(mockExpenseRecords);
  const [assets, setAssets] = useState<BalanceSheetItem[]>(mockAssets);
  const [liabilities, setLiabilities] = useState<BalanceSheetItem[]>(mockLiabilities);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);

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
    
    const newIncome: IncomeRecord = {
      id: `INC-${String(incomeRecords.length + 1).padStart(3, '0')}`,
      source: formData.get('source') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      date: formData.get('date') as string,
      status: formData.get('status') as 'received' | 'pending',
      paymentMode: finalPaymentMode,
    };
    setIncomeRecords([newIncome, ...incomeRecords]);
    setShowAddIncomeModal(false);
    setIncomePaymentMode('Cash');
  };

  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const paymentModeValue = formData.get('paymentMode') as string;
    const customPaymentMode = formData.get('customPaymentMode') as string;
    const finalPaymentMode = paymentModeValue === 'Others' ? customPaymentMode : paymentModeValue;
    
    const newExpense: ExpenseRecord = {
      id: `EXP-${String(expenseRecords.length + 1).padStart(3, '0')}`,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      date: formData.get('date') as string,
      status: formData.get('status') as 'paid' | 'pending',
      paymentMode: finalPaymentMode,
    };
    setExpenseRecords([newExpense, ...expenseRecords]);
    setShowAddExpenseModal(false);
    setExpensePaymentMode('Cash');
  };

  const handleAddBalanceEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as string;
    const label = formData.get('label') as string;
    const amount = Number(formData.get('amount'));
    const paymentModeValue = formData.get('paymentMode') as string;
    const customPaymentMode = formData.get('customPaymentMode') as string;
    const finalPaymentMode = paymentModeValue === 'Others' ? customPaymentMode : paymentModeValue;
    
    const newItem: BalanceSheetItem = { label, amount, paymentMode: finalPaymentMode };
    
    if (type === 'asset') {
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
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setEvents([newEvent, ...events]);
    setShowAddEventModal(false);
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
    <div className={`min-h-screen flex flex-col overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0B0D10]' : 'bg-gray-100'}`}>
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/15 via-purple-600/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[-15%] w-[500px] h-[500px] bg-gradient-to-bl from-cyan-500/12 via-blue-600/6 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[450px] h-[450px] bg-gradient-to-tr from-emerald-500/10 via-teal-600/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-all duration-300 ${isDarkMode ? 'bg-[#0B0D10]/80 border-white/[0.08]' : 'bg-white/80 border-gray-200'}`}>
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between h-16 px-10 lg:px-20 xl:px-28">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-gray-900'}`}>
                <img 
                  src="/Images/image logo.png" 
                  alt="VARA Logo" 
                  className="h-6 w-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>VARA</span>
                <span className={`text-xs px-2 py-0.5 rounded-md ${isDarkMode ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>Admin</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {adminNavItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.hasDropdown ? (
                    // Dropdown nav items (Accounts and Events Announcements)
                    <>
                      <button
                        onClick={() => {
                          if (item.id === 'accounts') {
                            // If already on accounts section, just toggle dropdown
                            if (activeSection === 'accounts') {
                              setAccountsDropdownOpen(!accountsDropdownOpen);
                            } else {
                              // Otherwise, switch to accounts and open dropdown
                              setActiveSection('accounts');
                              setAccountsDropdownOpen(true);
                              setEventsDropdownOpen(false);
                            }
                          } else if (item.id === 'events') {
                            // If already on events section, just toggle dropdown
                            if (activeSection === 'events') {
                              setEventsDropdownOpen(!eventsDropdownOpen);
                            } else {
                              // Otherwise, switch to events and open dropdown
                              setActiveSection('events');
                              setEventsDropdownOpen(true);
                              setAccountsDropdownOpen(false);
                            }
                          }
                        }}
                        className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ${
                          activeSection === item.id
                            ? isDarkMode 
                              ? 'text-white bg-white/10 shadow-lg shadow-white/5' 
                              : 'text-gray-900 bg-gray-100'
                            : isDarkMode
                              ? 'text-white/60 hover:text-white hover:bg-white/5'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          (item.id === 'accounts' && accountsDropdownOpen) || (item.id === 'events' && eventsDropdownOpen) ? 'rotate-180' : ''
                        }`} />
                        {activeSection === item.id && (
                          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`}></div>
                        )}
                      </button>
                      
                      {/* Accounts Dropdown Menu */}
                      {item.id === 'accounts' && accountsDropdownOpen && activeSection === 'accounts' && (
                        <div className={`absolute top-full mt-2 left-0 w-48 rounded-xl shadow-2xl border p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                          {accountsDropdownItems.map((dropdownItem) => (
                            <button
                              key={dropdownItem.id}
                              onClick={() => {
                                setAccountsSubSection(dropdownItem.id);
                                setAccountsDropdownOpen(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm rounded-lg flex items-center gap-3 transition-all duration-200 ${
                                accountsSubSection === dropdownItem.id
                                  ? isDarkMode ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-100'
                                  : isDarkMode ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <dropdownItem.icon className="w-4 h-4" />
                              {dropdownItem.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Events Dropdown Menu */}
                      {item.id === 'events' && eventsDropdownOpen && activeSection === 'events' && (
                        <div className={`absolute top-full mt-2 left-0 w-52 rounded-xl shadow-2xl border p-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                          {eventsDropdownItems.map((dropdownItem) => (
                            <button
                              key={dropdownItem.id}
                              onClick={() => {
                                setEventsSubSection(dropdownItem.id);
                                setEventsDropdownOpen(false);
                              }}
                              className={`w-full px-3 py-2.5 text-left text-sm rounded-lg flex items-center gap-3 transition-all duration-200 ${
                                eventsSubSection === dropdownItem.id
                                  ? isDarkMode ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-100'
                                  : isDarkMode ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <dropdownItem.icon className="w-4 h-4" />
                              {dropdownItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    // Regular nav item
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setAccountsDropdownOpen(false);
                        setEventsDropdownOpen(false);
                      }}
                      className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ${
                        activeSection === item.id
                          ? isDarkMode 
                            ? 'text-white bg-white/10 shadow-lg shadow-white/5' 
                            : 'text-gray-900 bg-gray-100'
                          : isDarkMode
                            ? 'text-white/60 hover:text-white hover:bg-white/5'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                      {activeSection === item.id && (
                        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`}></div>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              {/* Notifications */}
              <button 
                onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
                className={`relative p-2.5 rounded-xl transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-violet-500 rounded-full animate-pulse"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative ml-2">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-xl transition-all duration-300 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-violet-500/30 to-purple-500/10 ring-1 ring-white/10' : 'bg-gray-900'}`}>
                    <Shield className={`w-4 h-4 ${isDarkMode ? 'text-violet-300' : 'text-white'}`} />
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 hidden sm:block transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''} ${isDarkMode ? 'text-white/40' : 'text-gray-400'}`} />
                </button>

                {userDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isDarkMode ? 'bg-[#14161A] border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className={`px-3 py-3 rounded-xl mb-1 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{mockAdminProfile.name}</p>
                      <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{mockAdminProfile.role}</p>
                    </div>
                    <div className="py-1">
                      <button className={`w-full px-3 py-2.5 text-left text-sm rounded-xl flex items-center gap-3 transition-all duration-200 ${isDarkMode ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button className={`w-full px-3 py-2.5 text-left text-sm rounded-xl flex items-center gap-3 transition-all duration-200 ${isDarkMode ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                      </button>
                    </div>
                    <div className={`border-t pt-1 mt-1 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                      <button
                        onClick={handleLogout}
                        className={`w-full px-3 py-2.5 text-left text-sm rounded-xl flex items-center gap-3 transition-all duration-200 ${isDarkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2.5 rounded-xl ${isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className={`md:hidden border-t py-3 px-4 animate-in slide-in-from-top duration-200 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
              {adminNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm font-medium flex items-center gap-3 rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? isDarkMode ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-100'
                      : isDarkMode ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <div className="w-full max-w-[1600px] mx-auto px-10 lg:px-20 xl:px-28 py-8 space-y-8">
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
              <button className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                <UserPlus className="w-4 h-4" />
                Add New Member
              </button>
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
                      <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                        <div>
                          <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <ArrowUpCircle className="w-5 h-5 text-emerald-400" />
                            Income Records
                          </h2>
                          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Track all income sources and transactions
                          </p>
                        </div>
                        <button
                          onClick={() => setShowAddIncomeModal(true)}
                          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isDarkMode ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                        >
                          <UserPlus className="w-4 h-4" />
                          Add Income
                        </button>
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
                            {incomeRecords.map((record) => (
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
                      <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                        <div>
                          <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <ArrowDownCircle className="w-5 h-5 text-red-400" />
                            Expense Records
                          </h2>
                          <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Monitor all expenses and operational costs
                          </p>
                        </div>
                        <button
                          onClick={() => setShowAddExpenseModal(true)}
                          className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isDarkMode ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30' : 'bg-red-600 text-white hover:bg-red-700'}`}
                        >
                          <UserPlus className="w-4 h-4" />
                          Add Expense
                        </button>
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
                            {expenseRecords.map((record) => (
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
                    </div>
                  </>
                )}

                {/* Balance Sheet Section */}
                {accountsSubSection === 'balance' && (
                  <>
                    {/* Add Balance Button */}
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={() => setShowAddBalanceModal(true)}
                        className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                      >
                        <UserPlus className="w-4 h-4" />
                        Add Entry
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Assets */}
                      <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                        <div className={`p-6 border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            Assets
                          </h3>
                        </div>
                        <div className="p-6 space-y-4">
                          {assets.map((asset, index) => (
                            <div 
                              key={index}
                              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'bg-white/[0.02] hover:bg-white/[0.04]' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                              <div className="flex flex-col gap-1">
                                <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{asset.label}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${isDarkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                                  {asset.paymentMode}
                                </span>
                              </div>
                              <span className={`text-lg font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                ${asset.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                          <div className={`pt-4 border-t ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Assets</span>
                              <span className={`text-xl font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                ${assets.reduce((sum, asset) => sum + asset.amount, 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Liabilities */}
                      <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                        <div className={`p-6 border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <ArrowDownCircle className="w-5 h-5 text-red-400" />
                            Liabilities
                          </h3>
                        </div>
                        <div className="p-6 space-y-4">
                          {liabilities.map((liability, index) => (
                            <div 
                              key={index}
                              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'bg-white/[0.02] hover:bg-white/[0.04]' : 'bg-gray-50 hover:bg-gray-100'}`}
                            >
                              <div className="flex flex-col gap-1">
                                <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{liability.label}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${isDarkMode ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                                  {liability.paymentMode}
                                </span>
                              </div>
                              <span className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                                ${liability.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}
                          <div className={`pt-4 border-t ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Total Liabilities</span>
                              <span className={`text-xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                                ${liabilities.reduce((sum, liability) => sum + liability.amount, 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Net Balance */}
                    <div className={`rounded-2xl border p-8 relative overflow-hidden group hover:scale-[1.01] transition-all duration-500 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:shadow-2xl hover:shadow-violet-500/20' : 'bg-white border-gray-200 hover:border-violet-300 hover:shadow-xl'}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className={`text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              <BarChart3 className="w-7 h-7 text-violet-400" />
                              Net Balance
                            </h3>
                            <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                              Total Assets - Total Liabilities
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-4xl font-bold ${isDarkMode ? 'text-violet-400' : 'text-violet-600'}`}>
                              ${(assets.reduce((sum, a) => sum + a.amount, 0) - liabilities.reduce((sum, l) => sum + l.amount, 0)).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        {/* Financial Health Progress Bar */}
                        <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Financial Health</span>
                            <span className={`text-sm font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Excellent</span>
                          </div>
                          <div className={`w-full h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full animate-pulse" style={{ width: '85%' }}></div>
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
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <Calendar className="w-6 h-6 text-violet-400" />
                          Events Management
                        </h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          Create and manage events for members
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAddEventModal(true)}
                        className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isDarkMode ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/30' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                      >
                        <UserPlus className="w-4 h-4" />
                        Create Event
                      </button>
                    </div>

                    {/* Events List */}
                    <div className="grid grid-cols-1 gap-6">
                      {events.map((event, index) => (
                        <div 
                          key={event.id}
                          className={`rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.01] ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
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
                      ))}
                    </div>
                  </>
                )}

                {/* Announcements Section */}
                {eventsSubSection === 'announcements' && (
                  <>
                    {/* Header with Add Announcement Button */}
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className={`text-2xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          <Megaphone className="w-6 h-6 text-orange-400" />
                          Announcements
                        </h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          Create and manage announcements for members
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAddAnnouncementModal(true)}
                        className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${isDarkMode ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/30' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
                      >
                        <Send className="w-4 h-4" />
                        Create Announcement
                      </button>
                    </div>

                    {/* Announcements List */}
                    <div className="grid grid-cols-1 gap-6">
                      {announcements.map((announcement, index) => (
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
                  </>
                )}
              </div>
            )}

            {/* Membership Details Section */}
            {activeSection === 'membership' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`rounded-2xl border p-8 ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                  <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <CreditCard className="w-5 h-5" />
                    Membership Details Overview
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockAccounts.map((account, index) => (
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
                </div>
              </div>
            )}

            {/* Membership Approvals Section */}
            {activeSection === 'proofs' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-white border-gray-200'}`}>
                  <div className="p-6 border-b border-white/[0.06]">
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <FileText className="w-5 h-5" />
                      Membership Verification Documents
                    </h2>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>
                      Review and manage uploaded membership proofs
                    </p>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockProofs.map((proof, index) => (
                      <div 
                        key={proof.id}
                        className={`group relative rounded-xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer ${isDarkMode ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/15 hover:shadow-xl hover:shadow-white/5' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => setSelectedProof(proof)}
                      >
                        {/* Document preview */}
                        <div className={`aspect-[4/3] flex items-center justify-center ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'} relative overflow-hidden`}>
                          <FileText className={`w-16 h-16 ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`} />
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                            <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                              <Eye className="w-5 h-5 text-white" />
                            </button>
                            <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                              <Download className="w-5 h-5 text-white" />
                            </button>
                          </div>

                          {/* Status badge */}
                          <span className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(proof.status)}`}>
                            {proof.status === 'verified' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                            {proof.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                            {proof.status.charAt(0).toUpperCase() + proof.status.slice(1)}
                          </span>
                        </div>

                        {/* Document info */}
                        <div className="p-4">
                          <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{proof.memberName}</h3>
                          <p className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'} mb-2`}>{proof.memberId}</p>
                          
                          <div className={`pt-3 border-t ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-100'} space-y-1.5`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Type:</span>
                              <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{proof.documentType}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Uploaded:</span>
                              <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(proof.uploadDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
            <form onSubmit={handleAddIncome} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Income Source</label>
                <select name="source" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'}`}>
                  <option value="Membership Fees">Membership Fees</option>
                  <option value="Event Revenue">Event Revenue</option>
                  <option value="Donations">Donations</option>
                  <option value="Other">Other</option>
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
            <form onSubmit={handleAddExpense} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Category</label>
                <select name="category" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-red-500' : 'bg-white border-gray-200 text-gray-900 focus:border-red-500'}`}>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Events">Events</option>
                  <option value="Technology">Technology</option>
                  <option value="Salaries">Salaries</option>
                  <option value="Misc">Miscellaneous</option>
                </select>
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
                Add Balance Entry
              </h3>
            </div>
            <form onSubmit={handleAddBalanceEntry} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Type</label>
                <select name="type" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500'}`}>
                  <option value="asset">Asset</option>
                  <option value="liability">Liability</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Label</label>
                <input type="text" name="label" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="Enter label..." />
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowAddEventModal(false)}></div>
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
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Registration Link</label>
                <input type="url" name="registrationLink" required className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="https://..." />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>Max Participants (Optional)</label>
                <input type="number" name="maxParticipants" min="1" className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-violet-500 placeholder:text-white/40' : 'bg-white border-gray-200 text-gray-900 focus:border-violet-500 placeholder:text-gray-400'}`} placeholder="Enter max participants..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowAddEventModal(false)} className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
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

            {/* Content */}
            <div className="p-6 space-y-6">
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

              {/* Contact Info */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'} space-y-3`}>
                <div className="flex items-center gap-3">
                  <Phone className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{selectedMember.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className={`w-4 h-4 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`} />
                  <span className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>{selectedMember.email}</span>
                </div>
              </div>

              {/* Membership Info */}
              <div>
                <h5 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Membership Information</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Type</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.membershipType}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Status</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedMember.status}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Joined</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedMember.dateJoined)}</p>
                  </div>
                  <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                    <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Expires</p>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedMember.expiryDate)}</p>
                  </div>
                </div>
              </div>

              {/* Last Activity */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                <p className={`text-xs mb-1 ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>Last Active</p>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{formatDate(selectedMember.lastActive)}</p>
              </div>
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

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 z-40 ${isDarkMode ? 'bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20' : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'}`}
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
