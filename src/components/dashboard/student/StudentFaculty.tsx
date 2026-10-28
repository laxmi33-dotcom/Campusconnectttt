import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Search, Send, CheckCircle2, X } from 'lucide-react';
import { useData } from '../../../context/DataContext';
import { FacultyMember } from '../../../types';

export const StudentFaculty: React.FC = () => {
  const { faculty } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeMessageFaculty, setActiveMessageFaculty] = useState<FacultyMember | null>(null);
  const [messageText, setMessageText] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  const departments = ['All', 'Computer Science & Engineering', 'Humanities & Social Sciences'];

  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || f.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setSendSuccess(true);
    setTimeout(() => {
      setActiveMessageFaculty(null);
      setMessageText('');
      setSendSuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Faculty Directory & Consultation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Connect with professors, research advisors, and course instructors for office hours consultations
          </p>
        </div>
      </div>

      {/* Search & Department Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3 my-auto pointer-events-none" />
            <input
              type="text"
              placeholder="Search faculty name, specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept === 'All' ? 'All Departments' : dept.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-colors"
          >
            <div className="space-y-4">
              {/* Profile Bar */}
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-sm overflow-hidden border border-blue-200">
                  {fac.avatar ? (
                    <img src={fac.avatar} alt={fac.name} className="w-full h-full object-cover" />
                  ) : (
                    fac.name.slice(0, 2)
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {fac.name}
                  </h3>
                  <div className="text-xs text-blue-600 font-medium">
                    {fac.designation}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {fac.qualification}
                  </div>
                </div>
              </div>

              {/* Specialization */}
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600 border border-slate-100">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Academic Specialization
                </div>
                <div className="text-slate-800 font-medium leading-relaxed">
                  {fac.specialization}
                </div>
              </div>

              {/* Consultation and Contact Details */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Hours: <strong className="text-slate-800">{fac.officeHours}</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{fac.officeRoom}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-[11px] truncate text-slate-700">{fac.email}</span>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveMessageFaculty(fac)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Consultation</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation Message Modal */}
      {activeMessageFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Request Consultation
                </h4>
                <div className="text-xs text-blue-600">
                  With {activeMessageFaculty.name} ({activeMessageFaculty.designation})
                </div>
              </div>
              <button
                onClick={() => setActiveMessageFaculty(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sendSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  Consultation Request Sent!
                </div>
                <div className="text-xs text-slate-500">
                  Professor {activeMessageFaculty.name.split(' ')[1]} has received your office-hour consultation request.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="text-xs text-slate-500 p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                  Scheduled consultation walk-in: <strong>{activeMessageFaculty.officeHours}</strong> at <strong>{activeMessageFaculty.officeRoom}</strong>.
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Meeting Topic / Research Doubt
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe what you would like to discuss (e.g. Project guidance, Exam clarification, Research paper review)..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveMessageFaculty(null)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
