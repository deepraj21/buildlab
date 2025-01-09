import { Atom, Plus, Search, Globe, Settings, User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CreateSpace from '@/components/CreateSpace/CreateSpace'
import { Authentication } from '@/components/Auth/Authentication'
import { useEffect } from 'react'
import SpaceNameDisplay from '../SpaceNameDisplay/SpaceNameDisplay'

const DesktopSidebar = () => {
    const isLoggedIn = localStorage.getItem('token');
    useEffect(() => {
    }, [isLoggedIn])
    
    return (
        <div className="md:w-24 w-14 flex flex-col items-center py-2 space-y-6">
            <div className=' pt-2'>
                <Atom className="w-12 h-12 hover:scale-110 transition ease-in-out duration-300" strokeWidth={1.3} />
                <span className='text-[14px] p-1 hidden md:block'>space</span>
            </div>
            <div className='w-full flex flex-col items-center'>
                <div className='w-full items-center flex flex-col justify-center pt-2 pb-2'>
                    <Search className="w-6 h-6" />
                    <span className='text-[12px] p-1 hidden md:block'>search</span>
                </div>
                <div className='w-full items-center flex flex-col justify-center pt-2 pb-2'>
                    <Globe className="w-6 h-6" />
                    <span className='text-[12px] p-1 hidden md:block'>explore</span>
                </div>
                <div className='pt-3'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div className='flex flex-col items-center justify-center'>
                               <Button variant='outline' className='dark:border-zinc-700 rounded-full h-10 w-10'>
                                <Plus className="w-6 h-6" />
                            </Button>
                                <span className='text-[12px] p-1 hidden md:block'>create</span> 
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='md:max-w-[400px]'>
                            {
                                isLoggedIn ? <CreateSpace /> : <Authentication />
                            }
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className='w-[80%] border-b border-zinc-500'></div>
            <div className='overflow-y-scroll' style={{ height: 'calc(50vh - 20px)' }}>
                <SpaceNameDisplay/>
            </div>
            <div className='w-fit flex flex-col items-center absolute bottom-2'>
                <div className=''>
                    <Button variant='outline' className='dark:border-zinc-700 rounded-full h-10 w-10'>
                        <User2 className="w-6 h-6" />
                    </Button>
                </div>
                <div className='w-full items-center flex justify-center pt-3 pb-3'>
                    <Settings className="w-6 h-6" />
                </div>
            </div>
        </div>
    )
}

export default DesktopSidebar