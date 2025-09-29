import React, { useState, useEffect, useMemo } from 'react';
import ArticleSidebar from '../components/ArticleSidebar';

interface ArticlePageProps {
  articleId: string;
}

interface Section {
    id: string;
    title: string;
}

const ArticlePage = ({ articleId }: ArticlePageProps) => {
  const [rawContent, setRawContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (!articleId || articleId.includes('..') || articleId.includes('/')) {
        setError('Invalid article ID.');
        setIsLoading(false);
        return;
    }

    fetch(`/content/${articleId}.txt`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Article not found.');
        }
        return response.text();
      })
      .then(text => {
        setRawContent(text);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [articleId]);

  const generateId = (text: string) => {
      return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }

  const { formattedContent, sections } = useMemo(() => {


  return (
    <div className="bg-gray-900 text-white min-h-screen flex">
        <ArticleSidebar sections={sections} />
        <main className="flex-1 ml-64 p-8 md:p-12 overflow-y-auto">
            {isLoading && <p>Loading article...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {rawContent && (
              <article className="prose prose-invert lg:prose-xl max-w-4xl mx-auto">
                {formattedContent}
              </article>
            )}
        </main>
    </div>
  );
};

export default ArticlePage;
