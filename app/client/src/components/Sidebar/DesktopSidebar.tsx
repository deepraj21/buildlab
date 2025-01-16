import { Atom, Search, Globe, Inbox } from 'lucide-react'
import { useEffect } from 'react'
import SpaceNameDisplay from '../SpaceNameDisplay/SpaceNameDisplay'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import ProfileHeader from '../HomeSearch/ProfileHeader'

const DesktopSidebar = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('token');
    useEffect(() => {
        <SpaceNameDisplay />
    }, [isLoggedIn])
    
    return (
        <div className="md:w-24 w-20 flex flex-col items-center py-2 space-y-3 justify-between bg-zinc-300 dark:bg-zinc-800 h-full">
            <div className='w-full flex flex-col items-center space-y-3'>
                <div className=' pt-2 cursor-pointer' onClick={() => navigate('/')}>
                    <Atom className="w-12 h-12 hover:scale-110 transition ease-in-out duration-300" strokeWidth={1.3} />
                </div>
                <div className='w-full flex flex-col items-center'>
                    <div className={`w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer ${location.pathname === '/' ? 'border-r-2 dark:border-white border-zinc-900 bg-zinc-900' : ''}`} onClick={() => navigate('/')}>
                        <Search className={`w-6 h-6 hover:scale-110 transition ease-in-out duration-300 ${location.pathname === '/' ? 'text-[#20B8CD]' : ''}`} />
                        <span className='text-[12px] p-1 hidden md:block'>search</span>
                    </div>
                    <div className={`w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer ${location.pathname === '/explore' ? 'border-r-2 dark:border-white border-zinc-900 bg-zinc-900' : ''}`} onClick={() => navigate('/explore')}>
                        <Globe className={`w-6 h-6 hover:scale-110 transition ease-in-out duration-300 ${location.pathname === '/explore' ? 'text-[#20B8CD]' : ''}`} />
                        <span className='text-[12px] p-1 hidden md:block'>explore</span>
                    </div>
                    <Sheet>
                        <SheetTrigger>
                            <div className='w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer'>
                                <Inbox className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300" />
                                <span className='text-[12px] p-1 hidden md:block'>spaces</span>
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Are you absolutely sure?</SheetTitle>
                                <SheetDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className='pb-1'>
                <ProfileHeader/>
            </div>
        </div>
    )
}

export default DesktopSidebar