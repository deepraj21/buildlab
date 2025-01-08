import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    AlertDialogDescription,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { Atom } from "lucide-react"
import Signup from "./Signup/Signup"
import Signin from "./Signin/Signin"

export function Authentication() {
    return (
        <>
            <AlertDialogHeader className='p-4 border-b flex flex-col items-center'>
                <Atom className="w-8 h-8" strokeWidth={1.3} />
                <h1 className="text-3xl text-center">Welcome to space</h1>
            </AlertDialogHeader>
            <AlertDialogDescription>
                <Tabs defaultValue="signup" className="w-[96%] mx-auto">  
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signup">SignUp</TabsTrigger>
                        <TabsTrigger value="signin">LogIn</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signup">
                       <Signup/>
                    </TabsContent>
                    <TabsContent value="signin">
                        <Signin/>
                    </TabsContent>
                </Tabs>
            </AlertDialogDescription>

        </>
        
    )
}
