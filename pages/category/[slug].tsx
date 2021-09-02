/** @jsxImportSource theme-ui */

import { Grid, Heading, Select } from "@theme-ui/components"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import { Router, useRouter } from "next/dist/client/router"
import { FC, useCallback, useEffect, useState } from "react"
import ProductList from "../../components/ProductList"
import { getCategories, getCategoryByName } from "../../lib/store"
import { CategoryResult, Product, SortOption } from "../../types"

type Props = {
  result: CategoryResult
  category: string
}

const CategoryPageTemplate: FC<Props> = ({ category, result }) => {
  const router = useRouter()
  const [value, setValue] = useState<string>(result.query.active ? result.query.active : "popular")

  const onSortOptionChanged = useCallback(
    (e) => {
      setValue(e.target.value)

      router.push(
        `/category/${category}?${new URLSearchParams({
          sort: e.target.value,
        })}`
      )
    },
    [router, value]
  )

  return (
    <Grid>
      <Select value={value} onChange={onSortOptionChanged} sx={{ textTransform: "capitalize" }}>
        {result.query.options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      <Heading as="h1">{category}</Heading>
      <ProductList products={result.products} />
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const { slug } = params as { slug: string }
  const { sort } = query as { sort: string }
  const [result, categories] = await Promise.all([getCategoryByName(slug, sort), getCategories()])

  return {
    props: {
      result,
      category: slug,
      categories,
    },
  }
}

export default CategoryPageTemplate
