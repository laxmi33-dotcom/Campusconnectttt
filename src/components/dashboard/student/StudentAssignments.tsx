import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Upload,
  Download,
  AlertCircle,
  FileCheck,
  Send,
  X,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';
import { Assignment } from '../../../types';

export const StudentAssignments: React.FC = () => {
  const { user } = useAuth();
  const { assignments, submissions, materials, submitAssignment } = useData();

  const [activeTab, setActiveTab] = useState<'assignments' | 'materials'>('assignments');
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);
  const [simulatedFileName, setSimulatedFileName] = useState('');
  const [submissionComments, setSubmissionComments] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const studentId = user?.id || 'user_student_1';
  const studentName = user?.name || 'Alex Mercer';

  const handleOpenSubmitModal = (asg: Assignment) => {
    setSubmittingAssignment(asg);
    setSimulatedFileName(`${studentName.replace(/\s+/g, '')}_${asg.subjectCode}_Submission.pdf`);
    setSubmissionComments('');
    setSubmitSuccess(false);
  };

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAssignment) return;

    submitAssignment(
      submittingAssignment.id,
      studentId,
      studentName,
      simulatedFileName || 'Assignment_Submission.pdf',
      submissionComments
    );

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmittingAssignment(null);
      setSubmitSuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header and Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Assignments & Course Materials
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit coursework, track faculty review scores, and download lecture notes
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'assignments' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Assignments ({assignments.length})
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'materials' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Study Notes ({materials.length})
          </button>
        </div>
      </div>

      {activeTab === 'assignments' ? (
        /* Assignments View */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((asg) => {
              const submission = submissions.find(
                (s) => s.assignmentId === asg.id && s.studentId === studentId
              );
              const isSubmitted = !!submission;
              const isGraded = submission?.status === 'Graded';

              return (
                <div
                  key={asg.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {asg.subjectCode}
                        </span>
                        <div className="text-xs text-slate-500 mt-1">{asg.subjectName}</div>
                      </div>

                      {/* Status Tag */}
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                          isGraded
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isSubmitted
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {isGraded ? 'Graded' : isSubmitted ? 'Submitted' : 'Pending'}
                      </span>
                    </div>

                    {/* Assignment Title & Details */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {asg.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {asg.description}
                      </p>
                    </div>

                    {/* Meta info */}
                    <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span>Faculty in charge:</span>
                        <strong className="text-slate-800">{asg.facultyName}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Max marks:</span>
                        <strong className="font-mono text-slate-800">{asg.maxMarks} pts</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Deadline:</span>
                        <span className="font-mono text-red-600 font-medium">
                          {new Date(asg.deadline).toLocaleDateString()} at{' '}
                          {new Date(asg.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Graded Feedback Box */}
                    {isGraded && submission && (
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between text-emerald-900 font-semibold">
                          <span>Grade Score:</span>
                          <span className="font-mono text-sm">
                            {submission.marksAwarded} / {asg.maxMarks}
                          </span>
                        </div>
                        {submission.feedback && (
                          <div className="text-[11px] text-emerald-800 italic mt-1">
                            "{submission.feedback}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    {asg.resourceFileName ? (
                      <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                        <Download className="w-3 h-3 text-slate-400" />
                        <span>{asg.resourceFileName}</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">PDF / Docx accepted</span>
                    )}

                    {isSubmitted ? (
                      <button
                        onClick={() => handleOpenSubmitModal(asg)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Update Submission
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenSubmitModal(asg)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-2xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Work</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Study Materials Vault */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50/75 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">
                Official Lecture Notes & Slide Vault
              </span>
            </div>
            <span className="text-xs text-slate-500">
              Verified by Department Course Instructors
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {mat.subjectCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {mat.subjectName}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{mat.title}</h4>
                  <p className="text-xs text-slate-600">{mat.description}</p>
                  <div className="text-[11px] text-slate-400">
                    Uploaded by {mat.uploadedBy} · {mat.date} · {mat.fileSize}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Simulating download for "${mat.title}". File size: ${mat.fileSize}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download {mat.fileType}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Assignment Modal */}
      {submittingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Submit Assignment
                </h4>
                <div className="text-xs text-blue-600 font-medium">
                  {submittingAssignment.subjectCode}: {submittingAssignment.title}
                </div>
              </div>
              <button
                onClick={() => setSubmittingAssignment(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-900 text-sm">Submission Recorded!</div>
                <div className="text-xs text-slate-500">
                  Your work has been uploaded and submitted for faculty grading review.
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmSubmit} className="space-y-4">
                {/* File Upload Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Document / Code File
                  </label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 text-center bg-slate-50/60 transition-colors">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-slate-800">
                      {simulatedFileName || 'Select or drop project file'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Accepted: .PDF, .ZIP, .DOCX, .CPP (Up to 25MB)
                    </div>
                  </div>
                </div>

                {/* Submission Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Submission Comments (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add implementation notes, algorithm complexities, or references for professor..."
                    value={submissionComments}
                    onChange={(e) => setSubmissionComments(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmittingAssignment(null)}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
                  >
                    Confirm Submission
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
