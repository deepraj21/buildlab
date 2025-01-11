import { Atom, Plus, Search, Globe } from 'lucide-react'
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
import { useNavigate } from 'react-router-dom'

const DesktopSidebar = () => {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem('token');
    useEffect(() => {
    }, [isLoggedIn])
    
    return (
        <div className="md:w-24 w-20 md:flex flex-col items-center py-2 space-y-6 hidden">
            <div className=' pt-2 cursor-pointer' onClick={() => navigate('/')}>
                <Atom className="w-12 h-12 hover:scale-110 transition ease-in-out duration-300" strokeWidth={1.3}/>
                <span className='text-[14px] p-1 hidden md:block'>space</span>
            </div>
            <div className='w-full flex flex-col items-center'>
                <div className='w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer' onClick={() => navigate('/')}>
                    <Search className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300" />
                    <span className='text-[12px] p-1 hidden md:block'>search</span>
                </div>
                <div className='w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer' onClick={() => navigate('/explore')}>
                    <Globe className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300"/>
                    <span className='text-[12px] p-1 hidden md:block'>explore</span>
                </div>
                <div className='pt-3'>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div className='flex flex-col items-center justify-center'>
                                <Button variant='outline' className='dark:border-zinc-700 rounded-full h-10 w-10 hover:scale-110 transition ease-in-out duration-300'>
                                <Plus className="w-6 h-6 " />
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
            <div className='overflow-y-scroll'>
                <SpaceNameDisplay/>
            </div>
        </div>
    )
}

export default DesktopSidebar