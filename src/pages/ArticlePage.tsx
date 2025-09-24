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
      if (!rawContent) return { formattedContent: [], sections: [] };

      const lines = rawContent.split('\n');
      const sections: Section[] = [];

      const formattedContent = lines.map((line) => {
          line = line.trim();
          if (line.length === 0) return null;

          if (/^\d+(\.\d+)*\s/.test(line)) {
              const id = generateId(line);
              sections.push({ id, title: line });
              return <h2 key={id} id={id} className="text-3xl font-bold mt-10 mb-4 font-special-elite scroll-mt-20">{line}</h2>;
          }
          if (line === line.toUpperCase() || line.endsWith(':')) {
              const id = generateId(line);
              sections.push({ id, title: line });
              return <h3 key={id} id={id} className="text-2xl font-semibold mt-6 mb-3 scroll-mt-20">{line}</h3>;
          }
          if (line.startsWith('*')) {
              return <li key={generateId(line)} className="ml-6 list-disc text-lg leading-relaxed">{line.substring(1).trim()}</li>;
          }
          return <p key={generateId(line)} className="mb-4 text-lg leading-relaxed">{line}</p>;
      });

      return { formattedContent, sections };

  }, [rawContent]);


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
