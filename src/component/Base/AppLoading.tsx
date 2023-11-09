import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

type AppLoadingProps = {
  open?: boolean;
};
const AppLoading = ({ open }: AppLoadingProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff8f",
        zIndex: 8888,
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default AppLoading;
