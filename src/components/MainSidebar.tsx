import React from 'react';

const MainSidebar = () => {
    const articles = [
        { id: 'krytyczna-analiza-materialu-dowodowego', title: 'Biała Księga (Analiza)' },
        { id: 'raport-dla-mediow', title: 'Raport dla Mediów' },
        { id: 'kronika-osmego-kregu', title: 'Kronika Ósmego Kręgu' },
    ];

    const supportResources = [
        { id: 'safety-plan', title: '🛡️ Plan Bezpieczeństwa', href: '/#/safety-plan', urgent: true },
        { id: 'education', title: '📚 Centrum Edukacyjne', href: '/#/education', urgent: false },
    ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 fixed top-0 left-0 h-full border-r border-gray-700 overflow-y-auto">
      <a href="/#/" className="text-3xl font-bold mb-8 font-special-elite block">Radio Adamowo</a>
      
      {/* Emergency Notice */}
      <div className="mb-6 p-3 bg-red-900 border border-red-600 rounded-lg">
        <p className="text-xs text-red-200 mb-2">
          <strong>W sytuacji zagrożenia:</strong>
        </p>
        <p className="text-xs text-red-200">
          Naciśnij <kbd className="bg-red-800 px-1 rounded">ESC</kbd> aby szybko opuścić stronę
        </p>
      </div>

      <nav>
        <h3 className="text-lg font-semibold mb-3 text-gray-400">Navigation</h3>
        <ul>
            <li className="mb-2">
                <a href="/#/" className="block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white">🏠 Home</a>
            </li>
        </ul>

        <h3 className="text-lg font-semibold mb-3 mt-6 text-red-400">🆘 Wsparcie</h3>
        <ul>
          {supportResources.map(resource => (
            <li key={resource.id} className="mb-2">
              <a
                href={resource.href}
                className={`block px-3 py-2 rounded-md text-sm hover:bg-gray-800 hover:text-white ${
                  resource.urgent ? 'text-red-300 border border-red-600' : 'text-gray-300'
                }`}
              >
                {resource.title}
              </a>
            </li>
          ))}
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

        {/* Crisis Contacts Quick Access */}
        <div className="mt-8 p-3 bg-gray-800 rounded-lg">
          <h4 className="text-sm font-semibold text-red-400 mb-2">🆘 Pilne kontakty</h4>
          <div className="space-y-2 text-xs">
            <div>
              <strong className="text-white">Policja:</strong>
              <a href="tel:997" className="text-red-300 hover:text-red-200 ml-1">997</a>
            </div>
            <div>
              <strong className="text-white">Pogotowie Przemocy:</strong>
              <a href="tel:800120002" className="text-red-300 hover:text-red-200 ml-1">800 120 002</a>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default MainSidebar;
