import React from 'react';
import { KeyRound, LayoutGrid, CheckCheck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onGetStarted: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onGetStarted }) => {
  const steps = [
    {
      step: '01',
      title: 'Sign In Securely',
      subtitle: 'Role-based credentials or instant 1-click demo access',
      description:
        'Log in with your college credentials as a Student, Faculty Member, or Administrator. For demonstrations, one-click demo credentials grant immediate access with realistic pre-populated data.',
      icon: KeyRound,
    },
    {
      step: '02',
      title: 'Explore Your Dashboard',
      subtitle: 'View synchronized academic and departmental records',
      description:
        'Access personalized attendance percentages, today’s timetable schedule, upcoming assignment deadlines, published examination notices, and semester grade sheets customized to your program.',
    icon: LayoutGrid,
    },
    {
      step: '03',
      title: 'Stay Connected & Act',
      subtitle: 'Manage tasks, track leaves, and follow campus events',
      description:
        'Submit assignments, register for hackathons and sports events, apply for academic leaves, review grades, and consult the faculty directory—all synchronized in real time with local persistence.',
      icon: CheckCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Simple 3-Step Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How CampusConnect Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Designed for frictionless daily use by students, professors, and administrative staff across every device.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 font-mono">
                      {item.step}
                    </span>
                  </div>

                  {/* Step Titles */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-blue-600 mb-3">
                    {item.subtitle}
                  </div>

                  {/* Step Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] font-medium text-slate-400 flex items-center justify-between">
                  <span>Step {index + 1} of 3</span>
                  <span className="text-blue-600 font-semibold">Active</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <span>Try the Live Demo Portal Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
