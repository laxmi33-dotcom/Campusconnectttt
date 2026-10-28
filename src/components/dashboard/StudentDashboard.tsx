import React from 'react';
import { StudentOverview } from './student/StudentOverview';
import { StudentAttendance } from './student/StudentAttendance';
import { StudentResults } from './student/StudentResults';
import { StudentAssignments } from './student/StudentAssignments';
import { StudentTimetable } from './student/StudentTimetable';
import { StudentAnnouncements } from './student/StudentAnnouncements';
import { StudentEvents } from './student/StudentEvents';
import { StudentFaculty } from './student/StudentFaculty';
import { StudentLeaves } from './student/StudentLeaves';
import { StudentProfile } from './student/StudentProfile';

interface StudentDashboardProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ currentTab, onSelectTab }) => {
  switch (currentTab) {
    case 'attendance':
      return <StudentAttendance />;
    case 'results':
      return <StudentResults />;
    case 'assignments':
      return <StudentAssignments />;
    case 'timetable':
      return <StudentTimetable />;
    case 'announcements':
      return <StudentAnnouncements />;
    case 'events':
      return <StudentEvents />;
    case 'faculty':
      return <StudentFaculty />;
    case 'leaves':
      return <StudentLeaves />;
    case 'profile':
      return <StudentProfile />;
    case 'overview':
    default:
      return <StudentOverview onNavigateTab={onSelectTab} />;
  }
};
