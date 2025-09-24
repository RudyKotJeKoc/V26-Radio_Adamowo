# Audyt Projektu "Radio Adamowo" (V26)

Data: 2025-09-24

## Wstęp

Niniejszy dokument przedstawia audyt techniczny i produktowy aplikacji "Radio Adamowo". Audyt został przeprowadzony po serii prac mających na celu stabilizację, naprawę i ulepszenie istniejącej bazy kodu. Aplikacja została pomyślnie zrekonstruowana i rozbudowana o kluczowe funkcje, jednak wciąż istnieją obszary wymagające uwagi.

---

## 1. Blokery (Blockers)

*Krytyczne problemy, które muszą zostać rozwiązane, aby zapewnić stabilność i dalszy rozwój.*

| Problem | Opis | Pliki do zmiany | Estymacja |
| :--- | :--- | :--- | :--- |
| **Problem ze środowiskiem uruchomieniowym** | `pnpm run dev` kończy się błędem `vite: not found`, mimo poprawnej instalacji zależności i konfiguracji. Uniemożliwia to lokalne testowanie i weryfikację. | Konfiguracja środowiska wykonawczego (poza repozytorium) | **L** |
| **Niezgodności zależności** | Zależności w `package.json` nie odpowiadały konfiguracji w `vite.config.ts` i `eslint.config.js`. | `vite.config.ts`, `eslint.config.js` | **S (Naprawione)** |

---

## 2. Wysoki Wpływ / Mały Koszt (Quick Wins)

*Zmiany, które przyniosą znaczną poprawę w UX i funkcjonalności przy relatywnie niskim nakładzie pracy.*

| Funkcja | Opis | Pliki do zmiany | Estymacja |
| :--- | :--- | :--- | :--- |
| **Integracja z Media Session API** | Umożliwia sterowanie odtwarzaczem z poziomu systemu operacyjnego (np. na ekranie blokady). Znacząco poprawia UX na mobile. | `AudioPlayerContext.tsx` | **S** |
| **Aktywny stan w nawigacji** | Podświetlanie w sidebarze linku do artykułu, który jest aktualnie czytany. | `MainSidebar.tsx`, `ArticlePage.tsx` | **S** |
| **Lepsze stany ładowania (Skeletons)** | Zastąpienie tekstów "Loading..." szkieletami UI (tzw. skeletons) w celu poprawy postrzeganej wydajności. | `ArticlePage.tsx`, `KeyFacts.tsx` | **M** |
| **Walidacja i obsługa błędów JSON** | Dodanie walidacji schemy dla `playlist.json` przy pobieraniu danych, aby uniknąć błędów w przypadku niepoprawnych danych. | `Layout.tsx` | **S** |

---

## 3. Roadmapa (Roadmap)

*Strategiczne kierunki rozwoju i większe funkcjonalności, które można wdrożyć w przyszłości.*

| Funkcja | Opis | Pliki do zmiany | Estymacja |
| :--- | :--- | :--- | :--- |
| **Radio LIVE** | Implementacja strumienia na żywo jako alternatywy dla playlisty, wraz z dynamicznym pobieraniem metadanych "teraz odtwarzane". | `AudioPlayerContext.tsx`, Nowy komponent UI | **L** |
| **Konta użytkowników i ulubione** | Wprowadzenie logowania (np. przez Supabase, jak wspomniano w `todo.md`) w celu zapisywania ulubionych utworów i historii odtwarzania. | Nowe komponenty, `AudioPlayerContext.tsx` | **L** |
| **Rozbudowa artykułów (MDX)** | Zastąpienie obecnego parsera .txt wsparciem dla MDX, co pozwoli na osadzanie interaktywnych komponentów React bezpośrednio w treści artykułów. | `ArticlePage.tsx`, Zmiana systemu budowania | **M** |
| **Profesjonalny routing** | Zastąpienie obecnego, prostego routera opartego na hashu biblioteką `react-router-dom`, gdy tylko środowisko na to pozwoli. | `App.tsx`, `Layout.tsx`, etc. | **M** |
| **Testy jednostkowe i E2E** | Stworzenie solidnego zestawu testów dla logiki odtwarzacza (`vitest`) oraz testów E2E dla kluczowych ścieżek użytkownika (`Playwright`). | Nowe pliki testowe (`*.test.tsx`) | **L** |
| **Zaawansowane funkcje audio** | Dodanie opcji takich jak zmiana prędkości odtwarzania, przeskakiwanie o 15s, wizualizacje audio czy crossfade między utworami. | `AudioPlayerContext.tsx`, `GlobalAudioBar.tsx` | **M** |
