
import { useEffect } from 'react'
import DesktopSidebar from '@/components/Sidebar/DesktopSidebar'

import HomeSearch from '@/components/HomeSearch/HomeSearch'

export default function Home() {
    const theme = localStorage.getItem('vite-ui-theme')
    useEffect(() => {
    }, [theme])
    return (
        <div className="min-h-screen flex bg-zinc-300 dark:bg-zinc-800">
            <DesktopSidebar />
            <HomeSearch />
        </div>
    )
}

