import { useState } from 'react'
// import { X } from 'lucide-react'
import { categories, articles } from './data'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const ExploreComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState('for-you')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedInterests, setSelectedInterests] = useState<string[]>(['tech-science'])

    const filteredArticles = selectedCategory === 'for-you'
        ? articles
        : articles.filter(article => article.category === selectedCategory)
    return (
        <div className="pt-2 pr-2 pb-2 pl-2 w-full">
            <div className="border h-full flex flex-col justify-center items-center rounded-md bg-white dark:bg-zinc-900">
                <div className='max-w-4xl w-full'>
                    <nav className="sticky top-0 z-10 backdrop-blur-sm">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center gap-6 overflow-x-auto py-4 no-scrollbar">
                                {categories.map(category => (
                                    <Button
                                        key={category.id}
                                        variant='ghost'
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`whitespace-nowrap pl-2 pr-2 h-8 rounded-full text-sm transition-colors
                  ${selectedCategory === category.id
                                            ? 'bg-[#20B8CD]/30 text-white'
                                                : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="h-[85vh] overflow-y-scroll mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                            {filteredArticles.map(article => (
                                <article
                                    key={article.id}
                                    className="group relative flex flex-col gap-4 rounded-xl bg-muted p-4 transition-transform hover:-translate-y-1"
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-lg">
                                        <img
                                            src={article.image || "/placeholder.svg"}
                                            alt={article.title}

                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-xl font-semibold">{article.title}</h2>
                                        <p className="text-gray-400">{article.excerpt}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <span>{article.author}</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </main>

                    {/* Interests Modal */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Make it yours</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-6">
                                <p className="text-sm text-gray-500">
                                    Select topics and interests to customize your Discover experience
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.slice(1).map(category => (
                                        <Button
                                            key={category.id}
                                            variant={selectedInterests.includes(category.id) ? "default" : "outline"}
                                            onClick={() => {
                                                setSelectedInterests(prev =>
                                                    prev.includes(category.id)
                                                        ? prev.filter(id => id !== category.id)
                                                        : [...prev, category.id]
                                                )
                                            }}
                                            className="rounded-full"
                                        >
                                            {category.name}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full bg-teal-500 hover:bg-teal-600"
                                >
                                    Save Interests
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default ExploreComponent