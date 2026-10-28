import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StudentDashboard } from '../components/dashboard/StudentDashboard';
import { FacultyDashboard } from '../components/dashboard/FacultyDashboard';
import { AdminDashboard } from '../components/dashboard/AdminDashboard';

interface DashboardPageProps {
  initialTab?: string;
  onNavigateHome: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  initialTab = 'overview',
  onNavigateHome,
}) => {
  const { user, isAuthenticated, loginAsDemo } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setCurrentTab(initialTab);
    }
  }, [initialTab]);

  // If someone lands here without an authenticated session, default to student demo account
  useEffect(() => {
    if (!isAuthenticated || !user) {
      loginAsDemo('student');
    }
  }, [isAuthenticated, user, loginAsDemo]);

  const role = user?.role || 'student';

  return (
    <DashboardLayout
      currentTab={currentTab}
      onSelectTab={(tab) => setCurrentTab(tab)}
      onNavigateHome={onNavigateHome}
    >
      {role === 'admin' ? (
        <AdminDashboard currentTab={currentTab} onSelectTab={setCurrentTab} />
      ) : role === 'faculty' ? (
        <FacultyDashboard currentTab={currentTab} onSelectTab={setCurrentTab} />
      ) : (
        <StudentDashboard currentTab={currentTab} onSelectTab={setCurrentTab} />
      )}
    </DashboardLayout>
  );
};
