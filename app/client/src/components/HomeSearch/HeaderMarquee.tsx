import { useNavigate } from "react-router-dom";
import Marquee from "@/components/ui/marquee";
import {
    PartyPopper,
    Zap,
    ArrowRight,
    Code2,
    Atom
} from "lucide-react";

const HeaderMarquee = () => {
const navigate = useNavigate();
  return (
      <div className="bg-[#20B8CD]/30 md:w-[calc(100vw-106px)] w-full z-10 p-1 mt-[38px] md:mt-0 relative">
          <Marquee>
              <div className="flex flex-row gap-2 items-center px-4">
                  <PartyPopper className="h-4 w-4 flex-shrink-0" /> New Feature: Introducing <Zap className="h-4 w-4 flex-shrink-0" />{" "}
                  Build. Now create your <Code2 className="h-4 w-4 flex-shrink-0" /> Projects in{" "}
                  <Atom className="h-4 w-4 flex-shrink-0" /> BuildLab within minutes by just giving instructions and query. Also
                  Includes Memory and run your project with inbuilt codeEditor. <span className="underline cursor-pointer" onClick={() => { navigate('/build') }}>Visit</span> <ArrowRight />
              </div>
          </Marquee>
      </div>
  )
}

export default HeaderMarquee