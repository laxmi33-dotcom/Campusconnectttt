import React from 'react';
import {
  Play,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Bell,
  Award,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreFeatures: () => void;
  onWatchDemo: () => void;
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreFeatures,
  onWatchDemo,
  onGetStarted,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-blue-50/60 via-white to-white">
      {/* Subtle decorative background gradient circles */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 -translate-x-1/2 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, CTAs, Trust Indicators */}
          <div className="lg:col-span-7 space-y-6">
            {/* Project Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Next-Gen College Management & Student Portal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Your College Life,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
                Connected in One Place.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              CampusConnect brings students, faculty, and administrators together through one smart platform for academics, attendance, announcements, events, and campus resources.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreFeatures}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>Explore Features</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWatchDemo}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-xs transition-all cursor-pointer group"
              >
                <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Project Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Smart Academic Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Real-Time Campus Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Easy Student Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Dashboard Preview Mockup */}
          <div className="lg:col-span-5 relative">
            {/* Backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-cyan-500/10 rounded-3xl transform rotate-1 scale-105 filter blur-xl opacity-70" />

            {/* Dashboard Card Container */}
            <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
              {/* Window Header */}
              <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-slate-300 ml-2">
                    CampusConnect · Student Portal
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cyan-400">Semester 6</span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                {/* Student Info Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-blue-700 text-sm">
                      AM
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Alex Mercer</div>
                      <div className="text-xs text-slate-500">B.Tech Computer Science · 2024CS1042</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                      Good Standing
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 font-mono">CGPA: 8.84</div>
                  </div>
                </div>

                {/* Live Attendance Mini Widget */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-700">Overall Attendance</span>
                    <span className="text-xs font-bold text-blue-600 font-mono">84.8%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: '84.8%' }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                    <span>Target: 75% min required</span>
                    <span className="text-emerald-600 font-medium">✓ Safe threshold</span>
                  </div>
                </div>

                {/* Grid: Timetable Next Up + Recent Notice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Today's Schedule Mini */}
                  <div className="p-3 rounded-xl border border-slate-100 bg-white">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-2">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Next Lecture</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate">Advanced Algorithms</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">10:15 AM · Hall 302</div>
                    <div className="text-[10px] text-blue-600 mt-1 font-medium">Prof. Elena Rostova</div>
                  </div>

                  {/* Upcoming Event */}
                  <div className="p-3 rounded-xl border border-slate-100 bg-white">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Next Event</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate">InnovateX Hackathon</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Nov 15 · Main Auditorium</div>
                    <div className="text-[10px] text-emerald-600 mt-1 font-medium">✓ RSVP Confirmed</div>
                  </div>
                </div>

                {/* Important Notice Banner */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100/80 flex items-start gap-2.5">
                  <Bell className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-800">Exam Circular:</span>{' '}
                    <span className="text-slate-600">Mid-term schedules and seating plans released for Semester 6.</span>
                  </div>
                </div>

                {/* Quick Link into Portal */}
                <button
                  onClick={onGetStarted}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Launch Live Student Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
