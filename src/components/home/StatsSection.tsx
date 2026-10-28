import React from 'react';
import { Users, BookOpen, Bell, Calendar, Info } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StatsSection: React.FC = () => {
  const { users, courses, announcements, events } = useData();

  const studentCount = users.filter((u) => u.role === 'student').length;
  const facultyCount = users.filter((u) => u.role === 'faculty').length;

  const stats = [
    {
      label: 'Students Enrolled',
      value: `${1250 + studentCount}`,
      delta: 'Active in CSE, EEE & Business programs',
      icon: Users,
    },
    {
      label: 'Courses Available',
      value: `${45 + courses.length}`,
      delta: 'Across 6 collegiate departments',
      icon: BookOpen,
    },
    {
      label: 'Announcements Posted',
      value: `${128 + announcements.length}`,
      delta: 'Official circulars & exam alerts',
      icon: Bell,
    },
    {
      label: 'Campus Events & Workshops',
      value: `${32 + events.length}`,
      delta: 'Symposiums, hackathons & sports',
      icon: Calendar,
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Transparent Demonstration Disclaimer Banner */}
        <div className="mb-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
            <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>
              Demonstration Metrics: Values represent simulated university workload benchmarks for this project presentation.
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    {stat.delta}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
