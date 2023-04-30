import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { Dashboard } from '../pages/Dashboard';
import { AuthView } from '../pages/Auth';
import { useAuth } from '../hooks/useAuth';
import { customTheme } from '../theme/general';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { App } from '../App';
import { AuthProvider } from '../contexts/authContext';

const AnimationLayout = () => {
  const location = useLocation();
  const transitions = useTransition(location.pathname, {
    from: { opacity: 0.95 },
    enter: { opacity: 1 },
    config: { duration: 400 },
  });
  return (
    <AuthProvider>
      {transitions((styles) => (
        <animated.div style={styles}>
          <Outlet />
        </animated.div>
      ))}
    </AuthProvider>
  );
};

const PrivateRoutes = () => {
  const { isUserAuth } = useAuth();

  return isUserAuth ? <Outlet /> : <Navigate to="/app" />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route element={<AnimationLayout />}>
          <Route path="*" element={<AuthView />} />
          <Route
            path="/"
            element={<Navigate to="/app" />}
          />
          <Route path="/app" element={<AuthView />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<App />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
