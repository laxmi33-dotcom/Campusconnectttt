import React from 'react';
import { GraduationCap, ArrowUp, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (target: string) => {
    if (target.startsWith('#')) {
      const el = document.getElementById(target.substring(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate(target);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Campus<span className="text-blue-400">Connect</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              “Your Campus. Your Community. Your Future.”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              CampusConnect is a modern web-based college management platform designed to centralize academic information, attendance records, circulars, and departmental workflows in one smart interface.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Academic Demonstration Project — Safe Local Sandbox</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleLinkClick('#hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#features')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  System Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#project-demo')}
                  className="hover:text-blue-400 text-blue-300 transition-colors font-medium cursor-pointer"
                >
                  Project Demo (Video)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About the Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Portals & Roles */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Portals & Roles
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Portal Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Faculty Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Administrator Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('register')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('#contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Help & Feedback Form
                </button>
              </li>
            </ul>
          </div>

          {/* Campus Office Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Campus Office
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Academic Tower, Room 402, University Road, Cambridge Campus</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono">support@campusconnect.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-mono tabular-nums">+1 (800) 555-CAMPUS</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} CampusConnect. Built for College Management & Student Academic Success.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">
              Demo Version 2.4 · Local Persistence Active
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
