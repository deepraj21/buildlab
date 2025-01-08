import { Atom, Plus, Search, Globe, Settings, User2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CreateSpace from '@/components/CreateSpace/CreateSpace'
import { Authentication } from '@/components/Auth/Authentication'

const DesktopSidebar = () => {
    const isLoggedIn = localStorage.getItem('token');
    
    return (
        <div className="w-24 flex flex-col items-center py-2 space-y-6">
            <div className='pb-4 pt-2'>
                <Atom className="w-12 h-12" strokeWidth={1.3} />
            </div>
            <div className='w-full flex flex-col items-center'>
                <div className='w-full items-center flex justify-center pt-3 pb-3'>
                    <Search className="w-6 h-6" />
                </div>
                <div className='w-full items-center flex justify-center pt-3 pb-3'>
                    <Globe className="w-6 h-6" />
                </div>
                <div className='pt-3'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant='outline' className='dark:border-zinc-700 rounded-full h-10 w-10'>
                                <Plus className="w-6 h-6" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='md:max-w-[400px]'>
                            {
                                isLoggedIn ? <CreateSpace /> : <Authentication />
                            }
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className='flex-grow flex'></div>
            <div className='w-full flex flex-col items-center'>
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