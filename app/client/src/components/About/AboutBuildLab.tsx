import { Atom } from "lucide-react"
import { LineShadowText } from "../ui/line-shadow-text"
import { AuroraText } from "../ui/aurora-text"

const AboutBuildLab = () => {
  return (
    <>
      <div className="p-3 border-b">
        <AuroraText className='text-5xl items-center gap-2' ><Atom className='h-11 w-11' /> buildlab</AuroraText>
      </div>
      <div className="p-3 border-b">
        <LineShadowText className="italic text-4xl" shadowColor="white" >
          About
        </LineShadowText>
        <div className="pt-2">
          BuildLab is a platform for searching and developing tech and also provides a space to collabrate with other developers and build cool stuffs and projects.
        </div>
      </div>
      <div className="p-3 border-b">
        <LineShadowText className="italic text-4xl" shadowColor="white" >
          Features
        </LineShadowText>
        <div className="pt-2">
          <ul className="list-disc list-inside">
            <li>Search with AI and WebScrap</li>
            <li>Build React Projects with AI <span className="bg-[#20B8CD]/30 rounded-full pl-2 pr-2 text-sm border w-fit">new</span></li>
            <li>Explore the Updated Tech Feeds</li>
            <li>Create a Private Space</li>
            <li>Add/Remove Collabrators and chat</li>
            <li>AI included in chat</li>
            <li>Collabrative Project Building</li>
          </ul>
        </div>
      </div>
      <div className="p-3 border-b">
        <LineShadowText className="italic text-4xl" shadowColor="white" >
          Social
        </LineShadowText>
        <div className="pt-2 flex flex-col">
          <a href="https://github.com/deepraj21" className="text-blue-500 hover:text-blue-700 hover:underline">
            Github
          </a>
          <a href="https://www.linkedin.com/in/deepraj-bera-b64996231" className="text-blue-500 hover:text-blue-700 hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="p-3 border-b">
        <LineShadowText className="italic text-4xl" shadowColor="white" >
          Version
        </LineShadowText>
        <div className="pt-2 flex flex-col">
          <div className="flex flex-row gap-1">
            <a href="https://github.com/deepraj21" className="text-blue-500 hover:text-blue-700 hover:underline">
            v0.0.2
          </a>
          <span className="bg-[#20B8CD]/30 rounded-full pl-2 pr-2 text-sm border w-fit">latest</span>
          </div>
          <div className="flex flex-row gap-1">
            <a href="https://github.com/deepraj21/buildlab/releases/tag/v0.0.1" className="text-blue-500 hover:text-blue-700 hover:underline">
              v0.0.1
            </a>
          </div>
          
        </div>
      </div>
    </>

  )
}

export default AboutBuildLab