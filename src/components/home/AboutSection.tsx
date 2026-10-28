import React from 'react';
import { Target, Users2, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const goals = [
    {
      title: 'Reduce Manual Administrative Work',
      description: 'Automates attendance percentage calculations, examination grade sheets, and multi-tier leave approval routing, saving staff hundreds of manual paper hours every semester.',
      icon: Target,
    },
    {
      title: 'Improve Student-Faculty Communication',
      description: 'Connects learners directly with professors through shared digital notices, real-time assignment review rubrics, and walk-in office hours availability.',
      icon: Users2,
    },
    {
      title: 'Make Academic Information Accessible',
      description: 'Consolidates transcripts, subject marks, lecture notes, timetable updates, and campus events into an intuitive mobile-responsive portal.',
      icon: Database,
    },
    {
      title: 'Provide a Unified Digital Experience',
      description: 'Replaces disconnected spreadsheets, bulletin notice boards, and paper request slips with a synchronized, modern college management system.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Campus Image & Architecture Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-lg group">
              <img
                src="/src/assets/images/hero_college_campus_1793204721254.jpg"
                alt="Modern university academic campus grounds"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Academic Quad & Learning Hub
                </span>
                <p className="text-sm font-medium text-slate-100 mt-1">
                  Connecting over 1,200 students with dedicated faculty across 6 university departments.
                </p>
              </div>
            </div>

            {/* Tech Architecture Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Project Architecture Highlights
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>React 19 & TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Tailwind CSS Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Role-Based Access Control</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Local Storage Persistence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Purpose, Goals */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                About the Project
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Built to Make College Management Simpler
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                CampusConnect is a web-based college management project designed to centralize academic information, campus communication, and student services in one accessible platform. Traditional universities often struggle with fragmented portals, physical paper notice boards, and disparate attendance tracking sheets.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our vision bridges this gap by unifying student daily timetables, assignment submissions, marks transcripts, event calendars, and departmental leave tracking into a cohesive, responsive web application.
              </p>
            </div>

            {/* 4 Core Goals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {goals.map((g, idx) => {
                const Icon = g.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200/90 hover:border-blue-200 transition-colors shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
