import React, { useState, useEffect } from 'react';
import { SafetyPlan } from '../../types';

const SafetyPlanComponent = () => {
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan>({
    id: 'default',
    trustedContacts: [],
    safeLocations: [],
    emergencyBag: [],
    warningSignals: [],
    copingStrategies: [],
    lastUpdated: new Date()
  });

  const [activeTab, setActiveTab] = useState<'contacts' | 'locations' | 'bag' | 'signals' | 'strategies'>('contacts');

  useEffect(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('radio_adamowo_safety_plan');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSafetyPlan({
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated)
        });
      } catch (error) {
        console.error('Error loading safety plan:', error);
      }
    }
  }, []);

  const savePlan = (updatedPlan: SafetyPlan) => {
    const planToSave = {
      ...updatedPlan,
      lastUpdated: new Date()
    };
    setSafetyPlan(planToSave);
    localStorage.setItem('radio_adamowo_safety_plan', JSON.stringify(planToSave));
  };

  const addItem = (category: keyof SafetyPlan, item: string) => {
    if (!item.trim()) return;
    
    const updatedPlan = {
      ...safetyPlan,
      [category]: [...(safetyPlan[category] as string[]), item.trim()]
    };
    savePlan(updatedPlan);
  };

  const removeItem = (category: keyof SafetyPlan, index: number) => {
    const updatedPlan = {
      ...safetyPlan,
      [category]: (safetyPlan[category] as string[]).filter((_, i) => i !== index)
    };
    savePlan(updatedPlan);
  };

  const ItemList = ({ 
    category, 
    title, 
    placeholder, 
    items 
  }: { 
    category: keyof SafetyPlan; 
    title: string; 
    placeholder: string;
    items: string[];
  }) => {
    const [newItem, setNewItem] = useState('');

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addItem(category, newItem);
                setNewItem('');
              }
            }}
          />
          <button
            onClick={() => {
              addItem(category, newItem);
              setNewItem('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Dodaj
          </button>
        </div>

        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <span className="text-gray-800">{item}</span>
              <button
                onClick={() => removeItem(category, index)}
                className="text-red-600 hover:text-red-800 font-bold"
                aria-label="Usuń"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🛡️ Plan Bezpieczeństwa</h2>
        <p className="text-gray-600">
          Stwórz swój osobisty plan bezpieczeństwa. Wszystkie informacje są przechowywane lokalnie w Twojej przeglądarce.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Ostatnia aktualizacja: {safetyPlan.lastUpdated.toLocaleDateString('pl-PL')}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {[
          { id: 'contacts', label: 'Kontakty zaufane', icon: '📞' },
          { id: 'locations', label: 'Bezpieczne miejsca', icon: '🏠' },
          { id: 'bag', label: 'Torba awaryjne', icon: '🎒' },
          { id: 'signals', label: 'Sygnały ostrzegawcze', icon: '⚠️' },
          { id: 'strategies', label: 'Strategie radzenia', icon: '💪' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'contacts' && (
          <ItemList
            category="trustedContacts"
            title="Kontakty zaufane"
            placeholder="Imię i numer telefonu osoby zaufanej"
            items={safetyPlan.trustedContacts as unknown as string[]}
          />
        )}
        
        {activeTab === 'locations' && (
          <ItemList
            category="safeLocations"
            title="Bezpieczne miejsca"
            placeholder="Miejsce gdzie możesz szukać schronienia"
            items={safetyPlan.safeLocations}
          />
        )}
        
        {activeTab === 'bag' && (
          <ItemList
            category="emergencyBag"
            title="Torba awaryjna"
            placeholder="Przedmioty potrzebne w nagłej sytuacji"
            items={safetyPlan.emergencyBag}
          />
        )}
        
        {activeTab === 'signals' && (
          <ItemList
            category="warningSignals"
            title="Sygnały ostrzegawcze"
            placeholder="Zachowania które mogą zwiastować przemoc"
            items={safetyPlan.warningSignals}
          />
        )}
        
        {activeTab === 'strategies' && (
          <ItemList
            category="copingStrategies"
            title="Strategie radzenia sobie"
            placeholder="Sposoby na radzenie sobie w trudnych sytuacjach"
            items={safetyPlan.copingStrategies}
          />
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Pamiętaj:</strong> Trzymaj kopię tego planu w bezpiecznym miejscu, do którego masz łatwy dostęp. 
          W sytuacji kryzysowej naciśnij ESC aby szybko opuścić tę stronę.
        </p>
      </div>
    </div>
  );
};

export default SafetyPlanComponent;