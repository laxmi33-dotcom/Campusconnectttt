import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ProjectVideoSection } from '../components/home/ProjectVideoSection';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { StatsSection } from '../components/home/StatsSection';
import { AboutSection } from '../components/home/AboutSection';
import { ContactSection } from '../components/home/ContactSection';

interface HomePageProps {
  onNavigate: (page: string, subView?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleScrollToVideo = () => {
    const el = document.getElementById('project-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToFeatures = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectFeature = (featureKey: string) => {
    // Navigate straight to dashboard with that view pre-selected
    onNavigate('dashboard', featureKey);
  };

  return (
    <main className="w-full">
      {/* 1. Main Hero Section */}
      <HeroSection
        onExploreFeatures={handleScrollToFeatures}
        onWatchDemo={handleScrollToVideo}
        onGetStarted={() => onNavigate('login')}
      />

      {/* 2. Project Explanation Video Section (CRITICAL REQUIREMENT: Directly after Hero) */}
      <ProjectVideoSection
        onQuickExplore={() => onNavigate('dashboard')}
      />

      {/* 3. Features Section (10 Cards) */}
      <FeaturesSection onSelectFeature={handleSelectFeature} />

      {/* 4. How It Works (3 Steps) */}
      <HowItWorksSection onGetStarted={() => onNavigate('login')} />

      {/* 5. Statistics Section (Demonstration Data) */}
      <StatsSection />

      {/* 6. About the Project */}
      <AboutSection />

      {/* 7. Contact Section */}
      <ContactSection />
    </main>
  );
};
