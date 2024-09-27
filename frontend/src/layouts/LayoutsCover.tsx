import { Toaster } from '@/components/ui/toaster';

interface DefaultLayout {
  children: React.ReactNode;
}

const LayoutsCover: React.FC<DefaultLayout> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default LayoutsCover;
