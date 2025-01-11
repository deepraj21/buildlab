import { useEffect } from 'react'
import DesktopSidebar from '@/components/Sidebar/DesktopSidebar'
import { Button } from '@/components/ui/button'
import HomeSearch from '@/components/HomeSearch/HomeSearch'
import { Atom, Globe, Search } from 'lucide-react'

export default function Home() {
    const theme = localStorage.getItem('vite-ui-theme')
    useEffect(() => {
    }, [theme])
    return (
        <div className="min-h-screen flex bg-zinc-300 dark:bg-zinc-800">
            <DesktopSidebar />
            <HomeSearch /> 
            <footer className="fixed bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-sm text-gray-400 md:hidden gap-7">
                <Button variant='outline' className='border-zinc-600 h-9 rounded-[20px]' ><Search/></Button>
                <Button variant='outline' className='border-zinc-600 h-9 rounded-[20px]' ><Atom/></Button>
                <Button variant='outline' className='border-zinc-600 h-9 rounded-[20px]' ><Globe/></Button>
            </footer>
        </div>
    )
}

