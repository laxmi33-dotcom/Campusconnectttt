import React, { useState } from 'react';
import { Send, Clock, CheckCircle2, XCircle, AlertCircle, Calendar, Plus, X } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';

export const StudentLeaves: React.FC = () => {
  const { user } = useAuth();
  const { leaves, submitLeaveRequest } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<'Medical' | 'Personal' | 'Academic' | 'Other'>('Medical');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const studentId = user?.id || 'user_student_1';
  const studentName = user?.name || 'Alex Mercer';
  const studentRoll = user?.studentId || '2024CS1042';
  const department = user?.department || 'Computer Science & Engineering';

  const myLeaves = leaves.filter((l) => l.studentId === studentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('End date must be on or after start date.');
      return;
    }
    if (!reason.trim() || reason.trim().length < 10) {
      setError('Please provide a substantive reason (minimum 10 characters).');
      return;
    }

    submitLeaveRequest({
      studentId,
      studentName,
      studentRoll,
      department,
      leaveType,
      startDate,
      endDate,
      reason: reason.trim(),
    });

    setIsSuccess(true);
    setTimeout(() => {
      setModalOpen(false);
      setIsSuccess(false);
      setStartDate('');
      setEndDate('');
      setReason('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Leave Requests & Medical Approvals
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit formal leave applications for medical, personal, or inter-collegiate academic events
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for New Leave</span>
        </button>
      </div>

      {/* Summary Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Pending Applications
          </div>
          <div className="text-3xl font-extrabold text-amber-600 font-mono tabular-nums">
            {myLeaves.filter((l) => l.status === 'Pending').length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Awaiting advisor verification</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Approved Leaves
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
            {myLeaves.filter((l) => l.status === 'Approved').length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Excused from attendance penalties</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Total Submissions
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
            {myLeaves.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">During Spring Semester 2026</div>
        </div>
      </div>

      {/* Leaves History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50/75 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Send className="w-4 h-4 text-blue-600" />
            <span>My Submitted Applications</span>
          </div>
          <span className="text-xs text-slate-500">
            Review decisions are issued by your Department Head or Faculty Advisor
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {myLeaves.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              You haven't submitted any leave applications yet.
            </div>
          ) : (
            myLeaves.map((leave) => {
              const isPending = leave.status === 'Pending';
              const isApproved = leave.status === 'Approved';

              return (
                <div
                  key={leave.id}
                  className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700">
                        {leave.leaveType} Leave
                      </span>
                      <span className="text-xs font-mono text-slate-500">
                        {leave.startDate} to {leave.endDate}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 font-medium">
                      {leave.reason}
                    </p>

                    {/* Review remarks */}
                    {leave.reviewerComment && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                        <div className="font-semibold text-slate-900">
                          Advisor Decision by {leave.reviewedBy}:
                        </div>
                        <div className="italic text-[11px]">"{leave.reviewerComment}"</div>
                      </div>
                    )}
                  </div>

                  <div className="self-start sm:self-center shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                        isApproved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isPending
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {isApproved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Approved</span>
                        </>
                      ) : isPending ? (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Pending Review</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-red-600" />
                          <span>Rejected</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Apply Leave Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Submit Leave Request
                </h4>
                <div className="text-xs text-blue-600">
                  Forwarded to Department Faculty Advisor
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-900 text-sm">Application Filed!</div>
                <div className="text-xs text-slate-500">
                  Your leave application is now pending review on the Faculty Workspace.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Leave Category
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="Medical">Medical Leave (Doctor prescription/treatment)</option>
                    <option value="Academic">Academic / Hackathon Event Participation</option>
                    <option value="Personal">Personal / Family Emergency</option>
                    <option value="Other">Other Official Collegiate Absence</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reason & Supporting Justification
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide details regarding the reason for absence, event details, or medical appointment..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Submit Application
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
