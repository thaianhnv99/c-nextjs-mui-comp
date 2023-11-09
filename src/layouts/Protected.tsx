import AppLoading from "@/component/Base/AppLoading";
import { getAuthorization } from "@/lib/authorization";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export type ProtectedProps = {
  children: ReactNode;
};
const Protected = ({ children }: ProtectedProps) => {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string) {
    const isLoggedIn = !!getAuthorization();
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/auth/login", "/auth/register"];
    const path = url.split("?")[0];
    if (!isLoggedIn && !publicPaths.includes(path)) {
      setAuthorized(false);
      console.log("checked");

      router.push(`/auth/login?redirect=${router.asPath}`);
    } else {
      setAuthorized(true);
    }
  }

  return !authorized ? <AppLoading /> : <>{children}</>;
};

export default Protected;
