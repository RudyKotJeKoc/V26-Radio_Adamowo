import React, { useState, useEffect } from 'react';

const KeyFacts = () => {
  const [facts, setFacts] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/content/kluczowe-fakty.txt')
      .then(res => res.text())
      .then(text => {
        const allLines = text.split('\n');
        // Filter for lines that start with the bullet point character '•'
        const extractedFacts = allLines
          .map(line => line.trim())
          .filter(line => line.startsWith('•'))
          .map(line => line.substring(1).trim()); // Remove the bullet point
        setFacts(extractedFacts);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to load key facts:", error);
        setIsLoading(false);
      });
  }, []);

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % facts.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + facts.length) % facts.length);
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading Key Facts...</div>;
  }

  if (facts.length === 0) {
    return null; // Don't render anything if no facts were found
  }

  return (
    <div className="bg-gray-800 border border-green-500 rounded-lg p-6 my-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold mb-4 font-special-elite">Key Fact</h2>
      <p className="text-lg leading-relaxed min-h-[100px] flex items-center justify-center">
        {facts[currentIndex]}
      </p>
      <div className="flex items-center justify-center mt-6 space-x-4">
        <button
          onClick={goToPrevious}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          &larr; Previous
        </button>
        <span className="text-gray-400 font-mono text-sm">
          {currentIndex + 1} / {facts.length}
        </span>
        <button
          onClick={goToNext}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default KeyFacts;
