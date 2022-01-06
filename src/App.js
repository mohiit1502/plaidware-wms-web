import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import AuthProvider, { useAuth } from './config/authProvider';
import localizationInit from './config/localization';
import Dashboard from './layouts/dashboard';
import Login from './pages/login';

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
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Test />} /> */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="/" element={<div>This is content</div>} />
        </Route>
        <Route path="*" element={<p>This page does not exist</p>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
