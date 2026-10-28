import React, { useState } from 'react';
import {
  GraduationCap,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User as UserIcon,
  BookOpen,
  Building,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Hash,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    department: 'Computer Science & Engineering',
    course: 'B.Tech Computer Science',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const departments = [
    'Computer Science & Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Civil & Environmental Engineering',
    'School of Business Administration',
    'Biotechnology & Bioinformatics',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.studentId.trim()) errs.studentId = 'Student ID is required (e.g. 2026CS9012).';
    if (!formData.email.trim()) {
      errs.email = 'College email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.department) errs.department = 'Please select your department.';
    if (!formData.course.trim()) errs.course = 'Course or degree program is required.';
    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      const res = register({
        name: formData.name,
        email: formData.email,
        studentId: formData.studentId,
        department: formData.department,
        course: formData.course,
        role: 'student',
      });
      setIsLoading(false);

      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onNavigate('dashboard');
        }, 1200);
      } else {
        setErrors({ general: res.error || 'Failed to create student account.' });
      }
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-xl w-full space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-blue-600 text-white items-center justify-center shadow-md shadow-blue-600/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your Student Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Join the CampusConnect student community and manage your degree
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          {errors.general && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errors.general}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Registration Successful!
              </h3>
              <p className="text-xs text-slate-500">
                Your student profile and initial semester records have been initialized. Redirecting to your dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Student ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Jordan Hayes"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                        errors.name ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Roll / ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Hash className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. 2026CS9012"
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                        errors.studentId ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.studentId && <p className="text-[11px] text-red-600 mt-1">{errors.studentId}</p>}
                </div>
              </div>

              {/* College Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="jordan.hayes@campus.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                      errors.email ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
              </div>

              {/* Department & Course */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building className="w-4 h-4" />
                    </div>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                      {departments.map((dept, i) => (
                        <option key={i} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Degree / Course <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. B.Tech Computer Science"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                        errors.course ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.course && <p className="text-[11px] text-red-600 mt-1">{errors.course}</p>}
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 6 chars"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full pl-9 pr-9 py-2 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                        errors.password ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[11px] text-red-600 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`w-full pl-9 pr-9 py-2 rounded-xl border text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-slate-300 focus:border-blue-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-[11px] text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Registering student profile...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Login prompt */}
          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Already registered? </span>
            <button
              onClick={() => onNavigate('login')}
              className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Log in to your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
