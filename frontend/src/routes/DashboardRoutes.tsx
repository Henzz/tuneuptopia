import { PathRouteProps } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import UserManagement from '../pages/admin/UserManagement/UserManagement';
import {
  CircleHelp,
  FileMusic,
  Home,
  LayoutPanelTop,
  Newspaper,
  Users,
} from 'lucide-react';
import NewsManagement from '../pages/admin/News/NewsManagement';

export interface LayoutRouteProps extends PathRouteProps {
  icon: React.ReactNode | null;
  title: string;
  path: string;
}

const DashboardRoutes: LayoutRouteProps[] = [
  {
    path: '/admin/dashboard',
    icon: <Home className="h-4 w-4" />,
    title: 'Dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/users',
    icon: <Users className="h-4 w-4" />,
    title: 'Users',
    element: <UserManagement />,
  },
  {
    path: '/admin/news',
    icon: <Newspaper className="h-4 w-4" />,
    title: 'News',
    element: <NewsManagement />,
  },
  {
    path: '/admin/categories',
    icon: <LayoutPanelTop className="h-4 w-4" />,
    title: 'Categories',
    element: <Dashboard />,
  },
  {
    path: '/admin/audios',
    icon: <FileMusic className="h-4 w-4" />,
    title: 'Audios',
    element: <Dashboard />,
  },
  {
    path: '/admin/faqs',
    icon: <CircleHelp className="h-4 w-4" />,
    title: 'FAQs',
    element: <Dashboard />,
  },
];

export default DashboardRoutes;
