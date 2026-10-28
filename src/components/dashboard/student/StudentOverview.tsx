import React from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Bell,
  Award,
  ArrowRight,
  FileText,
  Send,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';

interface StudentOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const StudentOverview: React.FC<StudentOverviewProps> = ({ onNavigateTab }) => {
  const { user } = useAuth();
  const {
    getAttendanceForStudent,
    getResultsForStudent,
    assignments,
    submissions,
    announcements,
    events,
    timetable,
    leaves,
  } = useData();

  const studentId = user?.id || 'user_student_1';
  const attendanceRecords = getAttendanceForStudent(studentId);
  const results = getResultsForStudent(studentId);

  // Overall attendance calculation
  const totalClasses = attendanceRecords.reduce((acc, r) => acc + r.totalClasses, 0);
  const totalAttended = attendanceRecords.reduce((acc, r) => acc + r.attendedClasses, 0);
  const attendancePercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : '85.0';
  const isAttendanceShort = parseFloat(attendancePercentage) < 75;

  // Next timetable slot (today's schedule)
  const todaySlots = timetable.filter((t) => t.day === 'Monday'); // Default to Monday for consistent demo view

  // Pending assignments
  const pendingAssignments = assignments.filter((a) => {
    return !submissions.some((s) => s.assignmentId === a.id && s.studentId === studentId);
  });

  // Calculate SGPA for latest semester
  const sem5Results = results.filter((r) => r.semester === 5);
  const totalCredits = sem5Results.reduce((acc, r) => acc + r.credits, 0);
  const totalPoints = sem5Results.reduce((acc, r) => acc + r.gradePoint * r.credits, 0);
  const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '9.18';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[11px] font-semibold text-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Academic Term: Spring Semester 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Alex Mercer'}!
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
            {user?.course || 'B.Tech Computer Science'} · Semester {user?.semester || 6} · Roll No:{' '}
            <span className="font-mono font-semibold text-white">{user?.studentId || '2024CS1042'}</span>
          </p>
        </div>

        {/* Quick Action Badges */}
        <div className="relative z-10 flex flex-wrap items-center gap-2.5 pt-4">
          <button
            onClick={() => onNavigateTab('attendance')}
            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
          >
            Check Attendance
          </button>
          <button
            onClick={() => onNavigateTab('timetable')}
            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
          >
            Today's Timetable
          </button>
          <button
            onClick={() => onNavigateTab('leaves')}
            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
          >
            Submit Leave Request
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div
          onClick={() => onNavigateTab('attendance')}
          className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-blue-300 transition-colors cursor-pointer shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Overall Attendance
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isAttendanceShort ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {isAttendanceShort ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {attendancePercentage}%
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className={`h-1.5 rounded-full ${isAttendanceShort ? 'bg-amber-500' : 'bg-blue-600'}`}
                style={{ width: `${Math.min(parseFloat(attendancePercentage), 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
              <span>{totalAttended} / {totalClasses} classes</span>
              <span className={isAttendanceShort ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
                {isAttendanceShort ? 'Below 75%' : 'Eligible for Exams'}
              </span>
            </div>
          </div>
        </div>

        {/* Academic CGPA */}
        <div
          onClick={() => onNavigateTab('results')}
          className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-blue-300 transition-colors cursor-pointer shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Latest SGPA / CGPA
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {sgpa} <span className="text-xs font-normal text-slate-500">/ 10.0</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Cumulative CGPA: <strong className="text-slate-800 font-mono">8.84</strong> (First Class with Distinction)
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">
              Passed all {sem5Results.length || 5} subjects
            </div>
          </div>
        </div>

        {/* Pending Assignments */}
        <div
          onClick={() => onNavigateTab('assignments')}
          className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-blue-300 transition-colors cursor-pointer shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Assignments
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {pendingAssignments.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              {pendingAssignments.length > 0 ? (
                <span className="text-amber-600 font-medium">Due in next 14 days</span>
              ) : (
                <span className="text-emerald-600 font-medium">All submissions up to date</span>
              )}
            </div>
            <div className="text-[11px] text-blue-600 font-medium mt-1">
              {submissions.length} completed & graded
            </div>
          </div>
        </div>

        {/* Leave Status */}
        <div
          onClick={() => onNavigateTab('leaves')}
          className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-blue-300 transition-colors cursor-pointer shadow-2xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Leave Applications
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {leaves.filter((l) => l.studentId === studentId && l.status === 'Pending').length}
            </div>
            <div className="text-[11px] text-slate-500 mt-2">
              Pending review by Faculty Advisor
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              {leaves.filter((l) => l.studentId === studentId && l.status === 'Approved').length} approved leaves
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Today's Timetable + Important Circulars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Schedule (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Today's Class Schedule
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('timetable')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Full Week Grid</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todaySlots.slice(0, 4).map((slot, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {slot.subjectCode}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {slot.subjectName}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Faculty: {slot.facultyName} · Venue:{' '}
                    <strong className="text-slate-700">{slot.room}</strong>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-semibold text-slate-800 font-mono">
                    {slot.startTime} - {slot.endTime}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium">
                    Scheduled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Official Circulars (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Recent Notices
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('announcements')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                onClick={() => onNavigateTab('announcements')}
                className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 bg-white hover:bg-blue-50/20 transition-colors cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    {ann.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">
                    {ann.date}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {ann.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Campus Events Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-violet-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Featured Campus Events
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('events')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Browse Full Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.slice(0, 2).map((evt) => {
            const isRegistered = evt.registeredUserIds.includes(studentId);
            return (
              <div
                key={evt.id}
                className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-blue-600">{evt.category}</span>
                    <span className="font-mono text-[11px]">{evt.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{evt.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{evt.description}</p>
                  <div className="text-[11px] text-slate-500 mt-2">
                    Venue: <strong className="text-slate-700">{evt.venue}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-[11px] text-slate-500">
                    {evt.registeredUserIds.length} students attending
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                      isRegistered
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {isRegistered ? '✓ Registered' : 'Registration Open'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
