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
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EllipsisVertical, Search, MessageSquareLock, ArrowUp } from 'lucide-react';
import { Badge } from "@/components/ui/badge"

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
    sender: { _id: string; email: string };
    message: string;
}

interface FileTree {
    [key: string]: {
        file: { contents: string };
    };
}

interface Project {
    _id: string;
    name: string;
    users: User[];
    fileTree: FileTree;
}

const SpaceComponent: React.FC = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<Set<string>>(new Set());
    const [project, setProject] = useState<Project>(location.state.project);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [fileTree, setFileTree] = useState<FileTree>({});
    const [currentFile, setCurrentFile] = useState<string | null>(null);
    const [openFiles, setOpenFiles] = useState<string[]>([]);
    const user = localStorage.getItem('spaceUser');

    const renderMarkdown = (content: string) => {
        return { __html: md.render(content) };
    };

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
        if (!message) return;

        sendMessage('project-message', {
            message,
            sender: user,
        });
        setMessages((prevMessages) => [...prevMessages, { sender: { _id: user || '', email: '' }, message }]);
        setMessage('');
    };

    // const WriteAiMessage = (message: string) => {
    //     const messageObject = JSON.parse(message);
    //     return (
    //         <div className="overflow-auto bg-slate-950 text-white rounded-sm p-2">
    //             <Markdown
    //                 children={messageObject.text}
    //                 options={{
    //                     overrides: {
    //                         code: SyntaxHighlightedCode,
    //                     },
    //                 }}
    //             />
    //         </div>
    //     );
    // };

    useEffect(() => {
        initializeSocket(project._id);

        receiveMessage('project-message', (data : unknown) => {
            const messageData = data as Message;
            console.log(data);

            if (messageData.sender._id === 'ai') {
                const messageObject = JSON.parse(messageData.message);

                if (messageObject.fileTree) {
                    setFileTree(messageObject.fileTree || {});
                }
            }
            setMessages((prevMessages) => [...prevMessages, messageData]);
        });

        axios
            .get(`/projects/get-project/${location.state.project._id}`)
            .then((res) => {
                setProject(res.data.project);
                setFileTree(res.data.project.fileTree || {});
            })
            .catch(console.error);

        axios
            .get('/users/all')
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch(console.error);
    }, [project._id, location.state.project._id]);

    const saveFileTree = (ft: FileTree) => {
        axios
            .put('/projects/update-file-tree', {
                projectId: project._id,
                fileTree: ft,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch(console.error);
    };

    // const scrollToBottom = () => {
    //   if (messageBox.current) {
    //     messageBox.current.scrollTop = messageBox.current.scrollHeight;
    //   }
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
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Are you absolutely sure?</SheetTitle>
                                            <SheetDescription>
                                                <SpaceInfo/>
                                            </SheetDescription>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                        </div>
                    </div>
                    <div>
                        <Button variant="ghost" size='sm' className='rounded-full w-10 h-10'><Search /></Button>
                        <Button variant="ghost" size='sm' className='rounded-full w-10 h-10'><EllipsisVertical/></Button>
                    </div>
                </div>

                {/* Conversation Area */}
                <ScrollArea className="h-full" >
                    <div className="p-4 space-y-1">
                        <div className='items-center flex flex-col pb-2'>
                                <Badge variant="secondary" className='text-center text-[10px] w-fit'><MessageSquareLock className='h-3 w-3 mr-2'/>Messages are end-to-end encrypted.</Badge> 
                        </div>
                        {messages && messages.length > 0 &&
                            (messages.map((msg, index) => (
                                <Card key={index} className={` rounded-[10px] ${msg.sender._id === user ? 'ml-auto' : ''} w-fit`}>
                                    <CardContent className="p-2 pt-2">
                                        {msg.sender._id === 'ai' ? (
                                            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={renderMarkdown(msg.message)} />
                                        ) : (
                                            <p className="text-sm">{msg.message}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        )}
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
                        />
                        <Button onClick={send} variant="secondary" className='h-10 w-10 rounded-full'>
                                <ArrowUp />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Right Section */}
            <section className="right flex-grow flex flex-col hidden">
                <Tabs defaultValue="files" className="flex-grow">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="files">Files</TabsTrigger>
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                    </TabsList>
                    <TabsContent value="files" className="flex-grow">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-2">
                                {Object.keys(fileTree).map((file, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="w-full justify-start"
                                        onClick={() => {
                                            setCurrentFile(file);
                                            setOpenFiles([...new Set([...openFiles, file])]);
                                        }}
                                    >
                                        <i className="ri-file-code-line mr-2" />
                                        {file}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="editor" className="flex-grow flex flex-col">
                        <div className="border-b">
                            <ScrollArea className="whitespace-nowrap">
                                <div className="flex p-2 space-x-2">
                                    {openFiles.map((file, index) => (
                                        <Button
                                            key={index}
                                            variant={currentFile === file ? "secondary" : "ghost"}
                                            onClick={() => setCurrentFile(file)}
                                        >
                                            {file}
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                        <ScrollArea className="flex-grow">
                            {currentFile && fileTree[currentFile] && (
                                <pre className="p-4">
                                    <code
                                        className="language-javascript"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            const updatedContent = e.target.innerText;
                                            const ft = {
                                                ...fileTree,
                                                [currentFile!]: {
                                                    file: {
                                                        contents: updatedContent,
                                                    },
                                                },
                                            };
                                            setFileTree(ft);
                                            saveFileTree(ft);
                                        }}
                                    >
                                        {fileTree[currentFile!].file.contents}
                                    </code>
                                </pre>
                            )}
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Card className="w-96 max-w-full">
                        <CardHeader>
                            <CardTitle>Select User</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                                <i className="ri-close-line" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
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

function SpaceInfo() {
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
        <div>
            <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
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
    )
}

export default SpaceComponent;
