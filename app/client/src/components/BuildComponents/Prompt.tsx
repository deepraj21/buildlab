import dedent from "dedent";
// import { SchemaType } from "@google/generative-ai";

export default {
  CODE_GEN_PROMPT: dedent`

Generate a detailed and production-ready React project using Vite as the build tool.If codeHistory is provided in the bottom then only change the required part not the entire code. Organize the code into multiple components, grouping them into logical folders. Use filenames with the .js extension, adhering to best practices for React development. The project should fully utilize Tailwind CSS for styling to create visually stunning and responsive designs. Avoid using third-party dependencies unless explicitly specified, except for the following cases:

1. Icons from the "lucide-react" library can be used if necessary, restricted to these icons: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. Example usage:
   import { Heart } from "lucide-react";
   <Heart className="" />

2. The following libraries may be used only upon request or when absolutely necessary for specific functionalities:
   - date-fns: For date formatting.
   - react-chartjs-2: For creating charts and graphs.
   - firebase: For backend services.
   - @google/generative-ai: For advanced AI integrations.

Use Tailwind CSS to ensure an elegant, responsive, and modern user interface. For placeholder images, use the following image URL: https://archive.org/download/placeholder-image/placeholder-image.jpg. Where suitable, include relevant emoji icons to enhance the user experience.

In your designs, aim for excellence: make webpages fully featured and beautiful, avoiding cookie-cutter templates. Ensure the designs are ready for production use, with optimized and clean code. The final project should:
- Have logical folder structures.
- Include a clear explanation of the purpose and functionality of each component.
- Include a main entry point with a fully functional App component.
- Optionally feature reusable components for headers, footers, navigation, and content sections.

The response should follow this JSON schema:
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}

Ensure that:
1. The "files" field contains all created files, with their respective code included in the "code" field.
2. The "generatedFiles" field lists all filenames created in the project.
3. The explanation field provides a comprehensive summary of the project, its structure, and functionality.

Additionally:
- Use stock images from unsplash where appropriate, linking directly to valid URLs.
- Use JSX syntax and Tailwind CSS classes.
- Incorporate React hooks where necessary for functionality.
- Use Lucide React icons appropriately to enhance UI aesthetics.

Every response should include clear, detailed code for each component, ensuring the project can be directly used for production or further development. Do not deviate from these guidelines unless explicitly instructed.

And if previous history is provided them update the needed part of the code only according to the user's request. 
`

}

// const schema = {
//   description: "Search results in structured format",
//   type: SchemaType.OBJECT,
//   properties: {
//     projectTitle: {
//       type: SchemaType.STRING,
//       description: "Title of the project"
//     },
//     explanation: {
//       type: SchemaType.STRING,
//       description: "Detailed explanation of the topic"
//     },
//     files: {
//       type: SchemaType.OBJECT,
//       description: "Object of files and their content",
//       properties: {},
//       additionalProperties: {
//         type: SchemaType.OBJECT,
//         properties: {
//           code: {
//             type: SchemaType.STRING,
//             description: "File content"
//           }
//         },
//         required: ["code"],
//         description: "File and its content"
//       }
//     },
//     generatedFiles: {
//       type: SchemaType.ARRAY,
//       items: {
//         type: SchemaType.STRING
//       },
//       description: "List of generated files"
//     }
//   },
//   required: ["projectTitle", "explanation", "files"]
// };

// - The lucide-react library is also available to be imported IF NECCESARY ONLY FOR THE FOLLOWING ICONS: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Clock, Heart, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight. Here's an example of importing and using one: import { Heart } from "lucide-react"\` & \<Heart className=""  />\. PLEASE ONLY USE THE ICONS IF AN ICON IS NEEDED IN THE USER'S REQUEST.
