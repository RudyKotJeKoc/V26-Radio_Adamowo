import React, { useState } from 'react';
import { DEFAULT_CRISIS_CONTACTS } from '../../utils/safety';
import { CrisisContact } from '../../types';

const CrisisHelpline = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedContact, setSelectedContact] = useState<CrisisContact | null>(null);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <>
      {/* Always visible crisis button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Pomoc kryzysowa"
          title="Pomoc kryzysowa - naciśnij ESC aby szybko opuścić stronę"
        >
          🆘 POMOC
        </button>
      </div>

      {/* Expanded crisis contacts */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-red-600">🆘 Pomoc Kryzysowa</h2>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  aria-label="Zamknij"
                >
                  ×
                </button>
              </div>

              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-800">
                  <strong>Szybkie wyjście:</strong> Naciśnij klawisz ESC aby natychmiast opuścić tę stronę
                </p>
              </div>

              <div className="space-y-3">
                {DEFAULT_CRISIS_CONTACTS.map((contact, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      {contact.available24h && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          24h
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{contact.description}</p>
                    
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      📞 Zadzwoń: {contact.phone}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Twoje bezpieczeństwo jest najważniejsze.</strong> Jeśli jesteś w bezpośrednim niebezpieczeństwie, 
                  natychmiast zadzwoń pod numer 997 lub 112.
                </p>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-gray-700 underline text-sm"
                >
                  Zamknij okno pomocy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrisisHelpline;