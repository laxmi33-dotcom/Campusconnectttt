import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  FileText,
  Award,
  Send,
  Clock,
  Bell,
  User as UserIcon,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Upload,
  Calendar,
  AlertCircle,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Assignment } from '../../types';

interface FacultyDashboardProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({ currentTab, onSelectTab }) => {
  const { user } = useAuth();
  const {
    users,
    courses,
    attendance,
    markAttendance,
    assignments,
    submissions,
    createAssignment,
    gradeSubmission,
    materials,
    addMaterial,
    leaves,
    updateLeaveStatus,
    announcements,
    addAnnouncement,
    results,
    addOrUpdateResult,
  } = useData();

  const students = users.filter((u) => u.role === 'student');

  // Attendance State
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('CS601');
  const [attendanceDate, setAttendanceDate] = useState<string>('2026-10-28');
  const [studentStatusMap, setStudentStatusMap] = useState<Record<string, 'present' | 'absent'>>({
    user_student_1: 'present',
    user_student_2: 'present',
    user_student_3: 'absent',
  });
  const [attendanceSuccess, setAttendanceSuccess] = useState(false);

  // Assignment Creation State
  const [asgTitle, setAsgTitle] = useState('');
  const [asgDesc, setAsgDesc] = useState('');
  const [asgMaxMarks, setAsgMaxMarks] = useState(50);
  const [asgDeadline, setAsgDeadline] = useState('2026-11-15T23:59:00');
  const [asgSuccess, setAsgSuccess] = useState(false);

  // Grading State
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);
  const [gradeMarks, setGradeMarks] = useState<number>(45);
  const [gradeFeedback, setGradeFeedback] = useState('');

  // Study Material State
  const [matTitle, setMatTitle] = useState('');
  const [matDesc, setMatDesc] = useState('');
  const [matSubject, setMatSubject] = useState('CS601');
  const [matSuccess, setMatSuccess] = useState(false);

  // Announcement State
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<'Academic' | 'Examination' | 'Campus Life'>('Academic');
  const [annSuccess, setAnnSuccess] = useState(false);

  // Leave Review Remarks State
  const [leaveComments, setLeaveComments] = useState<Record<string, string>>({});

  // Handlers
  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const presentStudents = Object.keys(studentStatusMap).filter((id) => studentStatusMap[id] === 'present');
    const absentStudents = Object.keys(studentStatusMap).filter((id) => studentStatusMap[id] === 'absent');

    if (presentStudents.length > 0) {
      markAttendance(selectedCourseCode, presentStudents, 'present');
    }
    if (absentStudents.length > 0) {
      markAttendance(selectedCourseCode, absentStudents, 'absent');
    }

    setAttendanceSuccess(true);
    setTimeout(() => setAttendanceSuccess(false), 2500);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle.trim() || !asgDesc.trim()) return;

    createAssignment({
      courseId: 'c1',
      subjectCode: selectedCourseCode,
      subjectName: 'Advanced Algorithms & Complexity',
      title: asgTitle.trim(),
      description: asgDesc.trim(),
      deadline: asgDeadline,
      maxMarks: asgMaxMarks,
      createdByFacultyId: user?.id || 'user_faculty_1',
      facultyName: user?.name || 'Prof. Elena Rostova',
      resourceFileName: 'Specification_Brief.pdf',
    });

    setAsgSuccess(true);
    setTimeout(() => {
      setAsgSuccess(false);
      setAsgTitle('');
      setAsgDesc('');
    }, 2000);
  };

  const handleGradeSubmit = (submissionId: string) => {
    gradeSubmission(submissionId, gradeMarks, gradeFeedback || 'Good analysis and correct implementation.');
    setGradingSubId(null);
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;

    addMaterial({
      subjectCode: matSubject,
      subjectName: matSubject === 'CS601' ? 'Advanced Algorithms' : 'Distributed Cloud Systems',
      title: matTitle.trim(),
      description: matDesc.trim(),
      uploadedBy: user?.name || 'Prof. Elena Rostova',
      date: 'Today',
      fileType: 'PDF',
      fileSize: '3.4 MB',
    });

    setMatSuccess(true);
    setTimeout(() => {
      setMatSuccess(false);
      setMatTitle('');
      setMatDesc('');
    }, 2000);
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    addAnnouncement({
      title: annTitle.trim(),
      content: annContent.trim(),
      category: annCategory,
      date: 'Today',
      author: user?.name || 'Prof. Elena Rostova',
      isPinned: false,
    });

    setAnnSuccess(true);
    setTimeout(() => {
      setAnnSuccess(false);
      setAnnTitle('');
      setAnnContent('');
    }, 2000);
  };

  // 1. Overview Tab
  if (currentTab === 'overview') {
    const pendingLeaves = leaves.filter((l) => l.status === 'Pending');

    return (
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-200">
              Faculty Workspace & Academic Governance
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || 'Prof. Elena Rostova'}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
              {user?.department || 'Department of Computer Science & Engineering'} · ID:{' '}
              <span className="font-mono">{user?.facultyId || 'FAC-CS-018'}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-4">
            <button
              onClick={() => onSelectTab('mark-attendance')}
              className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
            >
              Mark Today's Attendance
            </button>
            <button
              onClick={() => onSelectTab('review-leaves')}
              className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
            >
              Review Pending Leaves ({pendingLeaves.length})
            </button>
            <button
              onClick={() => onSelectTab('manage-assignments')}
              className="px-3.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
            >
              Create New Assignment
            </button>
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onSelectTab('mark-attendance')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Assigned Classes
              </span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">2</div>
            <div className="text-xs text-slate-500 mt-1">CS601 & CS601-Lab (Semester 6)</div>
          </div>

          <div
            onClick={() => onSelectTab('review-leaves')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending Leaves
              </span>
              <Send className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-amber-600 font-mono">
              {pendingLeaves.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">Awaiting advisor approval</div>
          </div>

          <div
            onClick={() => onSelectTab('manage-assignments')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Assignments
              </span>
              <FileText className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {assignments.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">{submissions.length} submissions received</div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Enrolled Students
              </span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {students.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">Undergraduate B.Tech CSE</div>
          </div>
        </div>

        {/* Assigned Classes Details & Quick Student Roster */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Assigned Courses — Spring 2026
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs font-bold text-blue-600">CS601 (Theory)</div>
                  <div className="text-xs font-bold text-slate-900">Advanced Algorithms & Complexity</div>
                  <div className="text-[11px] text-slate-500">Hall 302 · Mon & Thu: 09:00 AM</div>
                </div>
                <button
                  onClick={() => onSelectTab('mark-attendance')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold"
                >
                  Mark Roster
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs font-bold text-cyan-700">CS601-L (Laboratory)</div>
                  <div className="text-xs font-bold text-slate-900">Advanced Algorithms Lab</div>
                  <div className="text-[11px] text-slate-500">Computing Lab 4B · Mon: 11:30 AM</div>
                </div>
                <button
                  onClick={() => onSelectTab('mark-attendance')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                >
                  Mark Roster
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Enrolled Student Roster
            </h3>
            <div className="divide-y divide-slate-100">
              {students.map((st) => (
                <div key={st.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{st.name}</div>
                    <div className="font-mono text-[11px] text-slate-500">{st.studentId}</div>
                  </div>
                  <span className="font-mono text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                    Sem 6
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Mark Attendance Tab
  if (currentTab === 'mark-attendance') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Attendance Entry & Lecture Logging
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Log student attendance for lectures and laboratories. Values update student records immediately.
          </p>
        </div>

        {attendanceSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold">
              Attendance session saved successfully! Student percentages updated in database.
            </span>
          </div>
        )}

        <form onSubmit={handleSaveAttendance} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Course
              </label>
              <select
                value={selectedCourseCode}
                onChange={(e) => setSelectedCourseCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium focus:border-blue-500"
              >
                <option value="CS601">CS601 - Advanced Algorithms & Complexity</option>
                <option value="CS602">CS602 - Distributed Cloud Systems</option>
                <option value="CS603">CS603 - Database Engineering & Storage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lecture Date
              </label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
              />
            </div>
          </div>

          {/* Student attendance list */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider pb-1">
              <span>Student Details</span>
              <span>Attendance Status</span>
            </div>

            {students.map((st) => {
              const currentStatus = studentStatusMap[st.id] || 'present';

              return (
                <div
                  key={st.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{st.name}</div>
                    <div className="font-mono text-[11px] text-slate-500">
                      Roll No: {st.studentId} · {st.department}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setStudentStatusMap({ ...studentStatusMap, [st.id]: 'present' })
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        currentStatus === 'present'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setStudentStatusMap({ ...studentStatusMap, [st.id]: 'absent' })
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        currentStatus === 'absent'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Total session students: {students.length}
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs cursor-pointer"
            >
              Save Attendance Record
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. Manage Assignments & Materials
  if (currentTab === 'manage-assignments') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Assignment Management & Study Notes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish course problem sets, inspect student submissions, and upload reference slide decks
          </p>
        </div>

        {/* Create Assignment Form */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Plus className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Create New Course Assignment</h3>
          </div>

          {asgSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Assignment created! Students can now submit their solutions.</span>
            </div>
          )}

          <form onSubmit={handleCreateAssignment} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Graph Cut and Dynamic Programming Lab 4"
                  value={asgTitle}
                  onChange={(e) => setAsgTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Max Marks
                </label>
                <input
                  type="number"
                  required
                  value={asgMaxMarks}
                  onChange={(e) => setAsgMaxMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instructions & Specification Details
              </label>
              <textarea
                rows={3}
                required
                placeholder="Detail algorithms to implement, test cases required, and formatting guidelines..."
                value={asgDesc}
                onChange={(e) => setAsgDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Submission Deadline
                </label>
                <input
                  type="datetime-local"
                  required
                  value={asgDeadline}
                  onChange={(e) => setAsgDeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                Publish Assignment to Students
              </button>
            </div>
          </form>
        </div>

        {/* Student Submissions List & Grading */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50/75 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Received Student Submissions</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {submissions.length} Submissions Logged
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{sub.studentName}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {sub.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-600">
                    File: <strong>{sub.fileName}</strong>
                  </div>
                  {sub.comments && (
                    <div className="text-[11px] text-slate-500 italic">"{sub.comments}"</div>
                  )}
                  {sub.marksAwarded !== undefined && (
                    <div className="text-xs text-blue-700 font-bold font-mono">
                      Graded: {sub.marksAwarded} marks
                    </div>
                  )}
                </div>

                {/* Grade action */}
                <div>
                  {gradingSubId === sub.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Marks"
                        value={gradeMarks}
                        onChange={(e) => setGradeMarks(Number(e.target.value))}
                        className="w-20 px-2 py-1 text-xs border border-slate-300 rounded-lg"
                      />
                      <button
                        onClick={() => handleGradeSubmit(sub.id)}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setGradingSubId(null)}
                        className="px-2 py-1 text-slate-500 text-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setGradingSubId(sub.id);
                        setGradeMarks(sub.marksAwarded || 45);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-xs font-semibold text-slate-700"
                    >
                      {sub.status === 'Graded' ? 'Edit Grade' : 'Grade Submission'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Study Material Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Upload className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm font-bold text-slate-900">Upload Course Slide Deck / Notes</h3>
          </div>

          {matSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Study material uploaded to student repository!</span>
            </div>
          )}

          <form onSubmit={handleAddMaterial} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lecture 14: Amortized Analysis & Splay Trees"
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject Code
                </label>
                <select
                  value={matSubject}
                  onChange={(e) => setMatSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                >
                  <option value="CS601">CS601 - Advanced Algorithms</option>
                  <option value="CS602">CS602 - Distributed Cloud</option>
                  <option value="CS603">CS603 - Database Engineering</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description / Topic Summary
              </label>
              <textarea
                rows={2}
                placeholder="Covers accounting method, potential function, and binary counter proofs..."
                value={matDesc}
                onChange={(e) => setMatDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
              >
                Upload to Student Notes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 4. Review Leaves Tab
  if (currentTab === 'review-leaves') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Review Student Leave Applications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Approve or reject leave requests. Approvals automatically grant attendance credits for official university absences.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50/75 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">
              Department Leave Pipeline ({leaves.length} Total Requests)
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {leaves.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No leave requests found.
              </div>
            ) : (
              leaves.map((leave) => {
                const isPending = leave.status === 'Pending';
                const comment = leaveComments[leave.id] || '';

                return (
                  <div key={leave.id} className="p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            {leave.studentName}
                          </span>
                          <span className="font-mono text-xs text-slate-500">
                            ({leave.studentRoll})
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                            {leave.leaveType}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Duration: {leave.startDate} to {leave.endDate} · {leave.department}
                        </div>
                      </div>

                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-md self-start sm:self-auto ${
                          leave.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : leave.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {leave.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <strong>Reason:</strong> {leave.reason}
                    </p>

                    {leave.reviewerComment && (
                      <div className="text-xs text-slate-500 italic">
                        Decision remark by {leave.reviewedBy}: "{leave.reviewerComment}"
                      </div>
                    )}

                    {/* Review Actions if pending */}
                    {isPending && (
                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          placeholder="Add advisor review remark (optional)..."
                          value={comment}
                          onChange={(e) =>
                            setLeaveComments({ ...leaveComments, [leave.id]: e.target.value })
                          }
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-xl"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateLeaveStatus(
                                leave.id,
                                'Approved',
                                user?.name || 'Prof. Elena Rostova',
                                comment || 'Approved by Faculty Advisor.'
                              )
                            }
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                          >
                            Approve Leave
                          </button>
                          <button
                            onClick={() =>
                              updateLeaveStatus(
                                leave.id,
                                'Rejected',
                                user?.name || 'Prof. Elena Rostova',
                                comment || 'Declined. Insufficient notice.'
                              )
                            }
                            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // 5. Circulars / Announcements Tab
  if (currentTab === 'announcements') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Broadcast Circulars & Notices
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish academic notices to student dashboards across your departments
          </p>
        </div>

        {annSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Notice posted to the college announcement board!</span>
          </div>
        )}

        <form onSubmit={handlePostAnnouncement} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notice Headline
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Schedule for CS601 Lab Practical Vivas"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notice Category
              </label>
              <select
                value={annCategory}
                onChange={(e) => setAnnCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
              >
                <option value="Academic">Academic</option>
                <option value="Examination">Examination</option>
                <option value="Campus Life">Campus Life</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notice Full Body Text
            </label>
            <textarea
              rows={4}
              required
              placeholder="State the instructions, batch wise schedules, room locations, or requirements..."
              value={annContent}
              onChange={(e) => setAnnContent(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
            >
              Broadcast Notice
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Fallback / Profile
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-bold text-slate-900">Faculty Credentials & Office Details</h2>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg">
            ER
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{user?.name || 'Prof. Elena Rostova'}</h3>
            <div className="text-xs text-blue-600">Associate Professor & Research Chair</div>
            <div className="text-[11px] text-slate-500">Dept. of Computer Science & Engineering</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Office Cabin</span>
            <span className="font-semibold text-slate-800">Academic Tower, Room 412</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Office Hours</span>
            <span className="font-semibold text-slate-800">Mon & Thu: 2:00 PM - 4:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
