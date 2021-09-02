import { Product, SortOption, CategoryResult } from "../../types"

export const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products")
  const json: Product[] = await response.json()
  return json
}

export const getPopularProducts = async () => {
  const products = await getProducts()
  return products.slice(0, 8)
}

export const getProductById = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  const json: Product = await response.json()
  return json
}

export const getCategories = async () => {
  const response = await fetch(`https://fakestoreapi.com/products/categories`)
  const json: string[] = await response.json()
  return json
}

export const getCategoryByName = async (name: string, sort?: string, exclude?: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${name}`)
  const json: Product[] = await response.json()
  const sortOptions: SortOption[] = ["popular", "price", "title"]

  const result: CategoryResult = {
    products: json,
    query: {
      active: sort ? sort : null,
      options: sortOptions,
    },
  }

  if (sort === "price") {
    result.products = json.sort((a, b) => (a.price > b.price ? 1 : -1))
  }

  if (sort === "title") {
    result.products = json.sort((a, b) => a.title.localeCompare(b.title))
  }

  if (exclude) {
    result.products = result.products.filter((product) => product.id !== Number(exclude))
  }

  return result
}
