import { useState, useEffect } from 'react'
import { categories, articles } from './data'
import { useSwipeable } from 'react-swipeable'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

const ExploreComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState('for-you')
    const [currentCardIndex, setCurrentCardIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)
        return () => window.removeEventListener('resize', checkIsMobile)
    }, [])

    const filteredArticles = selectedCategory === 'for-you'
        ? articles
        : articles.filter(article => article.category === selectedCategory)

    const handlers = useSwipeable({
        onSwipedUp: () => {
            if (currentCardIndex < filteredArticles.length - 1) {
                setDirection(1)
                setCurrentCardIndex(currentCardIndex + 1)
            }
        },
        onSwipedDown: () => {
            if (currentCardIndex > 0) {
                setDirection(-1)
                setCurrentCardIndex(currentCardIndex - 1)
            }
        },
        preventScrollOnSwipe: true,
        trackMouse: true
    })

    const cardVariants = {
        enter: (direction: number) => ({
            y: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            y: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            y: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        }),
    }

    const renderArticle = (article: { id: string, image: string, title: string, excerpt: string, author: string, category: string }, index: number) => (
        <motion.div
            key={article.id}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
            className={`w-full ${isMobile ? 'h-[calc(100vh-200px)]' : ''} relative`}
            style={{
                display: isMobile ? (index === currentCardIndex ? 'block' : 'none') : 'block',
            }}
        >
            <div
                className="absolute inset-0 h-[60vh] bg-cover bg-center filter blur-xl md:blur-none opacity-50 z-0 rounded-lg md:hidden block"
                style={{ backgroundImage: `url(${article.image || "/placeholder.svg"})` }}
            />
            <Card className="h-[70vh] md:h-full overflow-hidden bg-transparent relative z-10 overflow-hidden">
                <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-video overflow-hidden border-b">
                        <img
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col gap-2 p-4 flex-grow bg-muted/80 backdrop-blur-sm">
                        <h2 className="text-xl font-semibold">{article.title}</h2>
                        <p className="flex-grow">{article.excerpt}</p>
                        <div className="flex items-center gap-2 text-sm">
                            <span>{article.author}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {isMobile && index < filteredArticles.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black-900 to-transparent z-20 flex items-center justify-center">
                    <div className="w-20 h-2 darK:bg-white bg-zinc-800 rounded-full opacity-50 animate-bounce" />
                </div>
            )}
        </motion.div>
    )

    return (
        <div className="md:p-2 md:ml-[87px] w-full">
            <div className="border h-full flex flex-col justify-center items-center rounded-md bg-white dark:bg-zinc-900">
                <div className='max-w-4xl w-full'>
                    <nav className="sticky top-0 z-30 backdrop-blur-sm">
                        <div className="container mx-auto px-3">
                            <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setSelectedCategory(category.id)
                                            setCurrentCardIndex(0)
                                        }}
                                        className={`whitespace-nowrap px-3 py-1 rounded-full text-sm transition-colors ${selectedCategory === category.id
                                            ? 'bg-[#20B8CD] text-primary-foreground'
                                                : 'text-gray-400 dark:hover:text-white hover:text-gray-600'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main
                        className={`overflow-hidden mx-auto px-4 py-8 ${isMobile ? 'h-[calc(100vh-200px)]' : 'h-[85vh] overflow-y-auto'
                            }`}
                        {...handlers}
                    >
                        <div className={`${isMobile ? '' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max'
                            }`}>
                            <AnimatePresence initial={false} custom={direction}>
                                {filteredArticles.map((article, index) =>
                                    isMobile ? (
                                        index === currentCardIndex && renderArticle(article, index)
                                    ) : (
                                        renderArticle(article, index)
                                    )
                                )}
                            </AnimatePresence>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default ExploreComponent

