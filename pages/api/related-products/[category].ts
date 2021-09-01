import { NextApiRequest, NextApiResponse } from "next"
import { getCategoryByName } from "../../../lib/store"

export default async function relatedProductsHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET")
      return res.status(405).json({ error: `Method: ${req.method} Not Allowed` })
    }

    const exclude = req.query.exclude as string
    const category = await getCategoryByName(req.query.category as string) // This route would not be hit unless the query is defined

    return res
      .status(200)
      .json(
        exclude
          ? category.filter((product) => product.id !== Number(exclude)).slice(0, 4)
          : category.slice(0, 4)
      )
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
