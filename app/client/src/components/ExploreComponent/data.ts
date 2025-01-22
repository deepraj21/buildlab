import axios from "@/config/axios"
import {
  Newspaper,
  Rocket,
  BadgeDollarSign,
  Palette,
  Trophy,
  Tv,
  Utensils,
  Globe,
  Book,
  Heart,
  Briefcase,
  Camera,
} from "lucide-react"

export interface Article {
  _id: string
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  icon: React.ElementType
}

export const categories: Category[] = [
  { id: "for-you", name: "For You", icon: Newspaper },
  { id: "tech-science", name: "Tech & Science", icon: Rocket },
  { id: "finance", name: "Finance", icon: BadgeDollarSign },
  { id: "arts-culture", name: "Arts & Culture", icon: Palette },
  { id: "sports", name: "Sports", icon: Trophy },
  { id: "entertainment", name: "Entertainment", icon: Tv },
  { id: "food-cooking", name: "Food & Cooking", icon: Utensils },
  { id: "travel", name: "Travel", icon: Globe },
  { id: "education", name: "Education", icon: Book },
  { id: "health-wellness", name: "Health & Wellness", icon: Heart },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "photography", name: "Photography", icon: Camera },
]

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await axios.get("/blogs/all")
    return response.data.map((item: Article) => ({
      id: item._id,
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      image: item.image,
      author: item.author,
      createdAt: item.createdAt,
    }))
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

