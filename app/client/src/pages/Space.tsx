import { useEffect } from 'react'
import DesktopSidebar from '@/components/Sidebar/DesktopSidebar'
import SpaceComponent from '@/components/SpaceComponent/SpaceComponent'

export default function Space() {
  const theme = localStorage.getItem('vite-ui-theme')
  useEffect(() => {
  }, [theme])
  return (
    <div className="min-h-screen flex bg-zinc-300 dark:bg-zinc-800">
      <DesktopSidebar />
      <SpaceComponent />
    </div>
  )
}

