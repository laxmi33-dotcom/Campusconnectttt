import React, { useState } from 'react';
import {
  GraduationCap,
  LayoutDashboard,
  CheckCircle,
  Award,
  FileText,
  Clock,
  Bell,
  Calendar,
  Users,
  Send,
  User,
  LogOut,
  Home,
  Menu,
  X,
  ChevronDown,
  Shield,
  Briefcase,
  BookOpen,
  Mail,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface DashboardLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentTab,
  onSelectTab,
  onNavigateHome,
  children,
}) => {
  const { user, logout, loginAsDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const role = user?.role || 'student';

  // Navigation Items per role
  const studentNav = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'attendance', label: 'Attendance', icon: CheckCircle },
    { key: 'results', label: 'Results & Grades', icon: Award },
    { key: 'assignments', label: 'Assignments & Notes', icon: FileText },
    { key: 'timetable', label: 'Class Timetable', icon: Clock },
    { key: 'announcements', label: 'Announcements', icon: Bell },
    { key: 'events', label: 'Campus Events', icon: Calendar },
    { key: 'faculty', label: 'Faculty Directory', icon: Users },
    { key: 'leaves', label: 'Leave Requests', icon: Send },
    { key: 'profile', label: 'Profile & Settings', icon: User },
  ];

  const facultyNav = [
    { key: 'overview', label: 'Faculty Overview', icon: LayoutDashboard },
    { key: 'mark-attendance', label: 'Mark Attendance', icon: CheckCircle },
    { key: 'manage-assignments', label: 'Assignments & Notes', icon: FileText },
    { key: 'grade-students', label: 'Grading & Marks', icon: Award },
    { key: 'review-leaves', label: 'Review Leave Requests', icon: Send },
    { key: 'timetable', label: 'Teaching Schedule', icon: Clock },
    { key: 'announcements', label: 'Circulars & Notices', icon: Bell },
    { key: 'profile', label: 'Faculty Profile', icon: User },
  ];

  const adminNav = [
    { key: 'overview', label: 'Admin Overview', icon: LayoutDashboard },
    { key: 'manage-users', label: 'Students & Faculty', icon: Users },
    { key: 'manage-courses', label: 'Courses & Depts', icon: BookOpen },
    { key: 'manage-announcements', label: 'Notice Board', icon: Bell },
    { key: 'manage-events', label: 'Campus Events', icon: Calendar },
    { key: 'timetable', label: 'Timetable Manager', icon: Clock },
    { key: 'contact-inbox', label: 'Contact Inquiries', icon: Mail },
    { key: 'profile', label: 'Admin Profile', icon: User },
  ];

  const navItems = role === 'admin' ? adminNav : role === 'faculty' ? facultyNav : studentNav;

  const handleRoleSwitch = (newRole: UserRole) => {
    loginAsDemo(newRole);
    setRoleDropdownOpen(false);
    onSelectTab('overview');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Demo Simulation Banner */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 text-[11px] flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-medium text-white">CampusConnect Interactive Sandbox</span>
          <span className="hidden sm:inline text-slate-400">· Active Session Role:</span>
          <span className="font-semibold text-cyan-400 uppercase tracking-wider">{role}</span>
        </div>

        {/* Quick Role Switcher for seamless presentation demo */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer text-[11px]"
          >
            <span>Switch Role Demo</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-1 w-48 rounded-xl bg-slate-800 border border-slate-700 shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-1.5 text-[10px] text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-700">
                Change Demo Persona
              </div>
              <button
                onClick={() => handleRoleSwitch('student')}
                className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-700 text-slate-200 cursor-pointer ${
                  role === 'student' ? 'bg-blue-600/30 text-blue-400 font-semibold' : ''
                }`}
              >
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span>Student (Alex Mercer)</span>
              </button>
              <button
                onClick={() => handleRoleSwitch('faculty')}
                className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-700 text-slate-200 cursor-pointer ${
                  role === 'faculty' ? 'bg-indigo-600/30 text-indigo-400 font-semibold' : ''
                }`}
              >
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Faculty (Prof. Elena)</span>
              </button>
              <button
                onClick={() => handleRoleSwitch('admin')}
                className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-slate-700 text-slate-200 cursor-pointer ${
                  role === 'admin' ? 'bg-cyan-600/30 text-cyan-400 font-semibold' : ''
                }`}
              >
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Admin (Dean Arthur)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200/90 shrink-0">
          {/* Brand header */}
          <div className="h-16 px-5 border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2 group cursor-pointer text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 leading-tight">
                  Campus<span className="text-blue-600">Connect</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {role} portal
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onSelectTab(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User profile & actions footer */}
          <div className="p-3 border-t border-slate-100 space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'CC'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{user?.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{user?.department}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                onClick={onNavigateHome}
                className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <button
                onClick={logout}
                className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar with Breadcrumbs & Mobile Trigger */}
          <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shrink-0">
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer mr-1"
                aria-label="Open portal navigation"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                onClick={onNavigateHome}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Home
              </button>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500 capitalize">{role} Portal</span>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-slate-900 capitalize">
                {currentTab.replace('-', ' ')}
              </span>
            </div>

            {/* Quick Profile Info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <div className="text-xs font-bold text-slate-900">{user?.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {user?.studentId || user?.facultyId || 'Administrator'}
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'CC'}
              </div>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Modal */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-xs bg-white h-full flex flex-col p-4 shadow-2xl z-10">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">CampusConnect</div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    {role} portal
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      onSelectTab(item.key);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome();
                }}
                className="w-full py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
              >
                Return to Website
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2 rounded-lg bg-red-50 text-red-700 text-xs font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
