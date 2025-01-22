import { cn } from "@/lib/utils"
import Marquee from "@/components/ui/marquee"
import {
    ListTodo,
    Calendar,
    Calculator,
    CloudRainWindIcon as Weather,
    MessageSquare,
    Music,
    ShoppingCart,
    Map,
    Clock,
    Camera,
} from "lucide-react"

const reviews = [
    {
        icon: ListTodo,
        body: "Build a todo list app",
    },
    {
        icon: Calendar,
        body: "Create a calendar app",
    },
    {
        icon: Calculator,
        body: "Develop a calculator",
    },
    {
        icon: Weather,
        body: "Make a weather forecast app",
    },
    {
        icon: MessageSquare,
        body: "Build a real-time chat application",
    },
    {
        icon: Music,
        body: "Create a music player",
    },
    {
        icon: ShoppingCart,
        body: "Develop an e-commerce product page",
    },
    {
        icon: Map,
        body: "Build a maps and location app",
    },
    {
        icon: Clock,
        body: "Create a pomodoro timer",
    },
    {
        icon: Camera,
        body: "Develop a photo gallery app",
    },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
    icon: Icon,
    body,
    onClick,
}: {
    icon: React.ElementType
    body: string
    onClick: () => void
}) => {
    return (
        <figure
            className={cn(
                "relative w-fit cursor-pointer overflow-hidden rounded-xl border pt-1 pb-1 pr-2 pl-2",
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
    )
}

export function BuildMarquee({ setSearchQuery }: { setSearchQuery: (query: string) => void }) {
    return (
        <div className="md:max-w-2xl max-w-[330px] flex w-full flex-col items-center justify-center overflow-hidden mb-6 relative">
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
    )
}

