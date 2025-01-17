import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Signup from "./Signup/Signup"
import Signin from "./Signin/Signin"
import WordRotate from "@/components/ui/word-rotate";

export function Authentication() {
    return (
        <>
        <div className="pb-4 flex justify-center items-center">
           <WordRotate
                className="text-4xl"
                words={["Create Account", "Become Member", "Get Started"]}
            /> 
        </div>
            
            <Tabs defaultValue="signup" className="w-[96%] mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">SignUp</TabsTrigger>
                    <TabsTrigger value="signin">LogIn</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Signup />
                </TabsContent>
                <TabsContent value="signin">
                    <Signin />
                </TabsContent>
            </Tabs>
            <div>
                <p className="text-center text-gray-400 text-sm mt-4">
                    By entering your details, you agree to our <a href="/terms" className="text-[#20B8CD]">Terms of Service</a> and <a href="/privacy" className="text-[#20B8CD]">Privacy Policy</a>.
                </p>
            </div>
            
        </>
    )
}
