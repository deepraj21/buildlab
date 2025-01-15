import { useEffect, useState } from "react";
import axios from "@/config/axios"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLocation } from "react-router-dom";
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

interface FileTree {
    [key: string]: {
        filename: string;
        content: string;
    };
}

interface User {
    _id: string;
    email: string;
}

interface Project {
    _id: string;
    name: string;
    users: User[];
    description: string;
    fileTree: FileTree;
}

export function SpaceInfo() {
    const location = useLocation();
    const [project, setProject] = useState<Project>(location.state.project);

    useEffect(() => {
        axios
            .get(`/projects/get-project/${location.state.project._id}`)
            .then((res) => {
                setProject(res.data.project);
            })
            .catch(console.error);
    }, [project._id, location.state.project._id]);

    return (
        <SheetContent>
            <SheetHeader className='border-b p-4'>
                <SheetTitle className='flex flex-col items-center justify-center'>
                    <div className="md:w-24 md:h-24 w-24 h-24 flex items-center justify-center my-auto rounded-full dark:bg-zinc-800 bg-stone-100">
                        <span className="text-sm text-foreground">
                            {project.name.slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                    <span>{project.name}</span>
                </SheetTitle>
            </SheetHeader>
            <SheetDescription className='p-4 flex flex-col border-b'>
                <span className='text-[26px] pb-4'>Description:</span>
                {
                    project.description ? <span>{project.description}</span> : <span>No Description found</span>
                }
            </SheetDescription>
            <SheetDescription className='p-4 flex flex-col'>
                <span className='text-[26px] pb-4'>Collabrators:</span>
                <div>
                    <ScrollArea className="h-full">
                        <div className="space-y-4">
                            {project.users && project.users.length > 0 ? (
                                project.users.map((user) => (
                                    <div key={user._id} className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarFallback>{user.email}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No users available</p>
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </SheetDescription>
        </SheetContent>
    )
}