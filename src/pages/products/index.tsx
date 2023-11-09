import PublicLayout from "@/layouts/PublicLayout";
import { useProductApi, useProductById } from "@/make-apis/example-api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ReactElement, useState } from "react";

const Products = () => {
  const [id, setId] = useState("");
  const { data, isLoading, isFetching } = useProductApi();
  const {
    data: productDetail,
    isLoading: isLoadingProductDetail,
    isFetching: isFetchingProductDetail,
  } = useProductById(id);

  console.log(productDetail, isLoadingProductDetail);

  return (
    <Box>
      123
      <Button onClick={() => setId("1")} variant="contained">
        {isLoadingProductDetail || isFetchingProductDetail
          ? "Loading..."
          : "Call with id: 1"}
      </Button>
      <code>
        <pre>{JSON.stringify(productDetail?.data, null, 2)}</pre>
      </code>
    </Box>
  );
};
Products.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};
export default Products;
