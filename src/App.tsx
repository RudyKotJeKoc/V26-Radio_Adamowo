import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ArticlePage from './pages/ArticlePage';
import SafetyPlanComponent from './components/safety/SafetyPlan';
import EducationalHub from './components/support/EducationalHub';
import CrisisHelpline from './components/crisis/CrisisHelpline';
import { SafetyFeatures } from './utils/safety';

const App = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    // Initialize safety features globally
    SafetyFeatures.initializeSafetyListeners();
    SafetyFeatures.enableAnonymousSession();
    
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    if (route.startsWith('#/article/')) {
      const articleId = route.replace('#/article/', '');
      return <ArticlePage articleId={articleId} />;
    }

    if (route === '#/safety-plan') {
      return (
        <div className="min-h-screen bg-gray-100 py-8">
          <SafetyPlanComponent />
          <CrisisHelpline />
        </div>
      );
    }

    if (route === '#/education') {
      return (
        <div className="min-h-screen bg-gray-100 py-8">
          <EducationalHub />
          <CrisisHelpline />
        </div>
      );
    }

    // Default route
    return <Layout />;
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default App;
