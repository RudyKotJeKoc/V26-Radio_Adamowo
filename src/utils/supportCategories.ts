import { SupportCategory } from '../types';

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  {
    id: "crisis-intervention",
    title: "Interwencja Kryzysowa",
    urgent: true,
    tracks: [],
    icon: "🆘",
    description: "Nagrania wsparcia w sytuacjach kryzysowych"
  },
  {
    id: "healing-journey",
    title: "Droga do Uzdrowienia",
    urgent: false,
    tracks: [],
    icon: "🌱",
    description: "Medytacje, afirmacje i nagrania wspierające proces zdrowienia"
  },
  {
    id: "education",
    title: "Edukacja o Przemocy",
    urgent: false,
    tracks: [],
    icon: "📚",
    description: "Wykłady i rozmowy edukacyjne o przemocy domowej"
  },
  {
    id: "legal-support",
    title: "Wsparcie Prawne",
    urgent: false,
    tracks: [],
    icon: "⚖️",
    description: "Informacje o prawach i procedurach prawnych"
  },
  {
    id: "support-groups",
    title: "Grupy Wsparcia",
    urgent: false,
    tracks: [],
    icon: "🤝",
    description: "Nagrania z grup wsparcia i świadectwa innych osób"
  }
];

export const getCategoryById = (id: string): SupportCategory | undefined => {
  return SUPPORT_CATEGORIES.find(category => category.id === id);
};

export const getUrgentCategories = (): SupportCategory[] => {
  return SUPPORT_CATEGORIES.filter(category => category.urgent);
};