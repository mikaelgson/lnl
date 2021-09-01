import { Grid, Heading } from "@theme-ui/components"
import { GetStaticPaths, GetStaticProps } from "next"
import { FC } from "react"
import ProductList from "../../components/ProductList"
import { getCategories, getCategoryByName } from "../../lib/store"
import { Product } from "../../types"

type Props = {
  products: Product[]
  category: string
}

const CategoryPageTemplate: FC<Props> = ({ category, products }) => {
  return (
    <Grid>
      <Heading as="h1">{category}</Heading>
      <ProductList products={products} />
    </Grid>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await getCategories()

  const paths = allCategories.map((category) => ({
    params: {
      slug: category,
    },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const [products, categories] = await Promise.all([getCategoryByName(slug), getCategories()])

  return {
    props: {
      products,
      category: slug,
      categories,
    },
    revalidate: 10,
  }
}

export default CategoryPageTemplate
