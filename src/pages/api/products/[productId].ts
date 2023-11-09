import { apiClient } from "@/lib";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { productId } = req.query;
    const products = await getProducts(productId as string);
    res.status(200).json(products.data);
  } catch (error) {
    res.status(500).json({ error: "failed to load data" });
  }
}

async function getProducts(productId: string) {
  return await apiClient.get(`https://dummyjson.com/products/${productId}`);
}
