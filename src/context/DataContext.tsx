import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AttendanceRecord,
  SubjectResult,
  Assignment,
  AssignmentSubmission,
  StudyMaterial,
  Announcement,
  CampusEvent,
  TimetableSlot,
  FacultyMember,
  LeaveRequest,
  ContactMessage,
  Course,
  User,
} from '../types';
import { storage } from '../services/storage';

interface DataContextType {
  // Users & Courses
  users: User[];
  courses: Course[];
  addUser: (user: Omit<User, 'id'>) => void;
  deleteUser: (id: string) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  deleteCourse: (id: string) => void;

  // Attendance
  attendance: AttendanceRecord[];
  getAttendanceForStudent: (studentId: string) => AttendanceRecord[];
  markAttendance: (subjectCode: string, studentIds: string[], status: 'present' | 'absent') => void;

  // Results
  results: SubjectResult[];
  getResultsForStudent: (studentId: string) => SubjectResult[];
  addOrUpdateResult: (result: Omit<SubjectResult, 'id'>) => void;

  // Assignments & Submissions
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  createAssignment: (data: Omit<Assignment, 'id'>) => void;
  deleteAssignment: (id: string) => void;
  submitAssignment: (assignmentId: string, studentId: string, studentName: string, fileName: string, comments?: string) => void;
  gradeSubmission: (submissionId: string, marks: number, feedback: string) => void;

  // Study Materials
  materials: StudyMaterial[];
  addMaterial: (data: Omit<StudyMaterial, 'id'>) => void;
  deleteMaterial: (id: string) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (data: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;

  // Events
  events: CampusEvent[];
  addEvent: (data: Omit<CampusEvent, 'id'>) => void;
  deleteEvent: (id: string) => void;
  toggleEventRegistration: (eventId: string, userId: string) => void;

  // Timetable
  timetable: TimetableSlot[];
  addTimetableSlot: (data: Omit<TimetableSlot, 'id'>) => void;
  deleteTimetableSlot: (id: string) => void;

  // Faculty Directory
  faculty: FacultyMember[];

  // Leave Requests
  leaves: LeaveRequest[];
  submitLeaveRequest: (data: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>) => void;
  updateLeaveStatus: (leaveId: string, status: 'Approved' | 'Rejected', reviewerName: string, comment?: string) => void;

  // Contact Messages
  contactMessages: ContactMessage[];
  submitContactMessage: (name: string, email: string, subject: string, message: string) => void;
  markContactReplied: (id: string) => void;

  // Reset
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [results, setResults] = useState<SubjectResult[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // Load on mount
  useEffect(() => {
    refreshAll();
  }, []);

  const refreshAll = () => {
    setUsers(storage.getUsers());
    setCourses(storage.getCourses());
    setAttendance(storage.getAttendance());
    setResults(storage.getResults());
    setAssignments(storage.getAssignments());
    setSubmissions(storage.getSubmissions());
    setMaterials(storage.getMaterials());
    setAnnouncements(storage.getAnnouncements());
    setEvents(storage.getEvents());
    setTimetable(storage.getTimetable());
    setFaculty(storage.getFaculty());
    setLeaves(storage.getLeaves());
    setContactMessages(storage.getContacts());
  };

  // User management
  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = { ...userData, id: `user_${Date.now()}` };
    const updated = [...users, newUser];
    setUsers(updated);
    storage.saveUsers(updated);
  };

  const deleteUser = (id: string) => {
    const updated = users.filter((u) => u.id !== id);
    setUsers(updated);
    storage.saveUsers(updated);
  };

  // Course management
  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = { ...courseData, id: `c_${Date.now()}` };
    const updated = [...courses, newCourse];
    setCourses(updated);
    storage.saveCourses(updated);
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    storage.saveCourses(updated);
  };

  // Attendance
  const getAttendanceForStudent = (studentId: string) => {
    return attendance.filter((a) => a.studentId === studentId);
  };

  const markAttendance = (subjectCode: string, studentIds: string[], status: 'present' | 'absent') => {
    const updated = attendance.map((rec) => {
      if (rec.subjectCode === subjectCode && studentIds.includes(rec.studentId)) {
        const total = rec.totalClasses + 1;
        const attended = status === 'present' ? rec.attendedClasses + 1 : rec.attendedClasses;
        return {
          ...rec,
          totalClasses: total,
          attendedClasses: attended,
          lastUpdated: 'Today, Just now',
        };
      }
      return rec;
    });
    setAttendance(updated);
    storage.saveAttendance(updated);
  };

  // Results
  const getResultsForStudent = (studentId: string) => {
    return results.filter((r) => r.studentId === studentId);
  };

  const addOrUpdateResult = (resData: Omit<SubjectResult, 'id'>) => {
    const existingIndex = results.findIndex(
      (r) => r.studentId === resData.studentId && r.subjectCode === resData.subjectCode && r.semester === resData.semester
    );
    let updated: SubjectResult[];
    if (existingIndex >= 0) {
      updated = [...results];
      updated[existingIndex] = { ...resData, id: results[existingIndex].id };
    } else {
      updated = [...results, { ...resData, id: `res_${Date.now()}` }];
    }
    setResults(updated);
    storage.saveResults(updated);
  };

  // Assignments & Submissions
  const createAssignment = (data: Omit<Assignment, 'id'>) => {
    const newAssignment: Assignment = { ...data, id: `asg_${Date.now()}` };
    const updated = [newAssignment, ...assignments];
    setAssignments(updated);
    storage.saveAssignments(updated);
  };

  const deleteAssignment = (id: string) => {
    const updated = assignments.filter((a) => a.id !== id);
    setAssignments(updated);
    storage.saveAssignments(updated);
  };

  const submitAssignment = (
    assignmentId: string,
    studentId: string,
    studentName: string,
    fileName: string,
    comments?: string
  ) => {
    const existingIndex = submissions.findIndex(
      (s) => s.assignmentId === assignmentId && s.studentId === studentId
    );
    let updated: AssignmentSubmission[];
    if (existingIndex >= 0) {
      updated = [...submissions];
      updated[existingIndex] = {
        ...updated[existingIndex],
        fileName,
        comments,
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
      };
    } else {
      const newSub: AssignmentSubmission = {
        id: `sub_${Date.now()}`,
        assignmentId,
        studentId,
        studentName,
        fileName,
        comments,
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
      };
      updated = [newSub, ...submissions];
    }
    setSubmissions(updated);
    storage.saveSubmissions(updated);
  };

  const gradeSubmission = (submissionId: string, marks: number, feedback: string) => {
    const updated = submissions.map((s) => {
      if (s.id === submissionId) {
        return {
          ...s,
          marksAwarded: marks,
          feedback,
          status: 'Graded' as const,
        };
      }
      return s;
    });
    setSubmissions(updated);
    storage.saveSubmissions(updated);
  };

  // Study Materials
  const addMaterial = (data: Omit<StudyMaterial, 'id'>) => {
    const newMat: StudyMaterial = { ...data, id: `mat_${Date.now()}` };
    const updated = [newMat, ...materials];
    setMaterials(updated);
    storage.saveMaterials(updated);
  };

  const deleteMaterial = (id: string) => {
    const updated = materials.filter((m) => m.id !== id);
    setMaterials(updated);
    storage.saveMaterials(updated);
  };

  // Announcements
  const addAnnouncement = (data: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = { ...data, id: `ann_${Date.now()}` };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    storage.saveAnnouncements(updated);
  };

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    storage.saveAnnouncements(updated);
  };

  // Events
  const addEvent = (data: Omit<CampusEvent, 'id'>) => {
    const newEvt: CampusEvent = { ...data, id: `evt_${Date.now()}` };
    const updated = [newEvt, ...events];
    setEvents(updated);
    storage.saveEvents(updated);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    storage.saveEvents(updated);
  };

  const toggleEventRegistration = (eventId: string, userId: string) => {
    const updated = events.map((e) => {
      if (e.id === eventId) {
        const isRegistered = e.registeredUserIds.includes(userId);
        const registeredUserIds = isRegistered
          ? e.registeredUserIds.filter((id) => id !== userId)
          : [...e.registeredUserIds, userId];
        return { ...e, registeredUserIds };
      }
      return e;
    });
    setEvents(updated);
    storage.saveEvents(updated);
  };

  // Timetable
  const addTimetableSlot = (data: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = { ...data, id: `tt_${Date.now()}` };
    const updated = [...timetable, newSlot];
    setTimetable(updated);
    storage.saveTimetable(updated);
  };

  const deleteTimetableSlot = (id: string) => {
    const updated = timetable.filter((t) => t.id !== id);
    setTimetable(updated);
    storage.saveTimetable(updated);
  };

  // Leaves
  const submitLeaveRequest = (data: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>) => {
    const newLeave: LeaveRequest = {
      ...data,
      id: `leave_${Date.now()}`,
      status: 'Pending',
      submittedAt: new Date().toISOString(),
    };
    const updated = [newLeave, ...leaves];
    setLeaves(updated);
    storage.saveLeaves(updated);
  };

  const updateLeaveStatus = (
    leaveId: string,
    status: 'Approved' | 'Rejected',
    reviewerName: string,
    comment?: string
  ) => {
    const updated = leaves.map((l) => {
      if (l.id === leaveId) {
        return {
          ...l,
          status,
          reviewedBy: reviewerName,
          reviewerComment: comment || (status === 'Approved' ? 'Application reviewed and approved.' : 'Application declined.'),
        };
      }
      return l;
    });
    setLeaves(updated);
    storage.saveLeaves(updated);
  };

  // Contact Inquiries
  const submitContactMessage = (name: string, email: string, subject: string, message: string) => {
    const newContact: ContactMessage = {
      id: `cnt_${Date.now()}`,
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      status: 'New',
    };
    const updated = [newContact, ...contactMessages];
    setContactMessages(updated);
    storage.saveContacts(updated);
  };

  const markContactReplied = (id: string) => {
    const updated = contactMessages.map((c) => (c.id === id ? { ...c, status: 'Replied' as const } : c));
    setContactMessages(updated);
    storage.saveContacts(updated);
  };

  const resetData = () => {
    storage.resetToDefaults();
    refreshAll();
  };

  return (
    <DataContext.Provider
      value={{
        users,
        courses,
        addUser,
        deleteUser,
        addCourse,
        deleteCourse,
        attendance,
        getAttendanceForStudent,
        markAttendance,
        results,
        getResultsForStudent,
        addOrUpdateResult,
        assignments,
        submissions,
        createAssignment,
        deleteAssignment,
        submitAssignment,
        gradeSubmission,
        materials,
        addMaterial,
        deleteMaterial,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        events,
        addEvent,
        deleteEvent,
        toggleEventRegistration,
        timetable,
        addTimetableSlot,
        deleteTimetableSlot,
        faculty,
        leaves,
        submitLeaveRequest,
        updateLeaveStatus,
        contactMessages,
        submitContactMessage,
        markContactReplied,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
