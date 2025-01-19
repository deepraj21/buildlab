import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Settings, User2, ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModeToggle from "../Theme/mode-toggle";

const ProfileHeader = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("spaceUser");
        setUser(storedUser);
    }, []);

    const logout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem("spaceUser");
        localStorage.removeItem("token");
        setUser(null);
    };
    return (
        <div>
            {!user ? (
                <>
                    <div className="w-full items-center flex flex-col justify-center pb-10 cursor-pointer">
                        <ModeToggle/>
                        <span className='text-[12px] p-1 hidden md:block'>theme</span>
                    </div>
                    <Button
                        variant="outline"
                        className="dark:border-zinc-700 rounded-full h-11 bg-muted -rotate-90 mb-8 dark:bg-zinc-900"
                        onClick={() => { navigate('/auth') }}
                    >
                        SignIn <User2 className="w-6 h-6" />
                    </Button>
                </>

            ) : (
                <>
                    <div className="w-full items-center flex flex-col justify-center pb-2 cursor-pointer">
                        <ModeToggle/>
                        <span className='text-[12px] p-1 hidden md:block'>theme</span>
                    </div>
                    <div className="w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer">
                        <Settings className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300" />
                        <span className='text-[12px] p-1 hidden md:block'>settings</span>
                    </div>
                    <div className="w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer">
                        <User2 className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300" />
                        <span className='text-[12px] p-1 hidden md:block w-[60px] overflow-x-scroll'>{user}</span>
                    </div>
                    <div className="w-full items-center flex flex-col justify-center pt-2 pb-2 cursor-pointer" onClick={logout}>
                        <ArrowLeftCircle className="w-6 h-6 hover:scale-110 transition ease-in-out duration-300" />
                        <span className='text-[12px] p-1 hidden md:block'>Logout</span>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProfileHeader