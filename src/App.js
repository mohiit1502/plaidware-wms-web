import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Test from './components/Test';
import AuthProvider, { useAuth } from './config/authProvider';
import localizationInit from './config/localization';

localizationInit();

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<>Hey there</>} />
        <Route path="/login" element={<Test />} />
        <Route path="/dashboard" element={<RequireAuth>This is secret</RequireAuth>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
