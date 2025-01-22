import { Atom,ArrowUp, ArrowDown,Code, Timer,CalendarDays,Copy,Download,} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResizableHandle,ResizablePanel,ResizablePanelGroup,} from "@/components/ui/resizable"
import { toast } from "sonner";
import BlurFade from "@/components/ui/blur-fade";
import { BuildMarquee } from "./BuildMarquee";
import {SandpackProvider,SandpackLayout,SandpackCodeEditor,SandpackPreview,SandpackFileExplorer} from "@codesandbox/sandpack-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-circle"
import Lookup from "./Lookup";
import Prompt from "./Prompt";

interface Results {
    projectTitle: string;
    explanation: string;
    files: {
        [key: string]: {
            code: string;
        };
    };
    generatedFiles: string[];
}

interface Chats {
    query: string;
    response: Results;
    responseTime: number;
    timestamp: Date;
}

interface Code {
    query: string;
    response: Results;
}

const BuildComponent = () => {

    const theme = localStorage.getItem('vite-ui-theme') || 'dark';
    const [searchQuery, setSearchQuery] = useState("");
    const [chatHistory, setChatHistory] = useState<Chats[]>([]);
    const [codeHistory, setCodeHistory] = useState<Code[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [files, setFiles] = useState(Lookup?.DEFAULT_FILE)
    const [ showCodebase,setShowCodebase ] = useState(false);

    useEffect(() => {
    }, [files, theme]);


    const copyChatToClipboard = (chat: Chats) => {
        const chatText = JSON.stringify(chat, null, 2);
        navigator.clipboard.writeText(chatText).then(() => {
            toast.success('Chat copied to clipboard');
        }).catch((err) => {
            console.error('Failed to copy chat to clipboard:', err);
            toast.error('Failed to copy chat to clipboard');
        });
    };

    const downloadChatAsJson = (chat: Chats) => {
        const chatText = JSON.stringify(chat, null, 2);
        const blob = new Blob([chatText], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${chat.query}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setInputDisabled(true);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);

        try {
            const model = genAI.getGenerativeModel({
                model: "models/gemini-1.5-flash",
                generationConfig: {
                    responseMimeType: "application/json",
                },
            });

            const prompt = Prompt.CODE_GEN_PROMPT;
            const startTime = Date.now();

            const FinalPrompt = searchQuery + "Here is the query and below is my prompt and keep these things in mind while developing the" + prompt + "Here is the previous history containing the query and your response" + JSON.stringify(codeHistory);

            const result = await model.generateContent(FinalPrompt);

            const structuredResponse = JSON.parse(result.response.text());

            setCodeHistory((prevCode) => [
                ...prevCode,
                {
                    query: searchQuery,
                    response: structuredResponse,
                },
            ]);

            const endTime = Date.now();

            const duration = endTime - startTime;


            const mergedFiles={...Lookup.DEFAULT_FILE,...structuredResponse?.files}

            setFiles(mergedFiles);

            setChatHistory((prevChats) => [
                ...prevChats,
                {
                    query: searchQuery,
                    response: structuredResponse,
                    responseTime: duration,
                    timestamp: new Date(),
                },
            ]);
            setSearchQuery("");
        } catch (err) {
            console.error("Search error:", err);
            toast.error("Failed to fetch search results. Please try again.");
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
        <div className="md:p-2 md:ml-[87px] w-full ">
            <div className="border h-full flex flex-row justify-center items-center rounded-md bg-white dark:bg-zinc-900 pt-4 md:pt-0">
                <ResizablePanelGroup
                    direction="horizontal"
                >
                    <ResizablePanel className="w-full flex justify-center items-center" minSize={30} defaultSize={40}>
                        {/* Main Content */}
                        {
                            showCodebase ? (
                                <div className="absolute top-3 z-10 right-11 block md:hidden">
                                    <Button variant="outline" className="h-8 text-sm rounded-full" size='sm' onClick={() => setShowCodebase(false)}>
                                        Show Chat
                                    </Button>
                                </div>
                            ) : (
                                <div className="absolute top-3 z-10 right-11 block md:hidden">
                                    <Button variant="outline" className="h-8 text-sm rounded-full" size='sm' onClick={() => setShowCodebase(true)}>
                                        Show CodeBase
                                    </Button>
                                </div>
                            )
                        }
                        
                        <div className="p-3 max-w-3xl w-full flex justify-center items-center min-w-3xl">
                            
                            <div className="space-y-4">
                                {/* Header */}
                                {
                                    chatHistory.length == 0 && (
                                        <div className="transition-opacity duration-500">
                                            <div className="flex items-center justify-center mb-6">
                                                <Atom className="w-20 h-20 animate-pulse text-[#20B8CD]" strokeWidth={1.3} />
                                            </div>
                                            <h1 className="md:text-4xl text-2xl font-normal text-center mb-6">
                                                What we are building?
                                            </h1>
                                            <div className="w-full ml-5 md:ml-0">
                                                <BuildMarquee setSearchQuery={setSearchQuery} />
                                            </div>
                                        </div>
                                    )
                                }
                               
                                {/* Search Input */}
                                {
                                    !showCodebase && (
                                        <>
                                            {
                                                chatHistory.length > 0 && (
                                                    <div className="space-y-4 pt-1 h-[80vh] overflow-y-auto max-w-3xl" ref={chatContainerRef}>
                                                        {chatHistory.map((chat, index) => (
                                                            <div key={index} className="mb-4">
                                                                <BlurFade delay={0.25} inView>
                                                                    <div className="text-[34px] flex flex-row items-center gap-2">{chat.query}</div>
                                                                    <div className="flex flex-col gap-2">
                                                                        <div className="flex gap-1 border items-center bg-muted w-fit pl-1 pr-1 rounded-md">
                                                                            <CalendarDays className="h-3 w-3 text-[#20B8CD]" />
                                                                            <h2 className="text-[12px]">{chat.timestamp.toString().split('(')[0].trim()}</h2>
                                                                        </div>
                                                                    </div>
                                                                </BlurFade>
                                                                <BlurFade delay={0.25 * 2} inView>
                                                                    <div className="pt-6">
                                                                        <div className="flex gap-2 items-center">
                                                                            <Atom className="h-5 w-5 text-[#20B8CD]" />
                                                                            <h2 className="text-xl">Response:</h2>
                                                                        </div>
                                                                        <div className="pt-2">
                                                                            <span className="text-sm">{chat.response.explanation}</span>
                                                                        </div>
                                                                        <div className="flex flex-row justify-between items-end">
                                                                            <div className="pt-4 flex flex-row gap-2">
                                                                                <div className="flex flex-row items-center gap-1 border bg-muted w-fit pl-1 pr-1 rounded-md cursor-pointer hover:bg-muted/50" onClick={() => copyChatToClipboard(chat)}>
                                                                                    <Copy className="h-3 w-3 text-[#20B8CD]" />
                                                                                    <h2 className="text-[12px]">Copy</h2>
                                                                                </div>
                                                                                <div className="flex flex-row items-center gap-1 border bg-muted w-fit pl-1 pr-1 rounded-md cursor-pointer hover:bg-muted/50" onClick={() => downloadChatAsJson(chat)}>
                                                                                    <Download className="h-3 w-3 text-[#20B8CD]" />
                                                                                    <h2 className="text-[12px]">Download</h2>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex gap-1 items-center border bg-muted w-fit pl-1 pr-1 rounded-md">
                                                                                <Timer className="h-3 w-3 text-[#20B8CD]" />
                                                                                <h2 className="text-[12px]">Res Time: {chat.responseTime}ms</h2>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <hr className="border-t mt-4" />
                                                                </BlurFade>
                                                            </div>

                                                        ))}
                                                    </div>
                                                )
                                            }
                                            <div className="p-2 rounded-full dark:bg-muted/40 bg-muted">
                                                <div className="relative">
                                                    <div className="absolute top-1/2 -translate-y-1/2 flex items-center space-x-2 pl-4">
                                                        <Code className="w-4 h-4" />
                                                    </div>
                                                    <Input
                                                        placeholder="Build with BuildLab..."
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
                                                            className="w-8 h-8 rounded-full bg-[#20B8CD]/20 hover:bg-[#20B8CD]/40"
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
                                        </>
                                        
                                    )
                                }
                                
                            </div>
                        </div>
                    </ResizablePanel>

                    {chatHistory.length > 0 && (
                        <>
                            <ResizableHandle withHandle className="hidden md:flex" />
                            <ResizablePanel defaultSize={60} minSize={30} className="hidden md:block">
                                <section className="w-full md:h-[97.8vh] h-[99.8vh] hidden md:block">
                                    <Tabs defaultValue="code">
                                        <div className='p-[11px] flex flex-row justify-between items-center'>
                                            <div className='pl-6 md:pl-0'>
                                                <TabsList>
                                                    <TabsTrigger value="code">Code</TabsTrigger>
                                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                                </TabsList>
                                            </div>
                                        </div>

                                        <SandpackProvider template="react" theme={"dark"}
                                        files={files}
                                        customSetup={
                                            {
                                                dependencies:{
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
                            </ResizablePanel>

                        </>
                    )}

                    {
                        showCodebase && (
                            <section className="w-full md:h-[97.8vh] h-[99.8vh] pt-10">
                                <Tabs defaultValue="code">
                                    <div className='p-[11px] flex flex-row justify-between items-center'>
                                        <div>
                                            <TabsList>
                                                <TabsTrigger value="code">Code</TabsTrigger>
                                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                            </TabsList>
                                        </div>
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
                                                    <SandpackFileExplorer style={{ height: '89vh', width: '40vw', borderRadius: '0', borderBottom: '0' }} />
                                                </div>

                                                <SandpackCodeEditor style={{ height: '89vh', borderRadius: '0', borderBottom: '0' }}
                                                    showTabs
                                                    showLineNumbers={true}
                                                    showInlineErrors
                                                    wrapContent
                                                    closableTabs />
                                            </TabsContent>
                                            <TabsContent value="preview" className='flex w-full'>
                                                <SandpackPreview style={{ height: '89vh', borderRadius: '0' }} showNavigator showRefreshButton={true} showRestartButton />
                                            </TabsContent>
                                        </SandpackLayout>
                                    </SandpackProvider>
                                </Tabs>
                            </section>
                        )
                    }
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default BuildComponent;
