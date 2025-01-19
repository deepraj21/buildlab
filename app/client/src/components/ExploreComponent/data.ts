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
    image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?cs=srgb&dl=pexels-stywo-1054218.jpg&fm=jpg',
    author: 'quantum_researcher'
  },
  {
    id: '2',
    title: 'Global Markets Rally',
    excerpt: 'Stock markets worldwide show strong performance...',
    category: 'finance',
    image: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
    author: 'market_analyst'
  },
  {
    id: '3',
    title: 'New Art Exhibition Opens',
    excerpt: 'Contemporary artists showcase groundbreaking works...',
    category: 'arts-culture',
    image: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg',
    author: 'art_critic'
  },
  {
    id: '4',
    title: 'Championship Finals Results',
    excerpt: 'Dramatic conclusion to the season as underdogs prevail...',
    category: 'sports',
    image: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg',
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

