interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  image: string
  author: string
}

interface Category {
  id: string
  name: string
  icon: string
}

export const categories: Category[] = [
  { id: 'for-you', name: 'For You', icon: 'Newspaper' },
  { id: 'tech-science', name: 'Tech & Science', icon: 'Rocket' },
  { id: 'finance', name: 'Finance', icon: 'BadgeDollarSign' },
  { id: 'arts-culture', name: 'Arts & Culture', icon: 'Palette' },
  { id: 'sports', name: 'Sports', icon: 'Trophy' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Tv' },
]

export const articles: Article[] = [
  {
    id: '1',
    title: 'Breakthrough in Quantum Computing',
    excerpt: 'Scientists achieve major milestone in quantum computing research...',
    category: 'tech-science',
    image: '/placeholder.svg?height=400&width=600',
    author: 'quantum_researcher'
  },
  {
    id: '2',
    title: 'Global Markets Rally',
    excerpt: 'Stock markets worldwide show strong performance...',
    category: 'finance',
    image: '/placeholder.svg?height=300&width=600',
    author: 'market_analyst'
  },
  {
    id: '3',
    title: 'New Art Exhibition Opens',
    excerpt: 'Contemporary artists showcase groundbreaking works...',
    category: 'arts-culture',
    image: '/placeholder.svg?height=500&width=600',
    author: 'art_critic'
  },
  {
    id: '4',
    title: 'Championship Finals Results',
    excerpt: 'Dramatic conclusion to the season as underdogs prevail...',
    category: 'sports',
    image: '/placeholder.svg?height=350&width=600',
    author: 'sports_reporter'
  },
  {
    id: '5',
    title: 'AI Developments in Healthcare',
    excerpt: 'New AI models show promising results in medical diagnosis...',
    category: 'tech-science',
    image: '/placeholder.svg?height=450&width=600',
    author: 'tech_journalist'
  },
  {
    id: '6',
    title: 'Cryptocurrency Market Update',
    excerpt: 'Bitcoin and other cryptocurrencies see significant movement...',
    category: 'finance',
    image: '/placeholder.svg?height=400&width=600',
    author: 'crypto_expert'
  },
  {
    id: '7',
    title: 'Cryptocurrency Market Update',
    excerpt: 'Bitcoin and other cryptocurrencies see significant movement...',
    category: 'finance',
    image: '/placeholder.svg?height=400&width=600',
    author: 'crypto_expert'
  },
  {
    id: '8',
    title: 'Cryptocurrency Market Update',
    excerpt: 'Bitcoin and other cryptocurrencies see significant movement...',
    category: 'finance',
    image: '/placeholder.svg?height=400&width=600',
    author: 'crypto_expert'
  },
  {
    id: '9',
    title: 'Cryptocurrency Market Update',
    excerpt: 'Bitcoin and other cryptocurrencies see significant movement...',
    category: 'finance',
    image: '/placeholder.svg?height=400&width=600',
    author: 'crypto_expert'
  },
  {
    id: '10',
    title: 'Cryptocurrency Market Update',
    excerpt: 'Bitcoin and other cryptocurrencies see significant movement...',
    category: 'finance',
    image: '/placeholder.svg?height=400&width=600',
    author: 'crypto_expert'
  },
]

