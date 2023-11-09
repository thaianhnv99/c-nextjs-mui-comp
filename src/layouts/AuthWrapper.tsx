import AppLoading from "@/component/Base/AppLoading";
import { HOME_PAGE } from "@/constants";
import { getAuthorization } from "@/lib/authorization";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isReady, push } = useRouter();
  const isLoggedIn = !!getAuthorization();
  useEffect(() => {
    if (isLoggedIn && isReady) {
      push(HOME_PAGE);
    }
  }, [isLoggedIn, isReady, push]);

  return !isLoggedIn ? <>{children}</> : <AppLoading />;
};

export default AuthWrapper;
