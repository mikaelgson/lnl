import { Product } from "../../types"

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

export const getCategoryByName = async (name: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/category/${name}`)
  const json: Product[] = await response.json()
  return json
}
