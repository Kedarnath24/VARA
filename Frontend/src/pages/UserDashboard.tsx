import { useState, useEffect } from 'react';
import {
  User,
  Calendar,
  Bell,
  Menu,
  X,
  Edit3,
  Upload,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Linkedin,
  FileText,
  CreditCard,
  CheckCircle,
  Award,
  Users,
  MessageSquare,
  Shield,
  FileCheck,
  ChevronRight as ChevronRightIcon,
  AlertTriangle,
} from 'lucide-react';

// Types
interface UserProfile {
  name: string;
  memberId: string;
  email: string;
  phone: string;
  instagramId: string;
  linkedinId: string;
  portfolioLink: string;
  eSignature: string | null;
  avatar: string;
}

interface Membership {
  type: string;
  memberId: string;
  startDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'expiring-soon';
}

interface Event {
  id: number;
  name: string;
  date: string;
  venue: string;
  contactPerson: string;
  contactPhone: string;
  website: string;
}

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  important: boolean;
}

// Mock Data
const mockUser: UserProfile = {
  name: 'John Anderson',
  memberId: 'VARA-2024-001',
  email: 'john.anderson@email.com',
  phone: '+1 (302) 856-2802',
  instagramId: 'johnanderson',
  linkedinId: 'linkedin.com/in/johnanderson',
  portfolioLink: 'johnanderson.com',
  eSignature: null,
  avatar: '',
};

const mockMembership: Membership = {
  type: 'Professional Member',
  memberId: 'VARA-2024-001',
  startDate: '2024-01-15',
  expiryDate: '2026-01-15',
  status: 'active',
};

const mockEvents: Event[] = [
  {
    id: 1,
    name: 'Annual General Meeting 2026',
    date: '2026-02-15',
    venue: '119 W. Third Street',
    contactPerson: 'Sarah Wilson',
    contactPhone: '+1 (302) 856-2802',
    website: 'https://vara-association.com/agm2026',
  },
  {
    id: 2,
    name: 'Professional Development Workshop',
    date: '2026-01-28',
    venue: 'Virtual Event - Zoom',
    contactPerson: 'Michael Brown',
    contactPhone: '+1 (302) 856-2803',
    website: 'https://vara-association.com/workshop',
  },
  {
    id: 3,
    name: 'Networking Mixer',
    date: '2026-03-10',
    venue: 'Grand Hotel Conference Center',
    contactPerson: 'Emily Davis',
    contactPhone: '+1 (302) 856-2804',
    website: 'https://vara-association.com/mixer',
  },
];

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'New Member Portal Launch',
    description: 'We are excited to announce the launch of our new member portal with enhanced features and improved user experience.',
    date: '2026-01-20',
    important: true,
  },
  {
    id: 2,
    title: 'Membership Renewal Reminder',
    description: 'Members with expiring memberships are encouraged to renew before the deadline to avoid any service interruption.',
    date: '2026-01-18',
    important: false,
  },
  {
    id: 3,
    title: 'Upcoming Board Elections',
    description: 'Board elections will be held with Annual General Meeting. Nominations are now open for interested candidates.',
    date: '2026-01-15',
    important: false,
  },
  {
    id: 4,
    title: 'Holiday Office Hours',
    description: 'Please note that we have reduced hours during the holiday season. Check our website for details.',
    date: '2026-01-10',
    important: false,
  },
];

// Navigation Items
const navItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'membership', label: 'Membership', icon: CreditCard },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'announcements', label: 'Announcements', icon: Bell },
];

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUser);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calendar Logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    return { daysInMonth, startingDay };
  };

  const hasEventOnDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockEvents.some((event) => event.date === dateStr);
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1 text-center"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = hasEventOnDate(day);
      const isSelected = selectedDate === dateStr;
      const isToday = new Date().toISOString().split('T')[0] === dateStr;

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`p-1 text-sm rounded transition-all w-8 h-8 mx-auto flex items-center justify-center
            ${isSelected ? 'bg-slate-700 text-white' : isToday ? 'bg-slate-700 text-white' : hasEvent ? 'text-red-600 font-semibold' : 'text-slate-600 hover:bg-slate-100'}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h3 className="font-semibold text-slate-900">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="p-1 text-center text-xs font-medium text-slate-400">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  // Profile Section - Matching the design
  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Profile</h1>
          <p className="text-slate-500 mt-1">Manage your personal information and settings</p>
        </div>
        <button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        >
          <Edit3 className="w-4 h-4" />
          {isEditingProfile ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {/* Profile Header - Dark */}
        <div className="bg-slate-800 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <User className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{userProfile.name}</h2>
              <p className="text-slate-400 text-sm">{userProfile.memberId}</p>
              <span className="text-emerald-400 text-sm">Active Member</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm text-slate-500 mb-1">Full Name</label>
              {isEditingProfile ? (
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
                />
              ) : (
                <p className="text-slate-900 font-medium">{userProfile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-500 mb-1">Member ID</label>
              <p className="text-slate-900 font-medium">{userProfile.memberId}</p>
            </div>

            <div>
              <label className="block text-sm text-slate-500 mb-1">Email Address</label>
              {isEditingProfile ? (
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
                />
              ) : (
                <p className="text-slate-900">{userProfile.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-500 mb-1">Phone Number</label>
              {isEditingProfile ? (
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
                />
              ) : (
                <p className="text-slate-900">{userProfile.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-500 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                +1 (302) 856-2802
              </label>
              <p className="text-slate-900">{userProfile.phone}</p>
            </div>

            <div>
              <label className="block text-sm text-slate-500 mb-1 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5" />
                Linkedin
              </label>
              {isEditingProfile ? (
                <input
                  type="text"
                  value={userProfile.linkedinId}
                  onChange={(e) => setUserProfile({ ...userProfile, linkedinId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
                />
              ) : (
                <a href={`https://${userProfile.linkedinId}`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 inline-flex items-center gap-1 text-sm">
                  {userProfile.linkedinId}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Documents & Links Section */}
          <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200 mt-8">Documents & Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <FileText className="w-4 h-4" />
                Portfolio Website
              </div>
              {isEditingProfile ? (
                <input
                  type="text"
                  value={userProfile.portfolioLink}
                  onChange={(e) => setUserProfile({ ...userProfile, portfolioLink: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm"
                />
              ) : (
                <a href={`https://${userProfile.portfolioLink}`} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 inline-flex items-center gap-1 text-sm">
                  {userProfile.portfolioLink}
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                <Instagram className="w-4 h-4" />
                {userProfile.instagramId}
              </div>
              <p className="text-slate-600 text-sm">{userProfile.linkedinId}</p>
            </div>

            <div className="border border-dashed border-slate-300 rounded-lg p-4 flex items-center justify-center">
              <button className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors text-sm">
                <Upload className="w-4 h-4" />
                Upload E-Signature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Membership Section - Matching the design
  const renderMembershipSection = () => (
    <div className="space-y-6 w-full">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Membership Details</h1>
        <p className="text-slate-500 mt-1">View and manage your membership information</p>
      </div>

      {/* Membership Card - Full Width */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden w-full">
        {/* Header - Full Width Dark Bar */}
        <div className="bg-slate-800 px-6 py-3 flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold text-white">{mockMembership.type}</h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
            <CheckCircle className="w-4 h-4" />
            Active
          </span>
        </div>

        {/* Stats Row - Full Width with 3 Equal Columns */}
        <div className="grid grid-cols-3 divide-x divide-slate-200 w-full">
          {/* Member ID */}
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">Member ID</p>
            <p className="text-base font-semibold text-slate-900">{mockMembership.memberId}</p>
          </div>

          {/* Start Date */}
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-1">Start Date</p>
            <p className="text-base font-semibold text-slate-900">{formatDate(mockMembership.startDate)}</p>
          </div>

          {/* Expiry Date */}
          <div className="p-6 text-center bg-red-50">
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-red-600 mb-1">Expiry Date</p>
            <p className="text-base font-bold text-red-600">{formatDate(mockMembership.expiryDate)}</p>
          </div>
        </div>
      </div>

      {/* Renew Membership Link */}
      <div>
        <button className="text-red-600 hover:text-red-700 font-medium text-sm">
          Renew Membership
        </button>
      </div>

      {/* Membership Benefits - Full Width */}
      <div className="w-full">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Membership Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
          {[
            { icon: Award, title: 'Professional Recognition', desc: 'Industry-recognized credentials', color: 'text-amber-600', bg: 'bg-amber-50' },
            { icon: Users, title: 'Networking Events', desc: 'Connect with peers', color: 'text-red-600', bg: 'bg-red-50' },
            { icon: Shield, title: 'Insurance Benefits', desc: 'Professional liability coverage', color: 'text-red-600', bg: 'bg-red-50' },
            { icon: MessageSquare, title: 'Member Support', desc: '24/7 dedicated assistance', color: 'text-slate-600', bg: 'bg-slate-100' },
            { icon: Shield, title: 'Insurance Benefits', desc: 'Professional liability coverage', color: 'text-red-600', bg: 'bg-red-50' },
            { icon: FileCheck, title: 'Certifications', desc: 'Professional development', color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className={`w-10 h-10 ${benefit.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 text-sm">{benefit.title}</h4>
                <p className="text-sm text-slate-500">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Events Section - Matching the design
  const renderEventsSection = () => {
    return (
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Events</h1>
          <p className="text-slate-500 mt-1">View upcoming events and activities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            {renderCalendar()}
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer"
                  >
                    <div className="w-14 h-16 bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center shadow-sm">
                      <span className="text-xs text-red-600 font-semibold uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-xl font-bold text-slate-900">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900">{event.name}</h4>
                      <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.venue}
                      </p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Announcements Section - Matching the design
  const renderAnnouncementsSection = () => (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Announcements List */}
        <div className="lg:col-span-3 space-y-4">
          {mockAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white rounded-lg border border-slate-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded bg-red-100 mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{announcement.title}</h3>
                      {announcement.important && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-medium rounded">
                          Important
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{announcement.description}</p>
                    <p className="text-slate-400 text-xs mt-2">{formatDate(announcement.date)}</p>
                  </div>
                </div>
                <p className="text-slate-500 text-sm whitespace-nowrap">{formatDate(announcement.date)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar - Active Top Leaders */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-4">Active Top Leaders</h3>
            
            {/* Important Banner */}
            <div className="mb-4">
              <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded">Important</span>
            </div>

            {/* Featured Images */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Featured Announcement */}
            <div className="border-t border-slate-200 pt-4">
              <h4 className="font-medium text-slate-900 mb-1">Membership Renewal Reminder</h4>
              <p className="text-sm text-slate-500 mb-2">January 18, 2026</p>
              <p className="text-sm text-slate-600">Members with expiring memberships are encouraged to renew the deadline to avoid any service interruption.</p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <a href="#" className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center gap-1">
                View All Announcements
                <ChevronRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'membership':
        return renderMembershipSection();
      case 'events':
        return renderEventsSection();
      case 'announcements':
        return renderAnnouncementsSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-base font-bold text-slate-900 hidden sm:block">VARA Association</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium ${
                      activeSection === item.id
                        ? 'bg-red-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-slate-900">{userProfile.name}</p>
                <p className="text-xs text-slate-500">{userProfile.memberId}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
                <User className="w-4 h-4 text-slate-500" />
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 top-14">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <nav className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-colors text-sm ${
                      activeSection === item.id
                        ? 'bg-red-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-6">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-auto">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
          {/* Main Footer Content */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Association Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="text-base font-bold">VARA Association</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Professional association dedicated to excellence in our field. Serving members across the nation with commitment and integrity.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Contact Information</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-4 h-4 mt-0.5 text-slate-500 flex-shrink-0" />
                  <span>119 W. Third Street, Suite 6<br />Lewes, DE 19958</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>1-302-856-2802</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>hello@vara-association.com</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Accessibility Statement</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Member Services */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Member Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Member Benefits</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Education & Training</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Certification Programs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Career Resources</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 1999-2026 VARA Association, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
