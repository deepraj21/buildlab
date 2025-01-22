import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import { Code, Bug, GitGraphIcon as Git, Terminal, Database, Server, Cloud, Lock, Cpu, Wifi } from 'lucide-react';

const reviews = [
    {
        icon: Code,
        body: "What's your favorite programming language?",
    },
    {
        icon: Bug,
        body: "How do you debug a tricky issue?",
    },
    {
        icon: Git,
        body: "Git rebase or merge?",
    },
    {
        icon: Terminal,
        body: "Vim or Emacs?",
    },
    {
        icon: Database,
        body: "SQL or NoSQL?",
    },
    {
        icon: Server,
        body: "Monolith or microservices?",
    },
    {
        icon: Cloud,
        body: "AWS, Azure, or GCP?",
    },
    {
        icon: Lock,
        body: "How do you handle API security?",
    },
    {
        icon: Cpu,
        body: "What's your take on serverless?",
    },
    {
        icon: Wifi,
        body: "REST or GraphQL?",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    icon: Icon,
    body,
    onClick,
}: {
    icon: React.ElementType;
    body: string;
    onClick: () => void;
}) => {
    return (
        <figure
            className={cn(
                "relative w-fit cursor-pointer overflow-hidden rounded-xl border pt-1 pb-1 pl-2 pr-2",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-muted dark:hover:bg-[#20B8CD]/30",
            )}
            onClick={onClick}
        >
            <div className="flex items-center space-x-2">
                <Icon className="h-3 w-3 text-[#20B8CD]" />
                <blockquote className="text-[10px]">{body}</blockquote>
            </div>
        </figure>
    );
};

export function HomeMarquee({ setSearchQuery }: { setSearchQuery: (query: string) => void }) {
    return (
        <div className="flex w-full flex-col items-center justify-center overflow-hidden mb-6 relative md:max-w-2xl max-w-[330px]">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review, index) => (
                    <ReviewCard key={`first-${index}`} {...review} onClick={() => setSearchQuery(review.body)} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((review, index) => (
                    <ReviewCard key={`second-${index}`} {...review} onClick={() => setSearchQuery(review.body)} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-zinc-900"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-zinc-900"></div>
        </div>
    );
}

