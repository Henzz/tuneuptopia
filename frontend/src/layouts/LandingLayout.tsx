import { Outlet } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { NavigationMenuDemo2 } from '../components/navbar';

const LandingLayout: React.FC = () => {
  return (
    <div className="bg-muted/40">
      <div className="container mx-auto grid min-h-screen w-full">
        <div className="">
          <main className="bg-white p-4 lg:p-6 min-h-screen">
            {/* <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu> */}
            <NavigationMenuDemo2 />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;
