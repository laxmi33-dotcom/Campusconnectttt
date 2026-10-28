import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckCircle,
  Award,
  FileText,
  Bell,
  Calendar,
  Clock,
  Users,
  Send,
  HelpCircle,
  ArrowRight,
  X,
  ExternalLink,
} from 'lucide-react';

interface FeaturesSectionProps {
  onSelectFeature: (featureKey: string) => void;
}

interface FeatureItem {
  key: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  details: string[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectFeature }) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const features: FeatureItem[] = [
    {
      key: 'dashboard',
      number: '01',
      title: 'Student Dashboard',
      subtitle: 'Personalized academic overview',
      description: 'Centralized cockpit showing active courses, real-time attendance thresholds, upcoming deadlines, daily timetable, and recent announcements.',
      icon: LayoutDashboard,
      color: 'blue',
      details: [
        'Personalized profile card with Roll Number & Semester',
        'Visual progress meters for overall attendance',
        'Upcoming assignment deadlines and priority flags',
        'One-click access to academic documents',
      ],
    },
    {
      key: 'attendance',
      number: '02',
      title: 'Attendance Management',
      subtitle: 'Track attendance percentage & logs',
      description: 'Comprehensive subject-by-subject attendance calculator with alert threshold indicators to ensure 75% college minimum compliance.',
      icon: CheckCircle,
      color: 'emerald',
      details: [
        'Course-wise total classes vs attended tally',
        'Automatic 75% statutory warning alerts',
        'Faculty real-time attendance logging',
        'Detailed subject log timestamps',
      ],
    },
    {
      key: 'results',
      number: '03',
      title: 'Academic Results',
      subtitle: 'Subject marks, grades & SGPA/CGPA',
      description: 'Semester-wise transcript view displaying internal assessments, end-semester exam scores, credit weightages, and cumulative grade points.',
      icon: Award,
      color: 'indigo',
      details: [
        'Breakdown of internal test + external university marks',
        'Semester Grade Point Average (SGPA) computation',
        'Cumulative Grade Point Average (CGPA) progression',
        'Official marks memo preview format',
      ],
    },
    {
      key: 'assignments',
      number: '04',
      title: 'Assignments & Study Materials',
      subtitle: 'Deadlines, files & notes repository',
      description: 'Submit course assignments with file attachments, view faculty grading feedback, and download lecture slide decks and reference notes.',
      icon: FileText,
      color: 'sky',
      details: [
        'Online submission status & timestamp proof',
        'Faculty grading rubrics and direct remarks',
        'Central syllabus & lecture slide PDF vault',
        'Filter materials by subject code and professor',
      ],
    },
    {
      key: 'announcements',
      number: '05',
      title: 'Announcements & Notices',
      subtitle: 'Instant official college updates',
      description: 'Broadcast notifications categorised by Examinations, Academic Calendars, Administrative Circulars, and Student Affairs.',
      icon: Bell,
      color: 'amber',
      details: [
        'Pinned administrative and exam circulars',
        'Color-coded categorization (Exam, Academic, Campus)',
        'Searchable notification archive',
        'Published by authorized deans and department heads',
      ],
    },
    {
      key: 'events',
      number: '06',
      title: 'Events & Campus Activities',
      subtitle: 'Explore hackathons, workshops & fests',
      description: 'Interactive campus calendar for technical hackathons, guest lectures, cultural galas, and inter-department sports tournaments.',
      icon: Calendar,
      color: 'violet',
      details: [
        'One-click student RSVP and seat reservation',
        'Event venue, schedule, and organizer details',
        'Category filters for technical, cultural, sports',
        'Capacity and attendee registration counters',
      ],
    },
    {
      key: 'timetable',
      number: '07',
      title: 'Timetable Management',
      subtitle: 'Daily & weekly schedule grid',
      description: 'Dynamic schedule viewer showing lecture timings, laboratory allocations, room/hall numbers, and assigned faculty members.',
      icon: Clock,
      color: 'cyan',
      details: [
        'Today’s upcoming class highlights',
        'Full Monday-through-Friday weekly matrix',
        'Classroom and lab venue specifications',
        'Synchronized across faculty and student views',
      ],
    },
    {
      key: 'faculty',
      number: '08',
      title: 'Faculty Directory',
      subtitle: 'Profiles, research & office hours',
      description: 'Searchable university faculty roster with contact emails, office cabin locations, consultation hours, and academic specializations.',
      icon: Users,
      color: 'teal',
      details: [
        'Departmental filtering (CSE, EEE, MBA, Mech)',
        'Official email and telephone extensions',
        'Designation and qualification credentials',
        'Walk-in office consultation hours',
      ],
    },
    {
      key: 'leaves',
      number: '09',
      title: 'Leave Requests',
      subtitle: 'Submit & track leave applications',
      description: 'Digital leave approval pipeline allowing students to submit medical and personal leave requests with faculty approval review.',
      icon: Send,
      color: 'rose',
      details: [
        'Structured leave request submission form',
        'Categorized: Medical, Academic, Personal',
        'Real-time status tracking (Pending/Approved/Rejected)',
        'Faculty review comments and attendance adjustments',
      ],
    },
    {
      key: 'support',
      number: '10',
      title: 'Student Support',
      subtitle: 'Campus helpdesk & academic contact',
      description: 'Direct communication desk for technical inquiries, admissions guidance, fee clearance assistance, and academic counseling.',
      icon: HelpCircle,
      color: 'blue',
      details: [
        'Interactive support message submission',
        'Direct inquiry routing to campus administration',
        'Guidance on elective change and credit transfers',
        'Local inquiry inbox visible to administrators',
      ],
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            All-In-One Campus Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need for a Smarter Campus
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Ten integrated modules built to modernize academic workflows, eliminate administrative bottlenecks, and keep every collegiate member connected.
          </p>
        </div>

        {/* Feature Cards Grid (10 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.key}
                onClick={() => setSelectedFeature(feat)}
                className="group relative bg-white rounded-2xl border border-slate-200/90 p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number and Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 font-mono tracking-wider">
                      {feat.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {feat.title}
                  </h3>
                  <div className="text-xs font-medium text-blue-600/90 mb-3">
                    {feat.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative space-y-5 animate-in fade-in duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <selectedFeature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    {selectedFeature.title}
                  </h4>
                  <div className="text-xs text-blue-600 font-medium">
                    {selectedFeature.subtitle}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedFeature.description}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Key Capabilities in CampusConnect:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedFeature.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const key = selectedFeature.key;
                  setSelectedFeature(null);
                  onSelectFeature(key);
                }}
                className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
              >
                <span>Launch in Live Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
