import React, { useState } from 'react';
import {
  Users,
  BookOpen,
  Bell,
  Calendar,
  Mail,
  Plus,
  Trash2,
  Search,
  Shield,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Building,
  GraduationCap,
  Briefcase,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { User, Course, CampusEvent, Announcement } from '../../types';

interface AdminDashboardProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentTab, onSelectTab }) => {
  const { user } = useAuth();
  const {
    users,
    addUser,
    deleteUser,
    courses,
    addCourse,
    deleteCourse,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    events,
    addEvent,
    deleteEvent,
    contactMessages,
    markContactReplied,
    resetData,
  } = useData();

  // Confirmation Modal State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'user' | 'course' | 'announcement' | 'event';
    id: string;
    title: string;
  } | null>(null);

  // Add User State
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'student' | 'faculty'>('student');
  const [newUserDept, setNewUserDept] = useState('Computer Science & Engineering');
  const [newUserRoll, setNewUserRoll] = useState('');

  // Add Course State
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDept, setNewCourseDept] = useState('Computer Science & Engineering');
  const [newCourseCredits, setNewCourseCredits] = useState(4);
  const [newCourseFaculty, setNewCourseFaculty] = useState('Prof. Elena Rostova');

  // Add Event State
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [newEvtTitle, setNewEvtTitle] = useState('');
  const [newEvtCat, setNewEvtCat] = useState<'Technical' | 'Cultural' | 'Sports' | 'Seminar'>('Technical');
  const [newEvtDate, setNewEvtDate] = useState('Nov 28, 2026');
  const [newEvtTime, setNewEvtTime] = useState('10:00 AM - 04:00 PM');
  const [newEvtVenue, setNewEvtVenue] = useState('Auditorium Hall B');
  const [newEvtCap, setNewEvtCap] = useState(300);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Handlers
  const handleConfirmDelete = () => {
    if (!deleteConfirmation) return;
    if (deleteConfirmation.type === 'user') deleteUser(deleteConfirmation.id);
    if (deleteConfirmation.type === 'course') deleteCourse(deleteConfirmation.id);
    if (deleteConfirmation.type === 'announcement') deleteAnnouncement(deleteConfirmation.id);
    if (deleteConfirmation.type === 'event') deleteEvent(deleteConfirmation.id);
    setDeleteConfirmation(null);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    addUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      department: newUserDept,
      studentId: newUserRole === 'student' ? newUserRoll || `2026CS${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      facultyId: newUserRole === 'faculty' ? `FAC-CS-${Math.floor(10 + Math.random() * 90)}` : undefined,
      course: newUserRole === 'student' ? 'B.Tech Computer Science' : undefined,
      semester: 1,
    });

    setUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRoll('');
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim() || !newCourseName.trim()) return;

    addCourse({
      code: newCourseCode.trim().toUpperCase(),
      name: newCourseName.trim(),
      department: newCourseDept,
      credits: newCourseCredits,
      semester: 6,
      facultyInCharge: newCourseFaculty,
    });

    setCourseModalOpen(false);
    setNewCourseCode('');
    setNewCourseName('');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvtTitle.trim()) return;

    addEvent({
      title: newEvtTitle.trim(),
      description: 'Official university sponsored campus activity open to all enrolled students and faculty members.',
      category: newEvtCat,
      date: newEvtDate,
      time: newEvtTime,
      venue: newEvtVenue,
      organizer: 'University Student Welfare Council',
      registeredUserIds: [],
      capacity: newEvtCap,
    });

    setEventModalOpen(false);
    setNewEvtTitle('');
  };

  const studentsCount = users.filter((u) => u.role === 'student').length;
  const facultyCount = users.filter((u) => u.role === 'faculty').length;

  // 1. Overview Tab
  if (currentTab === 'overview') {
    return (
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Campus Administration & Governance Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Executive Console · Dean Arthur Pendelton
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Academic affairs management, student registries, institutional circulars, and departmental metrics.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-4">
            <button
              onClick={() => onSelectTab('manage-users')}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Manage Students & Faculty
            </button>
            <button
              onClick={() => onSelectTab('contact-inbox')}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Inquiries Inbox ({contactMessages.length})
            </button>
            <button
              onClick={resetData}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Seed Data</span>
            </button>
          </div>
        </div>

        {/* High-Level Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onSelectTab('manage-users')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Students
              </span>
              <GraduationCap className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {studentsCount}
            </div>
            <div className="text-xs text-slate-500 mt-1">Enrolled across departments</div>
          </div>

          <div
            onClick={() => onSelectTab('manage-users')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Faculty Members
              </span>
              <Briefcase className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {facultyCount}
            </div>
            <div className="text-xs text-slate-500 mt-1">Active professors & lecturers</div>
          </div>

          <div
            onClick={() => onSelectTab('manage-courses')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Courses
              </span>
              <BookOpen className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 font-mono">
              {courses.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">Accredited curriculum subjects</div>
          </div>

          <div
            onClick={() => onSelectTab('contact-inbox')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Inquiries Received
              </span>
              <Mail className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-amber-600 font-mono">
              {contactMessages.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">Submitted from website form</div>
          </div>
        </div>

        {/* Department Enrollment Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Department Academic Distribution
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Computer Science & Engineering', students: 480, faculty: 18, pct: 40 },
                { name: 'Electrical & Electronics Engineering', students: 310, faculty: 12, pct: 26 },
                { name: 'School of Business Administration', students: 250, faculty: 9, pct: 21 },
                { name: 'Mechanical & Materials Engineering', students: 160, faculty: 7, pct: 13 },
              ].map((dept, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{dept.name}</span>
                    <span className="font-mono text-blue-600">{dept.students} Students</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dept.pct}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{dept.faculty} Faculty Chairs</span>
                    <span>{dept.pct}% collegiate share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Recent System Activity
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-blue-900 space-y-1">
                <div className="font-semibold">Spring Semester Examination Hall Tickets</div>
                <p className="text-[11px] text-blue-800">Generated for all 1,200 eligible students with &gt;= 75% attendance.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">Faculty Course Syllabus Uploads</div>
                <p className="text-[11px] text-slate-500">4 new study decks posted across CS601 and CS602.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 space-y-1">
                <div className="font-semibold text-slate-900">Annual InnovateX Hackathon</div>
                <p className="text-[11px] text-slate-500">Venue reservation locked for Central Academic Quad.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Manage Users Tab
  if (currentTab === 'manage-users') {
    const filteredUsers = users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Student & Faculty User Management
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add new student registrations, faculty appointments, or remove deactivated accounts
            </p>
          </div>

          <button
            onClick={() => setUserModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute inset-y-0 left-3 my-auto pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, email, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-blue-500"
            />
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {filteredUsers.length} Users Listed
          </span>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Name & Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Identifier / Roll No</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-[11px] font-mono text-slate-500">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                          u.role === 'admin'
                            ? 'bg-slate-900 text-white'
                            : u.role === 'faculty'
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{u.department}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {u.studentId || u.facultyId || 'ADM-001'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() =>
                            setDeleteConfirmation({
                              type: 'user',
                              id: u.id,
                              title: `${u.name} (${u.role})`,
                            })
                          }
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // 3. Manage Courses Tab
  if (currentTab === 'manage-courses') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Courses & Academic Curriculum
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure course offerings, semester credit weights, and assign faculty chairs
            </p>
          </div>

          <button
            onClick={() => setCourseModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Course</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{course.name}</h3>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {course.credits} Credits · Sem {course.semester}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{course.description}</p>
                  <div className="text-[11px] text-slate-400">
                    Faculty in charge: <strong className="text-slate-700">{course.facultyInCharge}</strong> · {course.department}
                  </div>
                </div>

                <button
                  onClick={() =>
                    setDeleteConfirmation({
                      type: 'course',
                      id: course.id,
                      title: `${course.code}: ${course.name}`,
                    })
                  }
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer self-start sm:self-auto"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. Contact Inquiries Inbox
  if (currentTab === 'contact-inbox') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Administrative Inquiries Inbox
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Public queries submitted via the CampusConnect homepage contact form
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50/75 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">
              Inquiry Records ({contactMessages.length} Messages)
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {contactMessages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                No inquiries submitted yet. Submit a message from the homepage to test!
              </div>
            ) : (
              contactMessages.map((msg) => (
                <div key={msg.id} className="p-5 space-y-3 hover:bg-slate-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{msg.name}</span>
                        <span className="text-xs font-mono text-slate-500">({msg.email})</span>
                      </div>
                      <div className="text-xs font-semibold text-blue-600 mt-0.5">
                        {msg.subject}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400">
                        {new Date(msg.submittedAt).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          msg.status === 'Replied'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {msg.message}
                  </p>

                  {msg.status === 'New' && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => markContactReplied(msg.id)}
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                      >
                        Mark as Replied
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback / Admin Profile
  return (
    <div className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-bold text-slate-900">Administrator Console Credentials</h2>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center text-lg">
            AP
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Dean Arthur Pendelton</h3>
            <div className="text-xs text-blue-600">Dean of Academic Affairs & Admissions</div>
            <div className="text-[11px] text-slate-500">Office of Central College Administration</div>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
          Administrator has full clearance across student enrollment, grading verification, faculty rosters, and college circular broadcasts.
        </div>
      </div>

      {/* Confirmation Dialog Modal for destructive actions */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-slate-900">Confirm Deletion</h4>
              <p className="text-xs text-slate-500">
                Are you sure you want to delete <strong>{deleteConfirmation.title}</strong>? This action will remove the record from local persistence.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {userModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">Add New User</h4>
              <button onClick={() => setUserModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Taylor"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="liam.t@campus.edu"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Roll / Faculty ID</label>
                  <input
                    type="text"
                    placeholder="e.g. 2026CS9090"
                    value={newUserRoll}
                    onChange={(e) => setNewUserRoll(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <h4 className="text-base font-bold text-slate-900">Add New Course</h4>
              <button onClick={() => setCourseModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS605"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Credits</label>
                  <input
                    type="number"
                    required
                    value={newCourseCredits}
                    onChange={(e) => setNewCourseCredits(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cyber Security & Cryptography"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Faculty In Charge</label>
                <input
                  type="text"
                  required
                  value={newCourseFaculty}
                  onChange={(e) => setNewCourseFaculty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCourseModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
