import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import ArticlePage from './pages/ArticlePage';

const App = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
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
