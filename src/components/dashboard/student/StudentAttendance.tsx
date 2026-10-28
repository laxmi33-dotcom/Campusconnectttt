import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';

export const StudentAttendance: React.FC = () => {
  const { user } = useAuth();
  const { getAttendanceForStudent } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const studentId = user?.id || 'user_student_1';
  const records = getAttendanceForStudent(studentId);

  const filteredRecords = records.filter(
    (r) =>
      r.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClasses = records.reduce((acc, r) => acc + r.totalClasses, 0);
  const totalAttended = records.reduce((acc, r) => acc + r.attendedClasses, 0);
  const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : '85.0';
  const isOverallShort = parseFloat(overallPercentage) < 75;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Attendance Record & Eligibility
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            University regulation requires a minimum 75% attendance in each enrolled course to qualify for end-semester examinations.
          </p>
        </div>

        {/* Status Pill */}
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 self-start sm:self-auto ${
          isOverallShort
            ? 'bg-amber-50 border-amber-200 text-amber-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {isOverallShort ? <AlertTriangle className="w-4 h-4 text-amber-600" /> : <CheckCircle className="w-4 h-4 text-emerald-600" />}
          <div className="text-xs">
            <span className="font-bold">Exam Status: </span>
            <span>{isOverallShort ? 'Shortage Alert (< 75%)' : 'Eligible for Exams'}</span>
          </div>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Overall Attendance
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {overallPercentage}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {totalAttended} of {totalClasses} total lectures attended
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Lectures Missed
          </div>
          <div className="text-3xl font-extrabold text-slate-700 font-mono tabular-nums">
            {totalClasses - totalAttended}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Absences across 5 registered theory & lab courses
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Safe Absence Margin
          </div>
          <div className="text-3xl font-extrabold text-blue-600 font-mono tabular-nums">
            {Math.max(0, Math.floor((totalAttended - 0.75 * totalClasses) / 0.75))} <span className="text-xs font-normal text-slate-500">classes</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Classes you can afford to miss without dropping below 75%
          </div>
        </div>
      </div>

      {/* Search & Subject Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3 my-auto pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by course code or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <span className="text-xs text-slate-500">
            Showing {filteredRecords.length} courses
          </span>
        </div>

        {/* Subject-Wise Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200/80 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4 text-center">Conducted</th>
                <th className="py-3 px-4 text-center">Attended</th>
                <th className="py-3 px-4 text-center">Missed</th>
                <th className="py-3 px-4 min-w-[160px]">Percentage</th>
                <th className="py-3 px-4 text-right">Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    No attendance records match your search filter.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => {
                  const pct = r.totalClasses > 0 ? (r.attendedClasses / r.totalClasses) * 100 : 0;
                  const isShort = pct < 75;
                  const missed = r.totalClasses - r.attendedClasses;

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{r.subjectName}</div>
                        <div className="text-[11px] font-mono text-blue-600">{r.subjectCode}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-700">
                        {r.totalClasses}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono tabular-nums text-emerald-700 font-semibold">
                        {r.attendedClasses}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-500">
                        {missed}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-2 rounded-full ${isShort ? 'bg-amber-500' : 'bg-blue-600'}`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-xs tabular-nums text-slate-900 w-12 text-right">
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                            isShort
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {isShort ? 'Shortage Alert' : 'Eligible'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Faculty marks updates are timestamped in real time.</span>
          <span className="font-medium text-slate-700">Attendance updated: Today, 11:30 AM</span>
        </div>
      </div>
    </div>
  );
};
