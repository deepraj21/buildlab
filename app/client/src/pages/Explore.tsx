import { useEffect, useState } from 'react';
import DesktopSidebar from '@/components/Sidebar/DesktopSidebar';
import { AlignLeft } from 'lucide-react';
import ExploreComponent from '@/components/ExploreComponent/ExploreComponent';

export default function Explore() {
  const theme = localStorage.getItem('vite-ui-theme');
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => { }, [theme]);

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
      <ExploreComponent />
      <div className="fixed left-6 top-4 md:hidden" onClick={handleMenuClick}>
        <AlignLeft />
      </div>
    </div>
  );
}
