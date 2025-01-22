import { useEffect, useState } from 'react';
import DesktopSidebar from '@/components/Sidebar/DesktopSidebar';
import { GripVertical } from 'lucide-react';
import SpaceComponent from '@/components/SpaceComponent/SpaceComponent';

export default function Space() {
  const theme = localStorage.getItem('vite-ui-theme');
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
  }, [theme]);

  const handleMenuClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen flex bg-zinc-300 dark:bg-zinc-800">
      {/* Sidebar container */}
      <div
        className={`fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out h-full ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <DesktopSidebar />
      </div>
      {showSidebar && (
        <div className="fixed inset-0 bg-black/80 z-40" onClick={handleMenuClick}></div>
      )}

        <SpaceComponent />

      
      <div className='fixed top-2 flex justify-between w-fit p-3 md:hidden items-center'>
        <div className="md:hidden" onClick={handleMenuClick}>
          <GripVertical className='h-5 w-5' />
        </div>
      </div>
    </div>
  );
}
