/** @jsxImportSource theme-ui */

import Link from "next/link"
import { FC } from "react"
import { Grid, Text, Link as UILink, AspectImage, Card } from "theme-ui"
import { Product } from "../types"

type Props = {
  product: Product
}

const ProductCard: FC<Props> = ({ product: { title, image, id, price } }) => {
  return (
    <Card>
      <Grid>
        <AspectImage src={image} />
        <Text sx={{ fontWeight: "bold" }}>${price}</Text>
        <Link href={`/product/${id}`} passHref>
          <UILink>
            <Text
              sx={{
                overflow: "hidden",
                wordBreak: "break-word",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                fontSize: 1,
                fontWeight: "bold",
                lineHeight: "heading",
              }}
            >
              {title}
            </Text>
          </UILink>
        </Link>
      </Grid>
    </Card>
  )
}

export default ProductCard
