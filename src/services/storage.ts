import {
  User,
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
} from '../types';

const STORAGE_KEYS = {
  USERS: 'campusconnect_users',
  ATTENDANCE: 'campusconnect_attendance',
  RESULTS: 'campusconnect_results',
  ASSIGNMENTS: 'campusconnect_assignments',
  SUBMISSIONS: 'campusconnect_submissions',
  MATERIALS: 'campusconnect_materials',
  ANNOUNCEMENTS: 'campusconnect_announcements',
  EVENTS: 'campusconnect_events',
  TIMETABLE: 'campusconnect_timetable',
  FACULTY: 'campusconnect_faculty',
  LEAVES: 'campusconnect_leaves',
  CONTACTS: 'campusconnect_contacts',
  COURSES: 'campusconnect_courses',
  CURRENT_USER: 'campusconnect_auth_user',
};

// Initial Seed Data
const INITIAL_USERS: User[] = [
  {
    id: 'user_student_1',
    name: 'Alex Mercer',
    email: 'student@campus.edu',
    role: 'student',
    studentId: '2024CS1042',
    department: 'Computer Science & Engineering',
    course: 'B.Tech Computer Science',
    semester: 6,
    phone: '+1 (555) 234-5678',
    bio: 'Junior CSE undergrad interested in distributed systems, algorithmic engineering, and web infrastructure.',
    emergencyContact: 'Mrs. Karen Mercer (+1 555-890-1234)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user_student_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@campus.edu',
    role: 'student',
    studentId: '2024CS1043',
    department: 'Computer Science & Engineering',
    course: 'B.Tech Computer Science',
    semester: 6,
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user_student_3',
    name: 'Marcus Chen',
    email: 'marcus.chen@campus.edu',
    role: 'student',
    studentId: '2024CS1044',
    department: 'Computer Science & Engineering',
    course: 'B.Tech Computer Science',
    semester: 6,
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user_faculty_1',
    name: 'Prof. Elena Rostova',
    email: 'faculty@campus.edu',
    role: 'faculty',
    facultyId: 'FAC-CS-018',
    department: 'Computer Science & Engineering',
    phone: '+1 (555) 888-9901',
    bio: 'Associate Professor specializing in Advanced Algorithms, Computational Theory, and Parallel Architectures.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'user_admin_1',
    name: 'Dean Arthur Pendelton',
    email: 'admin@campus.edu',
    role: 'admin',
    department: 'Academic Administration',
    phone: '+1 (555) 999-0012',
    bio: 'Dean of Academic Affairs overseeing curriculum governance, student welfare, and faculty operations.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
];

const INITIAL_COURSES: Course[] = [
  { id: 'c1', code: 'CS601', name: 'Advanced Algorithms & Complexity', department: 'Computer Science & Engineering', credits: 4, semester: 6, facultyInCharge: 'Prof. Elena Rostova', description: 'Dynamic programming, amortized analysis, graph algorithms, and NP-completeness.' },
  { id: 'c2', code: 'CS602', name: 'Distributed Cloud Systems', department: 'Computer Science & Engineering', credits: 3, semester: 6, facultyInCharge: 'Dr. Alan Wright', description: 'Consensus protocols, microservices, container orchestration, and cloud architecture.' },
  { id: 'c3', code: 'CS603', name: 'Database Engineering & Storage', department: 'Computer Science & Engineering', credits: 4, semester: 6, facultyInCharge: 'Prof. Sophia Bennett', description: 'Query optimization, B+ Tree indexing, distributed transactions, and replication.' },
  { id: 'c4', code: 'CS604', name: 'Machine Learning & Neural Networks', department: 'Computer Science & Engineering', credits: 4, semester: 6, facultyInCharge: 'Dr. Vikram Nair', description: 'Gradient descent, convolutional networks, transformers, and regularization.' },
  { id: 'c5', code: 'HS601', name: 'Professional Ethics & Tech Leadership', department: 'Humanities & Social Sciences', credits: 2, semester: 6, facultyInCharge: 'Prof. Rachel Torres', description: 'Tech compliance, intellectual property, corporate governance, and team leadership.' },
];

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: 'att_1', studentId: 'user_student_1', subjectCode: 'CS601', subjectName: 'Advanced Algorithms & Complexity', totalClasses: 42, attendedClasses: 38, lastUpdated: 'Today, 11:30 AM' },
  { id: 'att_2', studentId: 'user_student_1', subjectCode: 'CS602', subjectName: 'Distributed Cloud Systems', totalClasses: 36, attendedClasses: 31, lastUpdated: 'Yesterday, 02:15 PM' },
  { id: 'att_3', studentId: 'user_student_1', subjectCode: 'CS603', subjectName: 'Database Engineering & Storage', totalClasses: 40, attendedClasses: 33, lastUpdated: 'Oct 26, 2026' },
  { id: 'att_4', studentId: 'user_student_1', subjectCode: 'CS604', subjectName: 'Machine Learning & Neural Networks', totalClasses: 35, attendedClasses: 28, lastUpdated: 'Oct 25, 2026' },
  { id: 'att_5', studentId: 'user_student_1', subjectCode: 'HS601', subjectName: 'Professional Ethics & Tech Leadership', totalClasses: 20, attendedClasses: 17, lastUpdated: 'Oct 24, 2026' },
];

const INITIAL_RESULTS: SubjectResult[] = [
  { id: 'res_1', studentId: 'user_student_1', semester: 5, subjectCode: 'CS501', subjectName: 'Software Engineering Architecture', credits: 4, internalMarks: 29, externalMarks: 65, totalMarks: 94, grade: 'A+', gradePoint: 10, status: 'Pass' },
  { id: 'res_2', studentId: 'user_student_1', semester: 5, subjectCode: 'CS502', subjectName: 'Computer Networks & Security', credits: 4, internalMarks: 26, externalMarks: 61, totalMarks: 87, grade: 'A', gradePoint: 9, status: 'Pass' },
  { id: 'res_3', studentId: 'user_student_1', semester: 5, subjectCode: 'CS503', subjectName: 'Web & API Systems Engineering', credits: 3, internalMarks: 28, externalMarks: 62, totalMarks: 90, grade: 'A+', gradePoint: 10, status: 'Pass' },
  { id: 'res_4', studentId: 'user_student_1', semester: 5, subjectCode: 'CS504', subjectName: 'Operating Systems & Kernels', credits: 4, internalMarks: 24, externalMarks: 58, totalMarks: 82, grade: 'A', gradePoint: 9, status: 'Pass' },
  { id: 'res_5', studentId: 'user_student_1', semester: 5, subjectCode: 'MA501', subjectName: 'Applied Probability & Linear Algebra', credits: 3, internalMarks: 28, externalMarks: 64, totalMarks: 92, grade: 'A+', gradePoint: 10, status: 'Pass' },
  { id: 'res_6', studentId: 'user_student_1', semester: 4, subjectCode: 'CS401', subjectName: 'Data Structures & Algorithms', credits: 4, internalMarks: 27, externalMarks: 61, totalMarks: 88, grade: 'A', gradePoint: 9, status: 'Pass' },
  { id: 'res_7', studentId: 'user_student_1', semester: 4, subjectCode: 'CS402', subjectName: 'Theory of Computation', credits: 4, internalMarks: 25, externalMarks: 56, totalMarks: 81, grade: 'B+', gradePoint: 8, status: 'Pass' },
];

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_1',
    courseId: 'c1',
    subjectCode: 'CS601',
    subjectName: 'Advanced Algorithms & Complexity',
    title: 'Dynamic Programming & Network Flow Problem Set',
    description: 'Implement Ford-Fulkerson maximum flow algorithm in Python or C++ and benchmark against Edmonds-Karp with dense bipartite matching tests.',
    deadline: '2026-11-10T23:59:00',
    maxMarks: 50,
    createdByFacultyId: 'user_faculty_1',
    facultyName: 'Prof. Elena Rostova',
    resourceFileName: 'CS601_ProblemSet_03_Specification.pdf',
  },
  {
    id: 'asg_2',
    courseId: 'c2',
    subjectCode: 'CS602',
    subjectName: 'Distributed Cloud Systems',
    title: 'Raft Consensus Protocol Leader Election Simulator',
    description: 'Construct a state machine replication mock showing election timeouts, heartbeat broadcasting, and split-brain resolution under simulated packet drop.',
    deadline: '2026-11-16T18:00:00',
    maxMarks: 100,
    createdByFacultyId: 'user_faculty_2',
    facultyName: 'Dr. Alan Wright',
    resourceFileName: 'CS602_Raft_Lab_Guide.pdf',
  },
  {
    id: 'asg_3',
    courseId: 'c3',
    subjectCode: 'CS603',
    subjectName: 'Database Engineering & Storage',
    title: 'B+ Tree Index Concurrency & Lock Escalation',
    description: 'Write an explanatory technical document analyzing multi-granularity lock escalation during simultaneous bulk insertions.',
    deadline: '2026-11-20T23:59:00',
    maxMarks: 50,
    createdByFacultyId: 'user_faculty_3',
    facultyName: 'Prof. Sophia Bennett',
    resourceFileName: 'CS603_Indexing_Specification.pdf',
  },
  {
    id: 'asg_4',
    courseId: 'c1',
    subjectCode: 'CS601',
    subjectName: 'Advanced Algorithms & Complexity',
    title: 'NP-Completeness Reductions Proof Lab',
    description: 'Provide formal polynomial-time reductions for 3-SAT to Vertex Cover and Hamiltonian Path.',
    deadline: '2026-10-22T23:59:00',
    maxMarks: 50,
    createdByFacultyId: 'user_faculty_1',
    facultyName: 'Prof. Elena Rostova',
    resourceFileName: 'CS601_Reductions_Guide.pdf',
  },
];

const INITIAL_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub_1',
    assignmentId: 'asg_4',
    studentId: 'user_student_1',
    studentName: 'Alex Mercer',
    submittedAt: '2026-10-21T19:42:00',
    fileName: 'AlexMercer_2024CS1042_NP_ProofLab.pdf',
    comments: 'Formal reduction proofs included with gadget diagrams.',
    marksAwarded: 48,
    feedback: 'Exceptional mathematical rigor and neat graph gadget diagrams. Well done!',
    status: 'Graded',
  },
];

const INITIAL_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat_1',
    subjectCode: 'CS601',
    subjectName: 'Advanced Algorithms & Complexity',
    title: 'Lecture 12: Network Flow & Max-Flow Min-Cut Theorem',
    description: 'Complete slide deck including residual graph visualizations and duality proofs.',
    uploadedBy: 'Prof. Elena Rostova',
    date: 'Oct 24, 2026',
    fileType: 'PDF',
    fileSize: '4.2 MB',
  },
  {
    id: 'mat_2',
    subjectCode: 'CS602',
    subjectName: 'Distributed Cloud Systems',
    title: 'Consensus Protocols: Paxos vs Raft Architecture Notes',
    description: 'Comparative study note covering leader election, log replication, and safety invariants.',
    uploadedBy: 'Dr. Alan Wright',
    date: 'Oct 22, 2026',
    fileType: 'PDF',
    fileSize: '6.8 MB',
  },
  {
    id: 'mat_3',
    subjectCode: 'CS603',
    subjectName: 'Database Engineering & Storage',
    title: 'WAL (Write-Ahead Logging) & ARIES Recovery Protocol',
    description: 'Detailed breakdown of analysis, redo, and undo passes during database crash recovery.',
    uploadedBy: 'Prof. Sophia Bennett',
    date: 'Oct 18, 2026',
    fileType: 'PDF',
    fileSize: '3.1 MB',
  },
  {
    id: 'mat_4',
    subjectCode: 'CS604',
    subjectName: 'Machine Learning & Neural Networks',
    title: 'Transformer Architecture & Self-Attention Matrix Derivation',
    description: 'Mathematical intuition behind Scaled Dot-Product Attention and Multi-Head projection.',
    uploadedBy: 'Dr. Vikram Nair',
    date: 'Oct 15, 2026',
    fileType: 'PDF',
    fileSize: '8.4 MB',
  },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Spring 2026 Mid-Semester Examination Schedule Published',
    content: 'The mid-semester theoretical and laboratory examinations will commence on November 25, 2026. Hall tickets and seating matrix are available in the Examinations tab. Students must carry valid college ID cards.',
    category: 'Examination',
    date: 'Oct 27, 2026',
    author: 'Controller of Examinations',
    isPinned: true,
  },
  {
    id: 'ann_2',
    title: 'InnovateX 2026: Annual Inter-College Hackathon Registrations Open',
    content: 'CampusConnect is partnering with the Department of Computer Science to sponsor InnovateX 2026. Cash awards of $15,000, cloud credits, and incubation mentorship for top 3 collegiate teams.',
    category: 'Campus Life',
    date: 'Oct 26, 2026',
    author: 'Student Affairs Council',
    isPinned: true,
  },
  {
    id: 'ann_3',
    title: 'Extended Central Library Hours for Mid-Term Preparation',
    content: 'Starting November 1st through December 10th, Central Library reading halls and digital reference cubicles will remain accessible 24/7. Quiet study policies will be strictly enforced.',
    category: 'Academic',
    date: 'Oct 23, 2026',
    author: 'Chief Librarian',
    isPinned: false,
  },
  {
    id: 'ann_4',
    title: 'Mandatory Semester Registration Clearance and Fee Verification',
    content: 'All undergraduate and graduate students must ensure all elective registrations and fee clearance vouchers are submitted through the portal before the 15th of next month.',
    category: 'Administrative',
    date: 'Oct 20, 2026',
    author: 'Registrar Office',
    isPinned: false,
  },
];

const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 'evt_1',
    title: 'InnovateX 2026: 36-Hour Hackathon & Innovation Expo',
    description: 'Build cutting-edge web, AI, and IoT solutions solving real municipal, educational, and sustainability challenges.',
    category: 'Technical',
    date: 'Nov 15 - 16, 2026',
    time: '09:00 AM - 09:00 PM',
    venue: 'Main Academic Quad & Innovation Lab',
    organizer: 'CSE Department & ACM Chapter',
    registeredUserIds: ['user_student_1', 'user_student_2'],
    capacity: 250,
    image: '/src/assets/images/campus_event_hackathon_1793204723165.jpg',
  },
  {
    id: 'evt_2',
    title: 'Distinguished Lecture: Autonomous Agents & Modern Cloud',
    description: 'Keynote by industry fellow on deploying resilient autonomous agent networks across edge data centers.',
    category: 'Seminar',
    date: 'Nov 08, 2026',
    time: '03:00 PM - 05:00 PM',
    venue: 'Sir C.V. Raman Memorial Auditorium',
    organizer: 'Faculty of Engineering & Research',
    registeredUserIds: ['user_student_1'],
    capacity: 350,
    image: '/src/assets/images/hero_college_campus_1793204721254.jpg',
  },
  {
    id: 'evt_3',
    title: 'Inter-Departmental Athletics & Football Tournament',
    description: 'Cheer for your department in track & field, football, basketball, and badminton championships.',
    category: 'Sports',
    date: 'Nov 22 - 24, 2026',
    time: '08:00 AM - 06:00 PM',
    venue: 'University Sports Complex Stadium',
    organizer: 'Department of Physical Education',
    registeredUserIds: [],
    capacity: 600,
  },
  {
    id: 'evt_4',
    title: 'Symphonia 2026: Campus Cultural Music & Arts Fest',
    description: 'An evening of classical fusion, indie band performances, theatrical arts, and culinary exhibitions.',
    category: 'Cultural',
    date: 'Dec 05, 2026',
    time: '05:30 PM - 10:30 PM',
    venue: 'Open Air Amphitheatre',
    organizer: 'Campus Cultural Committee',
    registeredUserIds: ['user_student_1'],
    capacity: 1200,
  },
];

const INITIAL_TIMETABLE: TimetableSlot[] = [
  // Monday
  { id: 'tt_1', day: 'Monday', startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: 'CS601', subjectName: 'Advanced Algorithms', facultyName: 'Prof. Elena Rostova', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_2', day: 'Monday', startTime: '10:15 AM', endTime: '11:15 AM', subjectCode: 'CS602', subjectName: 'Distributed Cloud Systems', facultyName: 'Dr. Alan Wright', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_3', day: 'Monday', startTime: '11:30 AM', endTime: '01:30 PM', subjectCode: 'CS601-L', subjectName: 'Advanced Algorithms Lab', facultyName: 'Prof. Elena Rostova', room: 'Computing Lab 4B', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_4', day: 'Monday', startTime: '02:30 PM', endTime: '03:30 PM', subjectCode: 'CS603', subjectName: 'Database Systems', facultyName: 'Prof. Sophia Bennett', room: 'Hall 208', department: 'Computer Science & Engineering', semester: 6 },

  // Tuesday
  { id: 'tt_5', day: 'Tuesday', startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: 'CS604', subjectName: 'Machine Learning', facultyName: 'Dr. Vikram Nair', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_6', day: 'Tuesday', startTime: '10:15 AM', endTime: '11:15 AM', subjectCode: 'CS601', subjectName: 'Advanced Algorithms', facultyName: 'Prof. Elena Rostova', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_7', day: 'Tuesday', startTime: '11:30 AM', endTime: '12:30 PM', subjectCode: 'HS601', subjectName: 'Ethics & Leadership', facultyName: 'Prof. Rachel Torres', room: 'Seminar Hall B', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_8', day: 'Tuesday', startTime: '01:30 PM', endTime: '03:30 PM', subjectCode: 'CS604-L', subjectName: 'Machine Learning Lab', facultyName: 'Dr. Vikram Nair', room: 'AI & Data Lab 2', department: 'Computer Science & Engineering', semester: 6 },

  // Wednesday
  { id: 'tt_9', day: 'Wednesday', startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: 'CS602', subjectName: 'Distributed Cloud Systems', facultyName: 'Dr. Alan Wright', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_10', day: 'Wednesday', startTime: '10:15 AM', endTime: '11:15 AM', subjectCode: 'CS603', subjectName: 'Database Systems', facultyName: 'Prof. Sophia Bennett', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_11', day: 'Wednesday', startTime: '11:30 AM', endTime: '12:30 PM', subjectCode: 'CS604', subjectName: 'Machine Learning', facultyName: 'Dr. Vikram Nair', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_12', day: 'Wednesday', startTime: '02:00 PM', endTime: '04:00 PM', subjectCode: 'CS603-L', subjectName: 'Database Systems Lab', facultyName: 'Prof. Sophia Bennett', room: 'Database Lab 1', department: 'Computer Science & Engineering', semester: 6 },

  // Thursday
  { id: 'tt_13', day: 'Thursday', startTime: '09:00 AM', endTime: '10:00 AM', subjectCode: 'CS601', subjectName: 'Advanced Algorithms', facultyName: 'Prof. Elena Rostova', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_14', day: 'Thursday', startTime: '10:15 AM', endTime: '11:15 AM', subjectCode: 'CS604', subjectName: 'Machine Learning', facultyName: 'Dr. Vikram Nair', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_15', day: 'Thursday', startTime: '11:30 AM', endTime: '12:30 PM', subjectCode: 'CS602', subjectName: 'Distributed Cloud Systems', facultyName: 'Dr. Alan Wright', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },

  // Friday
  { id: 'tt_16', day: 'Friday', startTime: '09:30 AM', endTime: '10:30 AM', subjectCode: 'HS601', subjectName: 'Ethics & Leadership', facultyName: 'Prof. Rachel Torres', room: 'Seminar Hall B', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_17', day: 'Friday', startTime: '10:45 AM', endTime: '11:45 AM', subjectCode: 'CS603', subjectName: 'Database Systems', facultyName: 'Prof. Sophia Bennett', room: 'Hall 302', department: 'Computer Science & Engineering', semester: 6 },
  { id: 'tt_18', day: 'Friday', startTime: '02:00 PM', endTime: '04:00 PM', subjectCode: 'PROJ-6', subjectName: 'Capstone Project Review', facultyName: 'Faculty Committee', room: 'Project Incubation Center', department: 'Computer Science & Engineering', semester: 6 },
];

const INITIAL_FACULTY: FacultyMember[] = [
  {
    id: 'fac_1',
    name: 'Prof. Elena Rostova',
    email: 'faculty@campus.edu',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor & Research Chair',
    qualification: 'Ph.D. in Computer Science (MIT), M.Tech',
    officeRoom: 'Block B, Academic Tower, Room 412',
    officeHours: 'Mon & Thu: 2:00 PM - 4:00 PM',
    phone: '+1 (555) 888-9901',
    specialization: 'Algorithm Design, Computational Graph Theory, Parallel Computing',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'fac_2',
    name: 'Dr. Alan Wright',
    email: 'alan.wright@campus.edu',
    department: 'Computer Science & Engineering',
    designation: 'Professor & Head of Department',
    qualification: 'Ph.D. in Distributed Systems (Stanford)',
    officeRoom: 'Block B, Academic Tower, Room 401',
    officeHours: 'Tue & Wed: 11:00 AM - 1:00 PM',
    phone: '+1 (555) 888-9902',
    specialization: 'Distributed Storage, Cloud Orchestration, Consensus Mechanisms',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'fac_3',
    name: 'Prof. Sophia Bennett',
    email: 'sophia.bennett@campus.edu',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    qualification: 'M.S. in Computer Science (Carnegie Mellon)',
    officeRoom: 'Block B, Academic Tower, Room 320',
    officeHours: 'Wed & Fri: 3:00 PM - 5:00 PM',
    phone: '+1 (555) 888-9903',
    specialization: 'Database Engines, Query Optimization, Transaction Processing',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'fac_4',
    name: 'Dr. Vikram Nair',
    email: 'vikram.nair@campus.edu',
    department: 'Computer Science & Engineering',
    designation: 'Professor & AI Lab Director',
    qualification: 'Ph.D. in Machine Learning (Oxford)',
    officeRoom: 'Innovation Tower, 5th Floor, Suite 508',
    officeHours: 'Mon & Fri: 10:00 AM - 12:00 PM',
    phone: '+1 (555) 888-9904',
    specialization: 'Deep Learning, Computer Vision, Foundation Models',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'fac_5',
    name: 'Prof. Rachel Torres',
    email: 'rachel.torres@campus.edu',
    department: 'Humanities & Social Sciences',
    designation: 'Senior Lecturer & Student Counselor',
    qualification: 'Ph.D. in Ethics & Public Policy (Columbia)',
    officeRoom: 'Humanities Block, Room 204',
    officeHours: 'Tue & Thu: 1:30 PM - 3:30 PM',
    phone: '+1 (555) 888-9905',
    specialization: 'Technology Ethics, Organizational Behavior, Tech Governance',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
];

const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'leave_1',
    studentId: 'user_student_1',
    studentName: 'Alex Mercer',
    studentRoll: '2024CS1042',
    department: 'Computer Science & Engineering',
    leaveType: 'Academic',
    startDate: '2026-11-04',
    endDate: '2026-11-06',
    reason: 'Representing university team at State Collegiate Hackathon in Seattle.',
    status: 'Approved',
    submittedAt: '2026-10-20T10:15:00',
    reviewedBy: 'Prof. Elena Rostova',
    reviewerComment: 'Official attendance excused for university event participation. Good luck!',
  },
  {
    id: 'leave_2',
    studentId: 'user_student_1',
    studentName: 'Alex Mercer',
    studentRoll: '2024CS1042',
    department: 'Computer Science & Engineering',
    leaveType: 'Medical',
    startDate: '2026-11-18',
    endDate: '2026-11-19',
    reason: 'Scheduled minor dental surgery and recovery.',
    status: 'Pending',
    submittedAt: '2026-10-27T14:30:00',
  },
  {
    id: 'leave_3',
    studentId: 'user_student_2',
    studentName: 'Priya Sharma',
    studentRoll: '2024CS1043',
    department: 'Computer Science & Engineering',
    leaveType: 'Personal',
    startDate: '2026-11-12',
    endDate: '2026-11-14',
    reason: 'Attending sibling marriage ceremony out of state.',
    status: 'Pending',
    submittedAt: '2026-10-26T09:00:00',
  },
];

const INITIAL_CONTACTS: ContactMessage[] = [
  {
    id: 'cnt_1',
    name: 'David O’Connor',
    email: 'd.oconnor@college-prep.org',
    subject: 'Inquiry regarding Transfer Credits for CSE Degree',
    message: 'Hello Admissions, I would like to clarify transfer eligibility for AP Computer Science A credits towards Semester 1 coursework.',
    submittedAt: '2026-10-25T11:45:00',
    status: 'New',
  },
  {
    id: 'cnt_2',
    name: 'Samantha Vance',
    email: 'svance@techpartners.io',
    subject: 'CampusConnect Placement & Campus Recruitment Drive',
    message: 'We are seeking to sponsor campus interviews for 2027 graduating software engineers in cloud and devops roles.',
    submittedAt: '2026-10-23T16:20:00',
    status: 'Replied',
  },
];

// Helper to safely load or initialize storage
function loadData<T>(key: string, initialData: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return initialData;
  }
}

function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

export const storage = {
  getUsers: (): User[] => loadData(STORAGE_KEYS.USERS, INITIAL_USERS),
  saveUsers: (users: User[]) => saveData(STORAGE_KEYS.USERS, users),

  getCourses: (): Course[] => loadData(STORAGE_KEYS.COURSES, INITIAL_COURSES),
  saveCourses: (courses: Course[]) => saveData(STORAGE_KEYS.COURSES, courses),

  getAttendance: (): AttendanceRecord[] => loadData(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE),
  saveAttendance: (records: AttendanceRecord[]) => saveData(STORAGE_KEYS.ATTENDANCE, records),

  getResults: (): SubjectResult[] => loadData(STORAGE_KEYS.RESULTS, INITIAL_RESULTS),
  saveResults: (results: SubjectResult[]) => saveData(STORAGE_KEYS.RESULTS, results),

  getAssignments: (): Assignment[] => loadData(STORAGE_KEYS.ASSIGNMENTS, INITIAL_ASSIGNMENTS),
  saveAssignments: (assignments: Assignment[]) => saveData(STORAGE_KEYS.ASSIGNMENTS, assignments),

  getSubmissions: (): AssignmentSubmission[] => loadData(STORAGE_KEYS.SUBMISSIONS, INITIAL_SUBMISSIONS),
  saveSubmissions: (submissions: AssignmentSubmission[]) => saveData(STORAGE_KEYS.SUBMISSIONS, submissions),

  getMaterials: (): StudyMaterial[] => loadData(STORAGE_KEYS.MATERIALS, INITIAL_MATERIALS),
  saveMaterials: (materials: StudyMaterial[]) => saveData(STORAGE_KEYS.MATERIALS, materials),

  getAnnouncements: (): Announcement[] => loadData(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS),
  saveAnnouncements: (announcements: Announcement[]) => saveData(STORAGE_KEYS.ANNOUNCEMENTS, announcements),

  getEvents: (): CampusEvent[] => loadData(STORAGE_KEYS.EVENTS, INITIAL_EVENTS),
  saveEvents: (events: CampusEvent[]) => saveData(STORAGE_KEYS.EVENTS, events),

  getTimetable: (): TimetableSlot[] => loadData(STORAGE_KEYS.TIMETABLE, INITIAL_TIMETABLE),
  saveTimetable: (slots: TimetableSlot[]) => saveData(STORAGE_KEYS.TIMETABLE, slots),

  getFaculty: (): FacultyMember[] => loadData(STORAGE_KEYS.FACULTY, INITIAL_FACULTY),
  saveFaculty: (faculty: FacultyMember[]) => saveData(STORAGE_KEYS.FACULTY, faculty),

  getLeaves: (): LeaveRequest[] => loadData(STORAGE_KEYS.LEAVES, INITIAL_LEAVES),
  saveLeaves: (leaves: LeaveRequest[]) => saveData(STORAGE_KEYS.LEAVES, leaves),

  getContacts: (): ContactMessage[] => loadData(STORAGE_KEYS.CONTACTS, INITIAL_CONTACTS),
  saveContacts: (contacts: ContactMessage[]) => saveData(STORAGE_KEYS.CONTACTS, contacts),

  getAuthUser: (): User | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setAuthUser: (user: User | null) => {
    if (user) {
      saveData(STORAGE_KEYS.CURRENT_USER, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  resetToDefaults: () => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(INITIAL_RESULTS));
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(INITIAL_MATERIALS));
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(INITIAL_ANNOUNCEMENTS));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    localStorage.setItem(STORAGE_KEYS.TIMETABLE, JSON.stringify(INITIAL_TIMETABLE));
    localStorage.setItem(STORAGE_KEYS.FACULTY, JSON.stringify(INITIAL_FACULTY));
    localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(INITIAL_LEAVES));
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
  }
};
