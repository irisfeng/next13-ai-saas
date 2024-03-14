// import { Icon } from "lucide-react";
// import { Badge } from "@/components/ui/badge"; // Import the Badge component
// import { cn } from "@/lib/utils";

// interface HeadingProps {
//   title: string;
//   description: string;
//   icon: Icon;
//   iconColor?: string;
//   bgColor?: string;
//   badgeText?: string; // Optional badge text property
//   showBadge?: number; // Property to determine if the badge is shown (1) or not (0), default is 0
// }

// export const Heading = ({
//   title,
//   description,
//   icon: Icon,
//   iconColor,
//   bgColor,
//   badgeText, // Destructure badgeText from props
//   showBadge = 0, // Default to 0 if not provided, meaning no badge is displayed by default
// }: HeadingProps) => {
//   return (
//     <>
//       <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
//         <div className={cn("p-2 w-fit rounded-md", bgColor)}>
//           <Icon className={cn("w-10 h-10", iconColor)} />
//         </div>
//         <div>
//           <h2 className="text-3xl font-bold">{title}</h2>
//           <p className="text-sm text-muted-foreground">
//             {description}
//             {/* Render the Badge component only if showBadge is 1 and badgeText is provided */}
//             {showBadge === 1 && badgeText && <Badge variant="premium" className="uppercase text-xs">{badgeText}</Badge>}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };
import { Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Import the Badge component
import { cn } from "@/lib/utils";
import { imageModels } from "@/constants"; // Import model constants


interface HeadingProps {
  title: string;
  description: string;
  icon: Icon;
  iconColor?: string;
  bgColor?: string;
  badgeText?: string; // Optional badge text property
  showBadge?: number; // Property to determine if the badge is shown (1) or not (0), default is 0
  imageModel?: keyof typeof imageModels; // Add model property
  showImgModel?: number; // Add showModel property
  selectedModel: string; // Add selectedModel property
  setSelectedModel: (model: string) => void; // Add setSelectedModel property
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
  badgeText, // Destructure badgeText from props
  showBadge = 0, 
  showImgModel = 0, 
  selectedModel,
  setSelectedModel,
}: HeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="flex items-center gap-x-1">
            <p className="text-sm text-muted-foreground">
              {description}
              {/* Render the Badge component only if showBadge is 1 and badgeText is provided */}
              {showBadge === 1 && badgeText && <Badge variant="premium" className="uppercase text-xs ml-1">{badgeText}</Badge>}
            </p>
            {/* Render a label and a select element for model constants only if showModel is 1 */}
            {showImgModel === 1  && (
              <div className="ml-3">
                {/* <label htmlFor="model-select" className="text-sm text-muted-foreground">支持模型：</label> */}
                <select 
                  id="model-select" 
                  value={selectedModel} 
                  className="text-sm text-muted-foreground"
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                    {Object.keys(imageModels).map((model) => (
                      <option value={model} key={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>
            
        </div>
      </div>
    </>
  );
};
