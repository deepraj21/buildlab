import { useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
    _id: string;
    name: string;
    description: string;
    users: { length: number };
}

interface SpaceNameDisplayProps {
    projects: Project[];
    isLoading: boolean;
}

const SpaceNameDisplay: React.FC<SpaceNameDisplayProps> = ({ projects, isLoading }) => {
    const navigate = useNavigate();

    const renderProjectItem = (project: Project) => {
        if (!project || !project.name) {
            return null;
        }

        return (
            <div 
                key={project._id}
                onClick={() => { navigate(`/space/${project._id}`, { state: { project } }) }}
                className='p-2 border rounded-lg cursor-pointer hover:bg-[#20B8CD]/40'
            >
                <div className="flex flex-row gap-2">
                    <div className="md:w-16 md:h-16 w-10 h-10 flex items-center justify-center my-auto rounded-[10px] bg-[#20B8CD]/60">
                        <span className="text-sm text-foreground">
                            {project.name.slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <h2 className='font-semibold'>{project.name}</h2>
                        <div className='w-[200px] truncate'>
                             <span>{project.description}</span>
                        </div>
                       
                        <div className="flex gap-2">
                            <p><small><i className="ri-user-line"></i> Collaborators</small>:</p>{project.users.length}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderSkeletonItem = () => (
        <div className='p-2 border rounded-lg'>
            <div className="flex flex-row gap-2">
                <Skeleton className="md:w-16 md:h-16 w-10 h-10 rounded-[10px]" />
                <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-2">
            {isLoading
                ? Array(7).fill(null).map((_, index) => (
                    <div key={index}>{renderSkeletonItem()}</div>
                  ))
                : projects.slice().reverse().map(renderProjectItem)
            }
        </div>
    );
};

export default SpaceNameDisplay;