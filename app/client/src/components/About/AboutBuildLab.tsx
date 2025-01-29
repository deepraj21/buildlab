import { Atom } from "lucide-react";
import { LineShadowText } from "../ui/line-shadow-text";
import { AuroraText } from "../ui/aurora-text";

const TwitterLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 256 256"
    xmlSpace="preserve"
  >
    <g
      style={{
        stroke: "none",
        strokeWidth: 0,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 10,
        fill: "none",
        fillRule: "nonzero",
        opacity: 1,
      }}
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
    >
      <path
        d="M 0.219 2.882 l 34.748 46.461 L 0 87.118 h 7.87 l 30.614 -33.073 l 24.735 33.073 H 90 L 53.297 38.043 L 85.844 2.882 h -7.87 L 49.781 33.341 L 27.001 2.882 H 0.219 z M 11.793 8.679 h 12.303 L 78.425 81.32 H 66.122 L 11.793 8.679 z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          fill: "currentcolor",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(1 0 0 1 0 0)"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const AboutBuildLab = () => {
  return (
    <>
      <div className="p-3 border-b">
        <AuroraText className="text-5xl items-center gap-2">
          <Atom className="h-11 w-11" /> buildlab
        </AuroraText>
      </div>
      <div className="p-3 border-b">
        <LineShadowText className="italic text-4xl" shadowColor="white">
          About
        </LineShadowText>
        <div className="pt-2">
          BuildLab is a platform for searching and developing tech and also
          provides a space to collaborate with other developers and build cool
          stuffs and projects.
        </div>
      </div>
      <div className="p-3 border-b">
        <LineShadowText className="italic text-4xl" shadowColor="white">
          Features
        </LineShadowText>
        <div className="pt-2">
          <ul className="list-disc list-inside">
            <li>Search with AI and WebScrap</li>
            <li>
              Build React Projects with AI{" "}
              <span className="bg-[#20B8CD]/30 rounded-full pl-2 pr-2 text-sm border w-fit">
                new
              </span>
            </li>
            {/* <li>Explore the Updated Tech Feeds</li> */}
            <li>Create a Private Space</li>
            <li>Add/Remove Collaborators and chat</li>
            <li>AI included in chat</li>
            <li>Collaborative Project Building</li>
          </ul>
        </div>
      </div>
      <div className="p-3 border-b">
        <LineShadowText className="italic text-4xl" shadowColor="white">
          Social
        </LineShadowText>
        <div className="pt-2 flex flex-col">
          <a
            href="https://x.com/buildlab_ai"
            className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-2"
          >
            <TwitterLogo />
          </a>
        </div>
      </div>
      <div className="p-3 border-b">
        <LineShadowText className="italic text-4xl" shadowColor="white" >
          Version
        </LineShadowText>
        <div className="pt-2 flex flex-col">
          <div className="flex flex-row gap-1">
            <a href="https://github.com/buildlab-ai/buildlab/releases/tag/v0.0.1" className="text-blue-500 hover:text-blue-700 hover:underline">
              v0.0.1
            </a>
            <span className="bg-[#20B8CD]/30 rounded-full pl-2 pr-2 text-sm border w-fit">latest</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutBuildLab;
