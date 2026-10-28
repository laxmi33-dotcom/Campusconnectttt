/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [targetDashboardTab, setTargetDashboardTab] = useState<string>('overview');

  const handleNavigate = (page: string, subView?: string) => {
    if (page === 'dashboard' && subView) {
      setTargetDashboardTab(subView);
    } else if (page === 'dashboard' && !subView) {
      setTargetDashboardTab('overview');
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-['Plus_Jakarta_Sans',sans-serif]">
          {/* Public Navbar shown on Home, Login, and Register */}
          {currentPage !== 'dashboard' && (
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
          )}

          {/* Page Routing */}
          <div className="flex-1">
            {currentPage === 'home' && (
              <HomePage onNavigate={handleNavigate} />
            )}

            {currentPage === 'login' && (
              <LoginPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'register' && (
              <RegisterPage onNavigate={handleNavigate} />
            )}

            {currentPage === 'dashboard' && (
              <DashboardPage
                initialTab={targetDashboardTab}
                onNavigateHome={() => handleNavigate('home')}
              />
            )}
          </div>

          {/* Public Footer shown on Home, Login, and Register */}
          {currentPage !== 'dashboard' && (
            <Footer onNavigate={handleNavigate} />
          )}
        </div>
      </DataProvider>
    </AuthProvider>
  );
}
