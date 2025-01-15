import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '@/config/axios';
import { initializeSocket, receiveMessage, sendMessage } from '@/config/socket';
import MarkdownIt from 'markdown-it';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EllipsisVertical, Search, MessageSquareLock, ArrowUp, PlusCircle, X, MinusCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SpaceInfo } from './SpaceInfo';
import { format } from 'date-fns';

const md: MarkdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str) {
        return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
});

interface User {
    _id: string;
    email: string;
}

interface Message {
    _id: string;
    sender: { _id: string; email: string };
    message: string;
    timestamp: string;
}

interface FileTree {
    [key: string]: {
        filename: string;
        content: string;
    };
}

interface Project {
    _id: string;
    name: string;
    users: User[];
    description: string;
    fileTree: FileTree;
}

const SpaceComponent: React.FC = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<Set<string>>(new Set());
    const [project] = useState<Project>(location.state.project);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    // const [fileTree, setFileTree] = useState<FileTree>({});
    const user = localStorage.getItem('spaceUser');
    const [previousChats, setPreviousChats] = useState<Message[]>([]);

    const handleUserClick = (id: string) => {
        setSelectedUserId((prevSelectedUserId) => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }
            return newSelectedUserId;
        });
    };

    const addCollaborators = () => {
        axios
            .put('/projects/add-user', {
                projectId: location.state.project._id,
                users: Array.from(selectedUserId),
            })
            .then((res) => {
                console.log(res.data);
                setIsModalOpen(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const send = () => {
        if (!message.trim()) return;

        const timestamp = new Date().toISOString();

        const newMessage = {
            _id: Date.now().toString(), 
            message,
            sender: { _id: user || '', email: '' },
            timestamp,
        };

        sendMessage('project-message', newMessage);

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');

        axios.post('/projects/save-chat', {
            projectId: project._id,
            message: newMessage,
        }).catch(console.error);
    };

    useEffect(() => {
        if (!project._id) return;

        axios
            .get(`/projects/get-chats/${project._id}`)
            .then((res) => {
                console.log('Previous chats:', res.data.chats);
                setPreviousChats(res.data.chats); // Update previousChats here
            })
            .catch(console.error);
    }, [project._id]);

    useEffect(() => {
        if (!location.state || !location.state.project) return;

        // axios
        //     .get(`/projects/get-project/${location.state.project._id}`)
        //     .then((res) => {
        //         setProject(res.data.project);
        //         setFileTree(res.data.project.fileTree || {});
        //     })
        //     .catch(console.error);

        axios
            .get('/users/all')
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch(console.error);
    }, [location.state]);

    useEffect(() => {
        if (!project._id) return;

        const socket = initializeSocket(project._id);

        const handleMessage = (data: unknown) => {
            const messageData = data as Message;

            // Prevent duplicates by checking if the message already exists
            setMessages((prevMessages) => {
                const exists = prevMessages.some(
                    (msg) => msg.timestamp === messageData.timestamp && msg.sender._id === messageData.sender._id
                );
                return exists ? prevMessages : [...prevMessages, messageData];
            });

            // Update file tree if message is from "ai" and contains file tree data
            // if (messageData.sender._id === 'ai') {
            //     try {
            //         const messageObject = JSON.parse(messageData.message);
            //         if (messageObject.fileTree) {
            //             setFileTree(messageObject.fileTree || {});
            //         }
            //     } catch (error) {
            //         console.error('Error parsing AI message:', error);
            //     }
            // }
        };

        receiveMessage('project-message', handleMessage);

        return () => {
            socket.disconnect(); // Clean up socket connection
        };
    }, [project._id]);

    // const saveFileTree = (ft: FileTree) => {
    //     axios
    //         .put('/projects/update-file-tree', {
    //             projectId: project._id,
    //             fileTree: ft,
    //         })
    //         .then((res) => {
    //             console.log(res.data);
    //         })
    //         .catch(console.error);
    // };

    return (
        <div className='pt-2 pr-2 pb-2 w-full'>
            <main className="flex rounded-md bg-white dark:bg-zinc-900 border overflow-hidden">
                {/* Left Section */}
                <section className="left relative flex flex-col md:w-[30%] w-full border-r" style={{ height: 'calc(100vh - 20px)' }}>
                    {/* Header */}
                    <div className="rounded-none border-b flex flex-row justify-between p-2 items-center">
                        <div className='flex flex-row gap-2'>
                            <div className="md:w-14 md:h-14 w-14 h-14 flex items-center justify-center my-auto rounded-full dark:bg-zinc-800 bg-stone-100">
                                <span className="text-sm text-foreground">
                                    {project.name.slice(0, 2).toUpperCase()}
                                </span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-[23px]'>{project.name}</span>
                                <Sheet>
                                    <SheetTrigger><span className='text-[10px]'>tap here for space info</span></SheetTrigger>
                                    <SpaceInfo />
                                </Sheet>
                            </div>
                        </div>
                        <div>
                            <Button variant="ghost" size='sm' className='rounded-full w-10 h-10'><Search /></Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size='sm' className='rounded-full w-10 h-10'><EllipsisVertical /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className='cursor-pointer' onClick={() => { setIsModalOpen(true) }} >
                                        <PlusCircle />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer' >
                                        <MinusCircle />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Conversation Area */}
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-1">
                            <div className="items-center flex flex-col pb-2">
                                <Badge variant="secondary" className="text-center text-[10px] w-fit">
                                    <MessageSquareLock className="h-3 w-3 mr-2" />Messages are end-to-end encrypted.
                                </Badge>
                            </div>
                            {[...previousChats, ...messages].map((msg, index) => (
                                msg && msg.sender ? (
                                    <Card key={msg._id || index} className={`rounded-[10px] overflow-hidden ${msg.sender._id === user ? 'ml-auto' : ''} w-fit`}>
                                        <CardContent className="pr-2 pl-2 pt-0 pb-0 bg-muted/80">
                                            <div className="flex gap-1 pt-1 pb-1">
                                                <p className="text-sm w-fit">{msg.message}</p>
                                                <span className="text-[10px] text-gray-500 flex flex-col justify-end">
                                                    {format(new Date(msg.timestamp), 'HH:mm a')}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ) : null
                            ))}
                        </div>
                    </ScrollArea>


                    {/* Input Field */}
                    <div className="p-4 border-t">
                        <div className="flex space-x-2">
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter message"
                                className='rounded-[30px]'
                                onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                            />
                            <Button onClick={send} variant="secondary" className='h-10 w-10 rounded-full'>
                                <ArrowUp />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Right Section */}
                <section className="right flex-grow flex flex-col">
                </section>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Card className="w-[90%] max-w-96">
                            <CardHeader className='flex flex-row items-center border-b justify-between'>
                                <CardTitle>Add User to {project.name}</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                                    <X />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px] pt-4">
                                    <div className="space-y-2">
                                        {users.map((user) => (
                                            <Button
                                                key={user._id}
                                                variant={selectedUserId.has(user._id) ? "secondary" : "ghost"}
                                                className="w-full justify-start"
                                                onClick={() => handleUserClick(user._id)}
                                            >
                                                <Avatar className="mr-2">
                                                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                {user.email}
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <Button className="mt-4 w-full" onClick={addCollaborators}>
                                    Add Collaborators
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>
        </div>

    );
};



export default SpaceComponent;
