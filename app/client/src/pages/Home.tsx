import { useEffect, useState } from 'react';
import DesktopSidebar from '@/components/Sidebar/DesktopSidebar';
import HomeSearch from '@/components/HomeSearch/HomeSearch';
import { AlignLeft, CircleAlert } from 'lucide-react';

export default function Home() {
    const theme = localStorage.getItem('vite-ui-theme');
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => { }, [theme]);

    const handleMenuClick = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="h-screen flex bg-zinc-300 dark:bg-zinc-800">
            <div
                className={`fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out
                    ${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0`}
            >
                <DesktopSidebar />
            </div>
            {showSidebar && (
                <div className="fixed inset-0 bg-black/80 z-40" onClick={handleMenuClick}></div>
            )}
            <HomeSearch />

            <div className='fixed top-0 flex justify-between w-full p-4 backdrop-blur-sm md:hidden'>
                <div className="md:hidden" onClick={handleMenuClick}>
                    <AlignLeft />
                </div>
                <div className="md:hidden">
                    <span className='text-[20px]'>buildlab</span>
                </div>
                <div className="md:hidden">
                    <CircleAlert />
                </div>
            </div>
           
        </div>
    );
}
