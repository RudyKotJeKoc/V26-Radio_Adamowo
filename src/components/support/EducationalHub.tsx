import React, { useState } from 'react';

interface EducationalResource {
  id: string;
  title: string;
  type: 'article' | 'audio' | 'video' | 'infographic';
  category: 'warning-signs' | 'safety' | 'legal' | 'recovery' | 'support';
  description: string;
  content?: string;
  audioId?: string;
  urgent?: boolean;
}

const EDUCATIONAL_RESOURCES: EducationalResource[] = [
  {
    id: 'warning-signs-physical',
    title: 'Rozpoznawanie sygnałów ostrzegawczych przemocy fizycznej',
    type: 'article',
    category: 'warning-signs',
    description: 'Jak rozpoznać pierwsze oznaki przemocy fizycznej w związku',
    urgent: true
  },
  {
    id: 'warning-signs-emotional',
    title: 'Przemoc psychiczna - sygnały alarmowe',
    type: 'article',
    category: 'warning-signs',
    description: 'Rozpoznawanie przemocy emocjonalnej i psychicznej',
    urgent: true
  },
  {
    id: 'safety-planning',
    title: 'Jak stworzyć plan bezpieczeństwa',
    type: 'article',
    category: 'safety',
    description: 'Przewodnik po tworzeniu osobistego planu bezpieczeństwa'
  },
  {
    id: 'legal-rights',
    title: 'Twoje prawa jako ofiara przemocy domowej',
    type: 'article',
    category: 'legal',
    description: 'Informacje o prawach i dostępnej pomocy prawnej'
  },
  {
    id: 'recovery-stages',
    title: 'Etapy procesu zdrowienia po przemocy',
    type: 'article',
    category: 'recovery',
    description: 'Zrozumienie procesu psychicznego dochodzenia do siebie'
  },
  {
    id: 'support-children',
    title: 'Jak pomóc dzieciom dotkniętym przemocą domową',
    type: 'article',
    category: 'support',
    description: 'Wsparcie dla dzieci świadków lub ofiar przemocy'
  }
];

const EducationalHub = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);

  const categories = [
    { id: 'all', label: 'Wszystkie', icon: '📚' },
    { id: 'warning-signs', label: 'Sygnały ostrzegawcze', icon: '⚠️' },
    { id: 'safety', label: 'Bezpieczeństwo', icon: '🛡️' },
    { id: 'legal', label: 'Aspekty prawne', icon: '⚖️' },
    { id: 'recovery', label: 'Proces zdrowienia', icon: '🌱' },
    { id: 'support', label: 'Wsparcie bliskich', icon: '🤝' }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? EDUCATIONAL_RESOURCES 
    : EDUCATIONAL_RESOURCES.filter(r => r.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄';
      case 'audio': return '🎧';
      case 'video': return '🎥';
      case 'infographic': return '📊';
      default: return '📚';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📚 Centrum Edukacyjne</h2>
        <p className="text-gray-600">
          Zasoby edukacyjne pomagające w rozpoznawaniu, radzeniu sobie i wyjściu z przemocy domowej.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              resource.urgent ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedResource(resource)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                {resource.urgent && <span className="text-red-600 font-bold text-xs">PILNE</span>}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {resource.title}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-3">
              {resource.description}
            </p>
            
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {categories.find(c => c.id === resource.category)?.label}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Czytaj więcej →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resource Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(selectedResource.type)}</span>
                  <h2 className="text-xl font-bold text-gray-900">{selectedResource.title}</h2>
                  {selectedResource.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold">
                      PILNE
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  aria-label="Zamknij"
                >
                  ×
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">
                  {selectedResource.description}
                </p>
              </div>

              {selectedResource.urgent && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm text-red-800">
                    <strong>To jest pilna informacja.</strong> Jeśli czujesz się zagrożona, 
                    natychmiast zadzwoń pod numer 997 lub skorzystaj z przycisku pomocy kryzysowej.
                  </p>
                </div>
              )}

              {/* Placeholder content */}
              <div className="prose max-w-none">
                <p className="text-gray-700">
                  Treść edukacyjna będzie dostępna wkrótce. W międzyczasie zachęcamy do kontaktu 
                  z organizacjami wspierającymi ofiary przemocy domowej.
                </p>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-500 hover:text-gray-700 underline"
                >
                  Zamknij
                </button>
                
                {selectedResource.audioId && (
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors">
                    🎧 Posłuchaj nagrania
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Notice */}
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-2">🆘 W sytuacji zagrożenia</h3>
        <p className="text-sm text-red-700">
          Jeśli jesteś w bezpośrednim niebezpieczeństwie, natychmiast zadzwoń pod numer <strong>997</strong> lub <strong>112</strong>. 
          Naciśnij klawisz <strong>ESC</strong> aby szybko opuścić tę stronę.
        </p>
      </div>
    </div>
  );
};

export default EducationalHub;