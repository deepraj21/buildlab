import { useEffect, useState } from "react";
import { User2, ArrowLeftCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModeToggle from "../Theme/mode-toggle";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import AboutBuildLab from "../About/AboutBuildLab";

const ProfileHeader = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("buildlabUser");
        setUser(storedUser);
    }, []);

    const logout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem("buildlabUser");
        localStorage.removeItem("token");
        setUser(null);
    };
    return (
        <div>
            {!user ? (
                <>
                    <div className="w-full items-center flex flex-col justify-center cursor-pointer">
                        <ModeToggle />
                        <span className='text-[12px] p-1 hidden md:block'>theme</span>
                    </div>
                    <div className="w-full items-center flex flex-col justify-center pt-1 md:pt-3 cursor-pointer" onClick={() => { navigate('/auth') }}>
                        <User2 className='h-6 w-6' />
                        <span className='text-[12px] p-1 hidden md:block'>Signin</span>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <div className="w-full items-center flex flex-col justify-center md:pt-4 pt-3 cursor-pointer">
                                <AlertCircle style={{ transform: 'rotate(180deg)' }} className='h-6 w-6' />
                                <span className='text-[12px] p-1 hidden md:block'>About</span>
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <AboutBuildLab />
                        </SheetContent>
                    </Sheet>
                </>
            ) : (
                <>
                    <div className="w-full items-center flex flex-col justify-center pb-1 cursor-pointer">
                        <ModeToggle />
                        <span className='text-[12px] p-1 hidden md:block'>theme</span>
                    </div>
                    {/* <div className="w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer">
                        <Settings className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300" />
                        <span className='text-[12px] p-1 hidden md:block'>settings</span>
                    </div> */}
                    <div className="w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer">
                        <User2 className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300" />
                        <span className='text-[12px] p-1 hidden md:block w-[60px] overflow-x-scroll'>{user}</span>
                    </div>
                    <div className="w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer" onClick={logout}>
                        <ArrowLeftCircle className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300" />
                        <span className='text-[12px] p-1 hidden md:block'>Logout</span>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <div className="w-full items-center flex flex-col justify-center md:pt-2 pt-3 cursor-pointer">
                                <AlertCircle style={{ transform: 'rotate(180deg)' }} className='h-6 w-6' />
                                <span className='text-[12px] p-1 hidden md:block'>About</span>
                            </div>
                        </SheetTrigger>
                        <SheetContent>
                            <AboutBuildLab />
                        </SheetContent>
                    </Sheet>
                </>
            )}
        </div>
    )
}

export default ProfileHeader