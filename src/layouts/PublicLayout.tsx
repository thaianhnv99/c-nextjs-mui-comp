import AppLoading from "@/component/Base/AppLoading";
import { Header } from "@/component/common/header";
import { Main } from "@/component/common/main";
import { getAuthorization } from "@/lib/authorization";
import { useUser } from "@/make-apis/auth-api";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const isLoggedIn = !!getAuthorization();
  const { data, isLoading } = useUser();
  const { asPath, replace } = useRouter();

  useEffect(() => {
    if (data?.status !== 200 && !isLoading) {
      console.log("checked public layput", data);
      replace(`/auth/login?redirect=${asPath}`, undefined, { shallow: true });
    }
  }, [asPath, data, isLoading, isLoggedIn, replace]);

  if (data?.status !== 200 && !isLoading) return null;

  return isLoading ? (
    <AppLoading />
  ) : (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default PublicLayout;
