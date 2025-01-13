import { ArrowUpRightSquare, Code } from "lucide-react";

const CodeBadge = ({ filename }: { filename: string }) => {
    return (
        <div className="border rounded-lg p-1 w-fit bg-muted/50 cursor-pointer hover:bg-muted/100">
            <div className="flex felx-row justify-between items-center gap-2">
                <div className="flex flex-row items-center gap-1">
                    <Code/>
                    <span className="overflow-x-auto w-[90%]">
                        {filename} 
                    </span>
                </div>
                <div className="flex flex-row items-center gap-1 text-blue-500 hover:underline">
                    <span>open</span>
                    <ArrowUpRightSquare className="h-4 w-4" />
                </div>
            </div>  
        </div>
    );
}

export default CodeBadge;