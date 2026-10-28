export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department: string;
  studentId?: string;
  facultyId?: string;
  course?: string;
  semester?: number;
  phone?: string;
  bio?: string;
  emergencyContact?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  subjectCode: string;
  subjectName: string;
  totalClasses: number;
  attendedClasses: number;
  lastUpdated: string;
}

export interface SubjectResult {
  id: string;
  studentId: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  credits: number;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grade: string;
  gradePoint: number;
  status: 'Pass' | 'Fail';
}

export interface Assignment {
  id: string;
  courseId: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  deadline: string;
  maxMarks: number;
  createdByFacultyId: string;
  facultyName: string;
  resourceFileName?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  fileName: string;
  comments?: string;
  marksAwarded?: number;
  feedback?: string;
  status: 'Submitted' | 'Graded';
}

export interface StudyMaterial {
  id: string;
  subjectCode: string;
  subjectName: string;
  title: string;
  description: string;
  uploadedBy: string;
  date: string;
  fileType: string;
  fileSize: string;
  downloadUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Examination' | 'Campus Life' | 'Administrative';
  date: string;
  author: string;
  isPinned?: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Cultural' | 'Sports' | 'Seminar';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  registeredUserIds: string[];
  capacity: number;
  image?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  room: string;
  department: string;
  semester: number;
}

export interface FacultyMember {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  qualification: string;
  officeRoom: string;
  officeHours: string;
  phone: string;
  avatar?: string;
  specialization: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  department: string;
  leaveType: 'Medical' | 'Personal' | 'Academic' | 'Other';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  reviewedBy?: string;
  reviewerComment?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Replied';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  semester: number;
  facultyInCharge: string;
  description?: string;
}
