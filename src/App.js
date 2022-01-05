import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Test from './components/Test';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en' /*, 'fr'*/],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['localStorage', 'sessionStorage', 'cookie', 'htmlTag'],
      caches: ['localStorage'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

function App() {
  return (
    <div className="App">
      <Test />
    </div>
  );
}

export default App;
