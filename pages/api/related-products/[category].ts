import { NextApiRequest, NextApiResponse } from "next"
import { getCategoryByName } from "../../../lib/store"

export default async function relatedProductsHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET")
      return res.status(405).json({ error: `Method: ${req.method} Not Allowed` })
    }

    const exclude = req.query.exclude as string
    const result = await getCategoryByName(req.query.category as string) // This route would not be hit unless the query is defined

    res.setHeader("Cache-Control", `s-maxage=10, stale-while-revalidate`)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
