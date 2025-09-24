import React from 'react';

interface Section {
  id: string;
  title: string;
}

interface ArticleSidebarProps {
  sections: Section[];
}

const ArticleSidebar = ({ sections }: ArticleSidebarProps) => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 fixed top-0 left-0 h-full border-r border-gray-700">
      <a href="/#/" className="text-lg font-bold mb-6 font-special-elite block"> &larr; Back to Home</a>
      <nav>
        <h3 className="text-lg font-semibold mb-3 text-gray-400">Table of Contents</h3>
        <ul>
          {sections.map(section => (
            <li key={section.id} className="mb-2">
              <a
                href={`#${section.id}`}
                className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ArticleSidebar;
