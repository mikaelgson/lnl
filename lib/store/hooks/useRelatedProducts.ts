import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useRelatedProducts(category: string, exclude: number) {
  const { data, error } = useSWR(`/api/related-products/${category}?exclude=${exclude}`, fetcher)

  return {
    data,
    error,
    loading: !error && !data,
  }
}
