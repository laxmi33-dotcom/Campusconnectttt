import React, { useState } from 'react';
import { Award, Download, Printer, CheckCircle2, ChevronRight, FileCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';

export const StudentResults: React.FC = () => {
  const { user } = useAuth();
  const { getResultsForStudent } = useData();
  const [selectedSemester, setSelectedSemester] = useState<number>(5);

  const studentId = user?.id || 'user_student_1';
  const allResults = getResultsForStudent(studentId);

  // Group semesters
  const availableSemesters = Array.from(new Set(allResults.map((r) => r.semester))).sort((a, b) => b - a);
  const semesterResults = allResults.filter((r) => r.semester === selectedSemester);

  const totalCredits = semesterResults.reduce((acc, r) => acc + r.credits, 0);
  const weightedPoints = semesterResults.reduce((acc, r) => acc + r.gradePoint * r.credits, 0);
  const sgpa = totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : '9.18';

  // Overall CGPA
  const allCredits = allResults.reduce((acc, r) => acc + r.credits, 0);
  const allWeighted = allResults.reduce((acc, r) => acc + r.gradePoint * r.credits, 0);
  const cgpa = allCredits > 0 ? (allWeighted / allCredits).toFixed(2) : '8.84';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Academic Performance & Transcripts
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official credit statement and semester-wise examination grade cards
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Grade Card</span>
          </button>
        </div>
      </div>

      {/* GPA KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between">
          <div className="text-xs font-medium text-blue-200 uppercase tracking-wider">
            Semester {selectedSemester} SGPA
          </div>
          <div className="text-4xl font-black font-mono tracking-tight my-2">
            {sgpa} <span className="text-sm font-normal text-blue-200">/ 10.0</span>
          </div>
          <div className="text-xs text-blue-100">
            Earned {totalCredits} Credits · All Courses Cleared
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Cumulative CGPA
          </div>
          <div className="text-4xl font-extrabold text-slate-900 font-mono tracking-tight my-2">
            {cgpa} <span className="text-sm font-normal text-slate-400">/ 10.0</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium">
            First Class with Distinction
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Academic Credits
          </div>
          <div className="text-4xl font-extrabold text-blue-600 font-mono tracking-tight my-2">
            {allCredits}
          </div>
          <div className="text-xs text-slate-500">
            Target degree threshold: 160 Credits
          </div>
        </div>
      </div>

      {/* Semester Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <span className="text-xs font-semibold text-slate-500 mr-2 shrink-0">
          Select Semester:
        </span>
        {availableSemesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSemester === sem
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semester {sem}
          </button>
        ))}
      </div>

      {/* Grade Card Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50/75 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900">
              Grade Sheet — Semester {selectedSemester}
            </span>
          </div>
          <span className="text-xs text-slate-500">
            Student: {user?.name || 'Alex Mercer'} ({user?.studentId || '2024CS1042'})
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Course Code & Title</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-center">Internal (30)</th>
                <th className="py-3 px-4 text-center">External (70)</th>
                <th className="py-3 px-4 text-center">Total (100)</th>
                <th className="py-3 px-4 text-center">Letter Grade</th>
                <th className="py-3 px-4 text-center">Grade Point</th>
                <th className="py-3 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {semesterResults.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{item.subjectName}</div>
                    <div className="text-[11px] font-mono text-blue-600">{item.subjectCode}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-700">
                    {item.credits}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-600">
                    {item.internalMarks}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono tabular-nums text-slate-600">
                    {item.externalMarks}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono tabular-nums font-bold text-slate-900">
                    {item.totalMarks}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {item.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono tabular-nums font-semibold text-slate-700">
                    {item.gradePoint}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{item.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grade Key Legend */}
        <div className="p-4 bg-slate-50/60 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span><strong>Grade Scale:</strong> A+ (10) · Outstanding</span>
            <span>A (9) · Excellent</span>
            <span>B+ (8) · Very Good</span>
            <span>B (7) · Good</span>
          </div>
          <span className="text-slate-400">Published by University Controller of Examinations</span>
        </div>
      </div>
    </div>
  );
};
