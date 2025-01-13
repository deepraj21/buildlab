import {
    Atom,
    Search,
    User2,
    ArrowUp,
    Settings,
    ArrowLeftCircle,
    Component,
    Code2,
    ArrowDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState, useRef } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Authentication } from "../Auth/Authentication";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai";
import { LinkPreviewFetcher } from "./link-preview-fetcher";
import CodeBadge from "./code-badge-preview";

interface Results {
    text: string;
    resources: string[];
    files: {
        name: string;
        content: string;
    }[];
}

interface Chats {
    query: string;
    response: Results;
}

const HomeSearch = () => {
    const [user, setUser] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [chatHistory, setChatHistory] = useState<Chats[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("spaceUser");
        setUser(storedUser);
    }, []);

    const logout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem("spaceUser");
        localStorage.removeItem("token");
        setUser(null);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setInputDisabled(true);
        setError(null);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);

        const schema = {
            description: "Search results in structured format",
            type: SchemaType.OBJECT,
            properties: {
                text: { type: SchemaType.STRING, description: "Detailed explanation of the topic" },
                resources: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING },
                    description: "Links to resources or documentation"
                },
                files: { 
                    type: SchemaType.ARRAY, 
                    items : {
                        type: SchemaType.OBJECT,
                        properties: {
                            name: { type: SchemaType.STRING, description: "File name" },
                            content: { type: SchemaType.STRING, description: "File content" }
                        },
                        required: ["name", "content"]
                    },
                    description: "Files and its content" 
                },
            },
            required: ["text"], 
        };

        try {
            const model = genAI.getGenerativeModel({
                model: "models/gemini-1.5-flash",
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema,
                },
            });

            const prompt = `

            As an expert software developer, provide the following information for the query: "${searchQuery}"
            Make sure of the following things:
            1. In the response the text property should contain a to the point,specific and short explanation of the topic and do not add any codes in this.
            2. The resources property should contain links to resources or documentation of any relevant to that topics atleast 2 and maximum 6.
            3. The files property should contain files and its content related to the topic.

            NOTE: make sure if question is technical or related to programming, development, coding then provide code snippets every time with proper relevant resources.
            `;
            const result = await model.generateContent(prompt);

            const structuredResponse = JSON.parse(result.response.text());
            console.log("Structured response:", structuredResponse);
            setChatHistory((prevChats) => [
                ...prevChats,
                {
                    query: searchQuery,
                    response: structuredResponse,
                },
            ]);
            setSearchQuery("");
        } catch (err) {
            console.error("Search error:", err);
            setError("Failed to fetch search results. Please try again.");
        } finally {
            setLoading(false);
            setInputDisabled(false);
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            setShowScrollButton(scrollTop < scrollHeight - clientHeight - 100);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener("scroll", handleScroll);
            return () => chatContainer.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div className="pt-2 pr-2 pb-2 w-full">
            <div className="border h-full flex flex-col justify-center items-center rounded-md bg-white dark:bg-zinc-900">
                
                {/* Main Content */}
                <div className="flex-1 p-3 max-w-3xl w-full flex justify-center items-center">
                    <div className="space-y-4">

                        {/* Header */}
                        <header className="fixed flex top-6 right-6 text-sm text-gray-400">
                            {!user ? (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" className="dark:border-zinc-700 rounded-full h-11">
                                            SignIn <User2 className="w-6 h-6" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="md:max-w-[400px]">
                                        <Authentication />
                                    </AlertDialogContent>
                                </AlertDialog>
                            ) : (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="outline" className="dark:border-zinc-700 rounded-full h-11">
                                            {user[0].toUpperCase()}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Settings />
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                                            <ArrowLeftCircle />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </header>

                        {/* Header */}
                        {
                            chatHistory.length == 0 && (
                                <div className="transition-opacity duration-500">
                                    <div className="flex items-center justify-center mb-12">
                                        <Atom className="w-20 h-20 animate-pulse" strokeWidth={1.3} />
                                    </div>

                                    <h1 className="md:text-4xl text-2xl font-normal text-center mb-12">
                                        What we are building today?
                                    </h1>
                                </div>
                            ) 
                        }
                        
                        {/* Search Results */}
                        {
                            error && (
                                <div className="flex flex-row gap-2 items-center border w-fit p-1 rounded-xl bg-red-700/20 justify-center mx-auto">
                                    <div className="text-[12px] text-red-700">{error}</div>
                                </div>
                            )
                        }
                        {
                            chatHistory.length > 0 && (
                                <div className="mt-4 space-y-4 h-[80vh] overflow-y-auto max-w-3xl" ref={chatContainerRef}>
                                    {chatHistory.map((chat, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="text-[34px] flex flex-row items-center gap-2">{chat.query}</div>
                                            <div className="pt-6">
                                                <div className="flex gap-2 items-center">
                                                   <Atom className="h-5 w-5" />
                                                    <h2 className="text-xl">Response:</h2> 
                                                </div>
                                                <div className="pt-2">
                                                   <span>{chat.response.text}</span> 
                                                </div>
                                                
                                                
                                                {chat.response.resources && (
                                                    <div className="pt-4 w-[300px]">
                                                        <div className="flex gap-2 items-center">
                                                            <Component className="h-5 w-5" />
                                                            <h2 className="text-xl">Resources:</h2>
                                                        </div>
                                                        <div>
                                                            {chat.response.resources.map((resource) => (   
                                                                <div className="pt-2">
                                                                    <LinkPreviewFetcher url={resource}/>
                                                                </div> 
                                                                
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {chat.response.files && (
                                                    <div className="pt-4 w-[300px]">
                                                        <div className="flex gap-2 items-center">
                                                            <Code2 className="h-5 w-5" />
                                                            <h2 className="text-xl">Code Files:</h2>
                                                        </div>
                                                        <div>
                                                            {chat.response.files.map((file) => (
                                                                <div className="pt-2">
                                                                    <CodeBadge filename={file.name} /> 
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <hr className="border-t border-zinc-700 mt-4" />
                                        </div>
                                        
                                    ))}
                                </div>
                            )
                        }

                        {/* Search Input */}
                        <div className="p-2 rounded-full bg-muted/40">
                            <div className="relative">
                                <div className="absolute top-1/2 -translate-y-1/2 flex items-center space-x-2 pl-4">
                                    <Search className="w-4 h-4" />
                                </div>
                                <Input
                                    placeholder="Search..."
                                    className="w-full rounded-full py-6 pl-10 pr-[55px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    disabled={inputDisabled}
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-4">
                                    <Button
                                        className="w-8 h-8 rounded-full"
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleSearch}
                                        disabled={loading}
                                    >
                                        {loading ? <Atom className="animate-spin" /> : <ArrowUp />}
                                    </Button>
                                </div>
                                {showScrollButton && (
                                    <Button
                                        className="absolute bottom-20 right-3 rounded-full h-8 w-8 animate-bounce"
                                        onClick={scrollToBottom}
                                        variant='secondary'
                                    >
                                        <ArrowDown className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                            
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
