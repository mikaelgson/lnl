/** @jsxImportSource theme-ui */

import { Box, Card, Grid, Link as UILink } from "@theme-ui/components"
import Link from "next/link"
import { FC } from "react"

type Props = {
  categories: string[]
}

const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <Grid
      columns={["repeat(auto-fill, minmax(164px, 1fr))", "repeat(auto-fill, minmax(210px, 1fr))"]}
      gap={[3, 4]}
    >
      {categories.map((category) => {
        return (
          <Link href={`/category/${category}`} passHref key={category}>
            <UILink>
              <Card>{category}</Card>
            </UILink>
          </Link>
        )
      })}
    </Grid>
  )
}

export default CategoryList
