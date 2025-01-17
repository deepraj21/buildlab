import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Settings,ArrowLeftCircle,User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
              <Button
                  variant="outline"
                  className="dark:border-zinc-700 rounded-full h-11 bg-muted -rotate-90 mb-8 dark:bg-zinc-900"
                  onClick={() => { navigate('/auth')}}
              >
                  SignIn <User2 className="w-6 h-6" />
              </Button>

          ) : (
              <DropdownMenu>
                  <DropdownMenuTrigger>
                      <Button variant="outline" className="dark:border-zinc-700 rounded-full h-11 bg-muted">
                          {user[0].toUpperCase()}
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuItem className="cursor-pointer">
                          <Settings />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                          <ArrowLeftCircle />
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
          )}
    </div>
  )
}

export default ProfileHeader