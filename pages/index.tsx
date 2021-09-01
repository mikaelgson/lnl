/** @jsxImportSource theme-ui */

import { GetStaticProps } from "next"
import { FC } from "react"
import { Box, Grid, Heading } from "theme-ui"
import CategoryList from "../components/CategoryList"
import ProductList from "../components/ProductList"
import { getCategories, getPopularProducts, getProducts } from "../lib/store"
import { Product } from "../types"

type Props = {
  products: Product[]
  categories: string[]
}

const StartPageTemplate: FC<Props> = ({ products, categories }) => {
  return (
    <Grid gap={5}>
      <Grid>
        <Heading as="h1">Categories</Heading>
        <CategoryList categories={categories} />
      </Grid>

      <Grid>
        <Heading as="h1">Popular</Heading>
        <ProductList products={products} />
      </Grid>
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const [products, categories] = await Promise.all([getPopularProducts(), getCategories()])

  return {
    props: {
      products,
      categories,
    },
    revalidate: 10,
  }
}

export default StartPageTemplate
