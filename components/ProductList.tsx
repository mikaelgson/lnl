/** @jsxImportSource theme-ui */

import { Box, Grid } from "@theme-ui/components"
import { FC } from "react"
import { Product } from "../types"
import ProductCard from "./ProductCard"

type Props = {
  products: Product[]
}

const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid
      columns={["repeat(auto-fill, minmax(164px, 1fr))", "repeat(auto-fill, minmax(210px, 1fr))"]}
      gap={[3, 4]}
    >
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />
      })}
    </Grid>
  )
}

export default ProductList
