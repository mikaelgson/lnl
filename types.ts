export type Product = {
  id: number
  title: string
  price: string
  category: string
  description: string
  image: string
}

export type CategoryResult = {
  products: Product[]
  query: {
    active: SortOption | string
    options: SortOption[]
  }
}

export type SortOption = "price" | "popular" | "title"
