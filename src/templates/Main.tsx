import type { ReactNode } from "react";
import { userActions } from "../redux/user/userSlice";
import Header from "../components/_Layout/Header/Header";
import router from "next/router";
import { usePrivy } from "@privy-io/react-auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useAuthContext } from "../context/AuthProvider";

import { deleteCookie } from "../utils/cookies";

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((s) => ({
    isLoggedIn: s.user.isLoggedIn,
  }));

  const { accessToken } = useAuthContext();

  const { logout, ready, authenticated } = usePrivy();

  const logoutClick = () => {
    deleteCookie("jwtAccess");
    deleteCookie("jwtRefresh");
    deleteCookie("accountId");
    logout();
    dispatch(userActions.logout());
  };

  if (!ready) {
    return <></>;
  }

  if (ready && !authenticated) {
    router.push("/login");
  }

  return (
    <div className="w-full px-1">
      {props.meta}

      <div className="w-full">
        <Header logout={logoutClick} />

        <main className="py-5 pt-24 text-xl content">{props.children}</main>
      </div>
    </div>
  );
};

export { Main };
