import { AspectImage, Box, Button, Flex, Grid, Heading, Spinner, Text } from "@theme-ui/components"
import { GetStaticPaths, GetStaticProps } from "next"
import { FC } from "react"
import { getCategories, getProductById, getProducts } from "../../lib/store"
import { Product } from "../../types"
import useRelatedProducts from "../../lib/store/hooks/useRelatedProducts"
import ProductList from "../../components/ProductList"

type Props = {
  product: Product
}

const ProductPageTemplate: FC<Props> = ({
  product: { title, image, price, category, description, id },
}) => {
  const { data, error, loading } = useRelatedProducts(category, id)

  return (
    <Grid gap={5}>
      <Grid columns="1fr 2fr" gap={5}>
        <AspectImage sx={{ maxHeight: 400 }} src={image} />
        <Grid sx={{ alignSelf: "flex-start" }}>
          <Heading as="h1">{title}</Heading>
          <Text sx={{ fontWeight: "bold", fontSize: 4 }}>${price}</Text>
          <Text>{description}</Text>
          <Button>Add to cart</Button>
        </Grid>
      </Grid>

      <Grid>
        <Heading as="h2">More from this category</Heading>
        {!error && !loading ? (
          <ProductList products={data.products}></ProductList>
        ) : (
          <Flex sx={{ minHeight: 264, alignItems: "center", justifyContent: "center" }}>
            <Spinner></Spinner>
          </Flex>
        )}
      </Grid>
    </Grid>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allProducts = await getProducts()

  const paths = allProducts.map(({ id }) => ({
    params: {
      slug: id.toString(),
    },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const [product, categories] = await Promise.all([getProductById(slug), getCategories()])

  return {
    props: {
      product,
      categories,
    },
    revalidate: 10,
  }
}

export default ProductPageTemplate
