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
import { CssBaseline } from '@mui/material';
import { AuthProvider } from '../contexts/authContext';
import { useUsersStore } from '../contexts/userStore';

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
  const { auth } = useUsersStore();

  return auth.active ? <Outlet /> : <Navigate to="/app" />;
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
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
