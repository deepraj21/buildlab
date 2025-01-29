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
import { EllipsisVertical, Search, MessageSquareLock, ArrowUp, PlusCircle, X, MinusCircle, Code2Icon, MessageSquareTextIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SpaceInfo } from './SpaceInfo';
import { format } from 'date-fns';
import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-circle"
import Lookup from '../BuildComponents/Lookup';

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

// interface AiResults {
//     projectTitle: string;
//     explanation: string;
//     files: {
//         [key: string]: {
//             code: string;
//         };
//     };
//     generatedFiles: string[];
// }

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
    const [showCode, setShowCode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<Set<string>>(new Set());
    const [project] = useState<Project>(location.state.project);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [files, setFiles] = useState(Lookup?.DEFAULT_FILE)
    const user = localStorage.getItem('buildlabUser');

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

    };

    // useEffect(() => {
    //     const processMessages = messages.map((msg) => {
    //         if (msg.sender?._id === 'ai') {
    //             const messageObject = JSON.parse(msg.message || '{}');
    //             const mergedFiles = { ...Lookup.DEFAULT_FILE, ...messageObject?.files };
    //             setFiles(mergedFiles);
    //             return {
    //                 ...msg,
    //                 explanation: messageObject.explanation,
    //             };
    //         }
    //         return msg;
    //     });
    //     setMessages(processMessages);
    // }, [messages]);
    
    // function processMessages(response: AiResults[]) {
    //     const mergedFiles = { ...Lookup.DEFAULT_FILE };
    //     response.forEach(result => {
    //         Object.assign(mergedFiles, result.files);
    //     });
    //     setFiles(mergedFiles);
    // }

    function WriteAiMessage(message: string) {

        const messageObject = JSON.parse(message)
        
        // processMessages(messageObject);

        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...messageObject?.files}
        
        setFiles(mergedFiles);
        

        return (
            messageObject.explanation
        )
    }

    useEffect(() => {
        if (!location.state || !location.state.project) return;

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

            setMessages((prevMessages) => {
                const exists = prevMessages.some(
                    (msg) => msg.timestamp === messageData.timestamp && msg.sender._id === messageData.sender._id
                );
                return exists ? prevMessages : [...prevMessages, messageData];
            });

        };

        receiveMessage('project-message', handleMessage);

        return () => {
            socket.disconnect();
        };
    }, [project._id]);

    return (
        <div className='md:p-2 md:ml-[87px] w-full'>
            <main className="flex rounded-md bg-white dark:bg-zinc-900 border overflow-hidden">
                {/* Left Section */}

                {
                    !showCode &&
                    (
                        <section className="left relative flex flex-col md:w-[30%] w-full border-r md:h-[97.8vh] h-[99.8vh]">
                            <div className="rounded-none border-b flex flex-row justify-between p-2 items-center">
                                <div className='flex flex-row gap-2 pl-8 md:pl-0'>
                                    <div className='flex flex-col'>
                                        <Sheet>
                                            <SheetTrigger>
                                                <span className='text-[20px]'>{project.name}</span>
                                            </SheetTrigger>
                                            <SpaceInfo />
                                        </Sheet>
                                    </div>
                                </div>
                                <div className='flex felx-row'>
                                    <Button variant="ghost" size='sm' className='rounded-full w-9 h-9'><Search /></Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="ghost" size='sm' className='rounded-full w-9 h-9'><EllipsisVertical /></Button>
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
                                    <Button variant="ghost" size='sm' className='rounded-full w-9 h-9 md:hidden block' onClick={() => { setShowCode(true) }} ><Code2Icon /></Button>
                                </div>
                            </div>

                            <ScrollArea className="h-full">
                                <div className="p-4 space-y-1">
                                    <div className="items-center flex flex-col pb-2">
                                        <Badge variant="secondary" className="text-center text-[10px] w-fit">
                                            <MessageSquareLock className="h-3 w-3 mr-2" />Messages are end-to-end encrypted.
                                        </Badge>
                                    </div>
                                    {messages.map((msg, index) => (
                                        msg && msg.sender ? (
                                            <Card key={msg._id || index} className={`rounded-[10px] overflow-hidden ${msg.sender._id === user ? 'ml-auto' : ''} w-fit`}>
                                                <CardContent className="pr-2 pl-2 pt-0 pb-0 bg-muted/80">
                                                    <div className="flex gap-1 pt-1 pb-1">
                                                        {msg.sender._id !== 'ai' ? (
                                                            <>
                                                                <p className="text-sm w-fit">{msg.message}</p>
                                                                <span className="text-[10px] text-gray-500 flex flex-col justify-end">
                                                                    {isNaN(new Date(msg.timestamp).getTime()) ? 'Invalid date' : format(new Date(msg.timestamp), 'HH:mm a')}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="text-sm w-fit">{WriteAiMessage(msg.message)}</p>
                                                            </>
                                                        )}
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

                    )
                }


                {
                    showCode &&
                    (
                        <section className="w-full md:h-[97.8vh] h-[99.8vh]">
                            <Tabs defaultValue="code">
                                <div className='p-[11px] flex flex-row justify-between items-center'>
                                    <div className='pl-6 md:pl-0 -mt-1'>
                                        <TabsList>
                                            <TabsTrigger value="code">Code</TabsTrigger>
                                            <TabsTrigger value="preview">Preview</TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <Button variant="ghost" size='sm' className='rounded-full w-8 h-8 md:hidden block' onClick={() => { setShowCode(false) }} ><MessageSquareTextIcon /></Button>
                                </div>

                                <SandpackProvider template="react" theme={"dark"}
                                    files={files}
                                    customSetup={
                                        {
                                            dependencies: {
                                                ...Lookup.DEPENDANCY
                                            }
                                        }
                                    }
                                    options={
                                        {
                                            externalResources: ['https://cdn.tailwindcss.com']
                                        }
                                    }
                                    key={JSON.stringify(files)}
                                >
                                    <SandpackLayout style={{ borderRadius: '0', borderLeft: '0', borderBottom: '0' }} >
                                        <TabsContent value="code" className='flex w-full'>
                                            <div className='border-r border-b-none'>
                                                <SandpackFileExplorer style={{ height: '92vh', width: '40vw', borderRadius: '0', borderBottom: '0' }} />
                                            </div>

                                            <SandpackCodeEditor style={{ height: '92vh', borderRadius: '0', borderBottom: '0' }}
                                                showTabs
                                                showLineNumbers={true}
                                                showInlineErrors
                                                wrapContent
                                                closableTabs />
                                        </TabsContent>
                                        <TabsContent value="preview" className='flex w-full'>
                                            <SandpackPreview style={{ height: '92vh', borderRadius: '0' }} showNavigator showRefreshButton={true} showRestartButton />
                                        </TabsContent>
                                    </SandpackLayout>
                                </SandpackProvider>
                            </Tabs>
                        </section>
                    )

                }

                <section className="w-full md:h-[97.8vh] h-[99.8vh] hidden md:block">
                    <Tabs defaultValue="code">
                        <div className='p-[11px] flex flex-row justify-between items-center'>
                            <div className='pl-6 md:pl-0'>
                                <TabsList>
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                </TabsList>
                            </div>
                            <Button variant="ghost" size='sm' className='rounded-full w-9 h-9 md:hidden block' onClick={() => { setShowCode(false) }} ><MessageSquareTextIcon /></Button>
                        </div>

                        <SandpackProvider template="react" theme={"dark"}>
                            <SandpackLayout style={{ borderRadius: '0', borderLeft: '0', borderBottom: '0' }} >
                                <TabsContent value="code" className='flex w-full'>
                                    <div className='border-r border-b-none'>
                                        <SandpackFileExplorer style={{ height: '92vh', width: '15vw', borderRadius: '0', borderBottom: '0' }} />
                                    </div>

                                    <SandpackCodeEditor style={{ height: '92vh', borderRadius: '0', borderBottom: '0' }}
                                        showTabs
                                        showLineNumbers={true}
                                        showInlineErrors
                                        wrapContent
                                        closableTabs />
                                </TabsContent>
                                <TabsContent value="preview" className='flex w-full'>
                                    <SandpackPreview style={{ height: '92vh', borderRadius: '0' }} showNavigator showRefreshButton={true} showRestartButton />
                                </TabsContent>
                            </SandpackLayout>
                        </SandpackProvider>
                    </Tabs>
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
