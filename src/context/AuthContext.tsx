import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { storage } from '../services/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  loginAsDemo: (role: UserRole) => void;
  register: (data: {
    name: string;
    email: string;
    role?: UserRole;
    studentId?: string;
    department: string;
    course?: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => storage.getAuthUser());

  useEffect(() => {
    // If no user is logged in initially, keep as null (user starts on homepage or can log in)
  }, []);

  const login = (email: string): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = storage.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!existing) {
      return {
        success: false,
        error: 'No account found with this email. Please check your credentials or try our 1-click demo accounts below.',
      };
    }

    setUser(existing);
    storage.setAuthUser(existing);
    return { success: true };
  };

  const loginAsDemo = (role: UserRole) => {
    const users = storage.getUsers();
    let demoUser = users.find((u) => u.role === role);
    if (!demoUser) {
      if (role === 'student') demoUser = users.find((u) => u.email === 'student@campus.edu');
      else if (role === 'faculty') demoUser = users.find((u) => u.email === 'faculty@campus.edu');
      else if (role === 'admin') demoUser = users.find((u) => u.email === 'admin@campus.edu');
    }
    if (demoUser) {
      setUser(demoUser);
      storage.setAuthUser(demoUser);
    }
  };

  const register = (data: {
    name: string;
    email: string;
    role?: UserRole;
    studentId?: string;
    department: string;
    course?: string;
  }): { success: boolean; error?: string } => {
    const users = storage.getUsers();
    const trimmedEmail = data.email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: data.name.trim(),
      email: trimmedEmail,
      role: data.role || 'student',
      studentId: data.studentId || `2024${Math.floor(1000 + Math.random() * 9000)}`,
      department: data.department,
      course: data.course || 'B.Tech Computer Science',
      semester: 1,
      phone: '+1 (555) 000-0000',
      bio: 'New student enrolled at CampusConnect portal.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    const updatedUsers = [...users, newUser];
    storage.saveUsers(updatedUsers);

    // Initialize initial default attendance & sample results for new student
    const allAttendance = storage.getAttendance();
    const newAttendance = [
      { id: `att_${Date.now()}_1`, studentId: newUser.id, subjectCode: 'CS101', subjectName: 'Introduction to Programming', totalClasses: 20, attendedClasses: 18, lastUpdated: 'Just now' },
      { id: `att_${Date.now()}_2`, studentId: newUser.id, subjectCode: 'MA101', subjectName: 'Engineering Mathematics I', totalClasses: 22, attendedClasses: 19, lastUpdated: 'Just now' },
      { id: `att_${Date.now()}_3`, studentId: newUser.id, subjectCode: 'PH101', subjectName: 'Applied Physics & Electromagnetics', totalClasses: 18, attendedClasses: 15, lastUpdated: 'Just now' },
    ];
    storage.saveAttendance([...allAttendance, ...newAttendance]);

    setUser(newUser);
    storage.setAuthUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    storage.setAuthUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    storage.setAuthUser(updatedUser);

    const users = storage.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      storage.saveUsers(users);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
