import React from 'react';

const MainSidebar = () => {
    const articles = [
        { id: 'krytyczna-analiza-materialu-dowodowego', title: 'Biała Księga (Analiza)' },
        { id: 'raport-dla-mediow', title: 'Raport dla Mediów' },
        { id: 'kronika-osmego-kregu', title: 'Kronika Ósmego Kręgu' },
    ];


      <nav>
        <h3 className="text-lg font-semibold mb-3 text-gray-400">Navigation</h3>
        <ul>
            <li className="mb-2">
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
