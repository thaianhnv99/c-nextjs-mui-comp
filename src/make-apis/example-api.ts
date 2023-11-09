import { apiClient } from "@/lib";
import { useQuery } from "react-query";

export const EXAMPLE_API_KEY = {
  GET_PRODUCTS: "get_products",
  GET_PRODUCT_DETAIL: "get_products_detail",
};

async function getProducts() {
  return await apiClient.get("/api/products");
}

async function getProductById(id: string) {
  return await apiClient.get(`/api/products/${id}`);
}

export function useProductApi() {
  return useQuery({
    queryKey: [EXAMPLE_API_KEY.GET_PRODUCTS],
    queryFn: getProducts,
    initialData: null,
  });
}

export function useProductById(id?: string) {
  return useQuery({
    queryKey: [EXAMPLE_API_KEY.GET_PRODUCT_DETAIL],
    queryFn: () => getProductById(id as string),
    enabled: !!id,
    initialData: null,
  });
}
