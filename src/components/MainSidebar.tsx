import React from 'react';

const MainSidebar = () => {
    const articles = [
        { id: 'krytyczna-analiza-materialu-dowodowego', title: 'Biała Księga (Analiza)' },
        { id: 'raport-dla-mediow', title: 'Raport dla Mediów' },
        { id: 'kronika-osmego-kregu', title: 'Kronika Ósmego Kręgu' },
    ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 fixed top-0 left-0 h-full border-r border-gray-700">
      <a href="/#/" className="text-2xl font-bold mb-6 font-special-elite block">Radio Adamowo</a>
      <nav>
        <h3 className="text-lg font-semibold mb-3 text-gray-400">Navigation</h3>
        <ul>
            <li className="mb-2">
                <a href="/#/" className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white">Home</a>
            </li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 mt-6 text-gray-400">Articles</h3>
        <ul>
          {articles.map(article => (
            <li key={article.id} className="mb-2">
              <a
                href={`/#/article/${article.id}`}
                className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default MainSidebar;
