import {
    Atom,
    Search,
    ArrowUp,
    Component,
    Code2,
    ArrowDown,
    Code,
    ArrowUpRightSquare,
    X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useEffect, useState, useRef } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SchemaType } from "@google/generative-ai";
import { LinkPreviewFetcher } from "./link-preview-fetcher";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ProfileHeader from "./ProfileHeader";

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
    
    const [searchQuery, setSearchQuery] = useState("");
    const [chatHistory, setChatHistory] = useState<Chats[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [splitView, setSplitView] = useState(false);
    interface File {
        name: string;
        content: string;
    }

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    

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
                    items: {
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
            <div className="border h-full flex flex-row justify-center items-center rounded-md bg-white dark:bg-zinc-900">
                <ResizablePanelGroup
                    direction="horizontal"
                >
                    <ResizablePanel className="w-full flex justify-center items-center" minSize={30} defaultSize={40}>
                        {/* Main Content */}
                        <div className="p-3 max-w-3xl w-full flex justify-center items-center min-w-3xl">
                            <div className="space-y-4">

                                {/* Header */}
                                <header className="fixed flex top-6 right-6 text-sm text-gray-400">
                                    <ProfileHeader/>
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
                                                                            <LinkPreviewFetcher url={resource} />
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
                                                                            <div className="border rounded-lg p-1 w-fit bg-muted/50 cursor-pointer hover:bg-muted/100">
                                                                                <div className="flex felx-row justify-between items-center gap-2">
                                                                                    <div className="flex flex-row items-center gap-1">
                                                                                        <Code />
                                                                                        <span className="overflow-x-auto w-[90%]">
                                                                                            {file.name}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex flex-row items-center gap-1 text-blue-500 hover:underline" onClick={() => {
                                                                                        setSelectedFile(file);
                                                                                        setSplitView(true);
                                                                                    }}>
                                                                                        {/* <span>open</span> */}
                                                                                        <ArrowUpRightSquare className="h-4 w-4" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
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
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearch();
                                                }
                                            }}
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
                    </ResizablePanel>
                    
                    {splitView && (
                        <>
                            <ResizableHandle withHandle className="hidden md:flex" />
                            <ResizablePanel defaultSize={60} minSize={30} className="hidden md:block">
                                <div className="border-b w-full">
                                    <div className="flex flex-row border-r w-fit items-center gap-2 pt-1 pb-1 pl-1 pr-1 bg-muted/50">
                                        <h2 className="text-md">{selectedFile?.name}</h2>
                                        <X className="h-4 w-4" />
                                    </div>
                                </div>

                                <div className="h-[93vh] overflow-y-auto ">
                                    <SyntaxHighlighter language="python" showLineNumbers style={tomorrowNight}>
                                        {selectedFile?.content || ""}
                                    </SyntaxHighlighter>
                                </div>
                            </ResizablePanel>
                        </>
                    )}

                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default HomeSearch;
