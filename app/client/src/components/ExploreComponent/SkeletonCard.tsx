import { Card, CardContent } from "@/components/ui/card"

export const SkeletonCard = () => (
    <Card className="h-[70vh] md:h-full overflow-hidden bg-transparent relative z-10">
        <CardContent className="p-0 flex flex-col h-full">
            <div className="relative aspect-video overflow-hidden border-b bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="flex flex-col gap-2 p-4 flex-grow bg-muted/80 backdrop-blur-sm">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
            </div>
        </CardContent>
    </Card>
)