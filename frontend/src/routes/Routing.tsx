import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardRoutes from './DashboardRoutes';
import LandingRoutes from './LandingRoutes';
import LandingLayout from '../layouts/LandingLayout';

export const Routing = () => {
  //   const location = useLocation();
  //   const navigate = useNavigate();

  useEffect(
    () => {
      // if (!session || !localSession) {
      //   dispatch(logOut());
      //   navigate(`/auth/login${location.search}`);
      // } else if (session && location.pathname === '/auth/login') {
      //   navigate('/');
      // }
    },
    [
      // session,
      // location.pathname,
      // navigate,
      // dispatch,
      // localSession,
      // location.search,
    ]
  );

  return (
    <Routes>
      <Route element={<LandingLayout />}>
        {LandingRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              index
              path={route.path}
              element={route.element}
            />
          );
        })}
      </Route>
      <Route element={<DashboardLayout />}>
        {DashboardRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              index
              path={route.path}
              element={route.element}
            />
          );
        })}
      </Route>
      <Route index path="*" element={<>404 Page Not Found</>} />
    </Routes>
  );
};

export default Routing;
