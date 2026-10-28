import React, { useState, useEffect } from 'react';
import { GraduationCap, Menu, X, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
              Campus<span className="text-blue-600">Connect</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 tracking-normal hidden sm:block">
              College Management Portal
            </div>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('hero')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('features')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('project-demo')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 font-semibold text-blue-600"
          >
            <span>Project Demo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block"></span>
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Actions Zone */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                <UserCheck className="w-4 h-4" />
                <span>Go to {user.role === 'admin' ? 'Admin' : user.role === 'faculty' ? 'Faculty' : 'Student'} Portal</span>
              </button>
              <button
                onClick={logout}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('login')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-xs hover:shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              Dashboard
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('features')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick('project-demo')}
              className="text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold cursor-pointer"
            >
              Project Demo (Video)
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              About the Project
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              Contact Support
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg"
                >
                  Enter Dashboard ({user?.role})
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2 text-center text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('login');
                  }}
                  className="py-2.5 text-center text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('register');
                  }}
                  className="py-2.5 text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
