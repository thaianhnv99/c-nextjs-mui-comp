import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { authValidateSchema } from "src/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/make-apis/auth-api";
import AppLoading from "@/component/Base/AppLoading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const AuthWrapperNoSSR = dynamic(() => import("../../layouts/AuthWrapper"), {
  ssr: false,
});

const Login = () => {
  const { push, query } = useRouter();
  const { submit, isLoading } = useLogin({
    onSuccess: (user) => {
      console.log("success", user);
      toast.success("Signin successfull");
      const redirectTo = (query.redirect as string) || "/";
      push(redirectTo);
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authValidateSchema),
  });

  const handleLogin = async () => {
    console.log(getValues());
    submit(getValues());
  };

  return (
    <AuthWrapperNoSSR>
      <>
        {isLoading ? <AppLoading /> : null}
        <form onSubmit={handleSubmit(handleLogin)}>
          <Box height="100vh">
            <Box
              sx={{
                width: "400px",
                textAlign: "center",
                position: "relative",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3" mb={4}>
                Login
              </Typography>
              <Box mb={2}>
                <TextField
                  placeholder="Pls enter email"
                  size="small"
                  fullWidth
                  {...register("email")}
                />
                {errors.email?.message && (
                  <Typography
                    variant="small"
                    color="red"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {errors.email.message.toString()}
                  </Typography>
                )}
              </Box>
              <Box mb={3}>
                <TextField
                  placeholder="Pls enter password"
                  size="small"
                  type="password"
                  fullWidth
                  {...register("password")}
                />
                {errors.password?.message && (
                  <Typography
                    variant="small"
                    color="red"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {errors.password.message.toString()}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "40px",
                }}
                type="submit"
              >
                Login
              </Button>
            </Box>
          </Box>
        </form>
      </>
    </AuthWrapperNoSSR>
  );
};

export default Login;
