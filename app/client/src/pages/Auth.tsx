import { Authentication } from '@/components/Auth/Authentication'
import { AuroraText } from "@/components/ui/aurora-text";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { Atom } from 'lucide-react';
import { Meteors } from "@/components/ui/meteors";
import { useEffect } from 'react';

const Auth = () => {
  const theme = localStorage.getItem('vite-ui-theme');
  useEffect(() => {
  }, [theme]);
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-white dark:bg-zinc-900 w-full overflow-hidden">
      <Meteors number={30} />
      <div className="w-full max-w-5xl p-4 md:p-6 lg:p-8">
        <div className="grid md:grid-cols-[1fr,400px] gap-8">
          {/* Left section - hidden on mobile */}
          <div className="hidden md:block space-y-8 my-auto">
            <div className="space-y-2">
              <h1 className="text-1xl md:text-2xl lg:text-3xl">
                Welcome to<br /> <AuroraText className='sm:text-2xl md:text-3xl lg:text-6xl items-center gap-2' ><Atom className='h-12 w-12' /> buildlab</AuroraText>
              </h1>
            </div>

            <div className="space-y-4">
              <LineShadowText className="italic text-6xl" shadowColor="white">
                Features
              </LineShadowText>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Structured LLM response with code panel</li>
                <li>Create your team and use @ai</li>
                <li>Build React Projects with ai</li>
                <li>Projects supports codeEditor</li>
                {/* <li>Feeds on Explore Section</li> */}
              </ol>
            </div>
          </div>

          {/* Right section - Authentication component */}
          <div className="w-full md:w-auto">
            <AuroraText className='items-center gap-2 flex md:hidden justify-center text-[32px] pb-10'><Atom className='h-8 w-8'/> buildlab</AuroraText>
            <Authentication />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth