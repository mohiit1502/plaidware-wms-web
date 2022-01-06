import Test from './components/Test';
import AuthProvider from './config/authProvider';
import localizationInit from './config/localization';

localizationInit();

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Test />
      </div>
    </AuthProvider>
  );
}

export default App;
