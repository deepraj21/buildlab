import { Atom, Search, Globe, GlobeLock, Sparkles, Umbrella, ArrowRight, Paperclip, HelpCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"

const HomeSearch = () => {
  return (
      <div className='pt-2 pr-2 pb-2 w-full'>
          <div className='border h-full flex justify-center items-center rounded-md bg-white dark:bg-zinc-900'>
              <div className="flex-1 p-8 max-w-5xl w-full flex justify-center items-center">
                  <div className="space-y-8">
                      <div className='flex items-center justify-center'>
                          <Atom className="w-20 h-20 animate-pulse" strokeWidth={1.3} />
                      </div>

                      <h1 className="text-4xl font-normal text-center mb-12">What we are building today?</h1>

                      {/* Search Input */}
                      <div className="relative">
                          <div className="absolute top-1/2 -translate-y-1/2 flex items-center space-x-2 pl-2">
                              <Paperclip className="w-4 h-4" />
                              <div className="h-6 w-px bg-zinc-700" />
                              <Search className="w-4 h-4" />
                          </div>
                          <Input
                              placeholder="Search for anything..."
                              className="w-full rounded-lg py-6 pl-16 pr-32"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-4">
                              <div className="h-6 w-px bg-zinc-700" />
                              <div className="flex items-center space-x-2">
                                  <GlobeLock className="w-5 h-5" />
                                  <Switch />
                              </div>
                          </div>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                          <Card className="p-3 hover:bg-muted cursor-pointer dark:bg-transparent">
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                      <Sparkles className="w-5 h-5 text-blue-400" />
                                      <span className='text-sm w-[85%] truncate'>Was ist Perplexity AI?</span>
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-gray-400" />
                              </div>
                          </Card>
                          <Card className="p-3 hover:bg-muted transition-colors cursor-pointer dark:bg-transparent">
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                      <Umbrella className="w-5 h-5 text-green-400" />
                                      <span className='text-sm w-[85%] truncate'>Skigebiet mit dem meisten Saison</span>
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-gray-400" />
                              </div>
                          </Card>
                          <Card className="p-4 hover:bg-muted transition-colors cursor-pointer dark:bg-transparent">
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                      <Globe className="w-5 h-5 text-orange-400" />
                                      <span className='text-sm w-[85%] truncate'>Top-Kochbücher in 2025</span>
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-gray-400" />
                              </div>
                          </Card>
                          <Card className="p-4 hover:bg-muted transition-colors cursor-pointer dark:bg-transparent">
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                      <Sparkles className="w-5 h-5 text-purple-400" />
                                      <span className='text-sm w-[85%] truncate'>Am besten bewertete </span>
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-gray-400" />
                              </div>
                          </Card>
                      </div>
                  </div>

                  {/* Footer */}
                  <footer className="fixed bottom-6 right-6 flex items-center justify-center text-sm text-gray-400">
                      <HelpCircle className="w-6 h-6" />
                  </footer>
              </div>
          </div>
      </div>
  )
}

export default HomeSearch