import Test from './components/Test';
import localizationInit from './config/localization';

localizationInit();

function App() {
  return (
    <div className="App">
      <Test />
    </div>
  );
}

export default App;
