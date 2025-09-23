# MVP plan: Globalny odtwarzacz, kolejka, radio live, sidebar, i18n, PWA, testy

Zrealizuję minimalny, działający wycinek funkcjonalności z naciskiem na:
- globalny odtwarzacz wspólny dla wszystkich stron (jedna instancja audio),
- wspólna kolejka dla muzyki i podcastów z Play/Pause, Prev/Next, shuffle i loop,
- integracja strony Podcasts z tym samym odtwarzaczem,
- „radio live” jako specjalny tryb, z pobieraniem metadanych z `public/audio/playlist.json`,
- prosty Sidebar do filtrowania (ustawianie query param),
- i18n (PL/EN) przez react-i18next,
- PWA (vite-plugin-pwa),
- test jednostkowy kolejki + CI workflow.

Uwaga dot. backendu: Supabase jest obecnie wyłączony, więc zapisy (ulubione/historia/playlisty) realizuję lokalnie (localStorage). Po włączeniu Supabase można dodać synchronizację.

Pliki (max 8 nowych/zmienianych kluczowych):
1) src/context/AudioPlayerContext.tsx
   - Kontekst i provider globalnego odtwarzacza (kolejka, tryb live, shuffle/loop, zapisy do localStorage, auto-aktualizacja „now playing”).
   - Jeden element &lt;audio&gt; kontrolowany przez kontekst.

2) src/components/GlobalAudioBar.tsx
   - Pasek odtwarzacza widoczny na każdej stronie (Play/Pause, Prev/Next, Shuffle, Loop, tytuł, okładka, czas).

3) src/components/SidebarFilter.tsx
   - Boczne filtrowanie kategorii/podcastów (ustawia query param), prosty MVP.

4) src/i18n.ts
   - Inicjalizacja react-i18next (PL/EN) i proste klucze UI.

5) (modyfikacja) src/pages/Podcasts.tsx
   - Zamiast własnego &lt;audio&gt; korzysta z AudioPlayerContext (Play now / Add to queue + lista).

6) (modyfikacja) src/components/Layout.tsx
   - Umieszczenie SidebarFilter i GlobalAudioBar tak, aby były obecne na wszystkich stronach.

7) (modyfikacja) src/lib/playlist.ts
   - Rozszerzenie typu Track o cover/artist/duration (jeśli dostępne w JSON), wsparcie trybu „live” (odczyt pól pomocniczych).

8) (modyfikacja) vite.config.ts
   - Dodanie PWA plugin (vite-plugin-pwa) z prostym manifestem.

Dodatkowe:
- Test: src/__tests__/audioPlayer.test.tsx (vitest) – podstawowa logika kolejki.
- CI: .github/workflows/ci.yml – uruchomienie lint i testów na push/pull_request.

Po wdrożeniu:
- `pnpm i && pnpm run lint && pnpm run build`
- Uruchomię testy i sprawdzę PWA build.
