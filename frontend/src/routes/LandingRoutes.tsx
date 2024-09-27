import { PathRouteProps } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import Home from '../pages/landing/Home';

const LandingRoutes: PathRouteProps[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/news',
    element: <Dashboard />,
  },
  {
    path: '/category',
    element: <Dashboard />,
  },
  {
    path: '/faqs',
    element: <Dashboard />,
  },
];

export default LandingRoutes;
