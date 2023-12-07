import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";

import {
  GetTokens,
  GetNonce,
  RefreshTokens,
  RegisterTokens,
} from "../api/auth";

// import {
//   GetAcceptedStatus,
//   PostAcceptedStatus,
// } from "../../api/hasAcceptedTerms";

import { CookieConsentStatus, useConsent } from "./CookieConsent";
import { deleteCookie, setCookie, getCookieValue } from "../utils/cookies";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import error from "next/error";

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

interface AuthContextValue {
  accessToken: string;
  changingAccessToken: boolean;
  refreshToken: string;
  acceptedUpload: boolean;
  acceptedUploadInitWaiting: boolean;
  // notLoggedInError: string;
  needToRefreshTokenError: boolean;
  executingRefresh: boolean;
  loading: boolean;

  // setAcceptedUpload: (status: boolean, post: boolean) => void;
  setNeedToRefreshTokenError: (status: boolean) => void;
}

const defaultState: AuthContextValue = {
  accessToken: "",
  changingAccessToken: false,
  refreshToken: "",
  acceptedUpload: false,
  acceptedUploadInitWaiting: true,
  // notLoggedInError: "",
  needToRefreshTokenError: false,
  executingRefresh: false,
  loading: false,

  // setAcceptedUpload: (status: boolean, post: boolean) => {},
  setNeedToRefreshTokenError: (status: boolean) => {},
};

const AuthContext = createContext(defaultState);

function getCookieStorage(): any {
  if (typeof document !== "undefined") {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );

    return cookies;
  }
}

// function setCookieStorage(values: Partial<AuthContextValue>) {
//   if (typeof document !== "undefined") {
//     document.cookie = `jwtAccess=${values.accessToken}`;
//     document.cookie = `jwtRefresh=${values.refreshToken}`;
//     document.cookie = `acceptedUpload=${values.acceptedUpload}`;
//   }
// }

function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const { user, signMessage, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  const accountId = user?.wallet ? user?.wallet.address : null;
  const router = useRouter();

  const originAccountId = useRef(accountId);
  const cookieStorage = getCookieStorage();
  const { cookies, cookieConsentStatus } = useConsent();
  // control signals
  const [didRefresh, setDidRefresh] = useState(true);
  const [changingAccessToken, setChangingAccessToken] = useState(false);
  const [executingRefresh, setExecutingRefresh] = useState<boolean>(false);
  const [acceptedUploadInitWaiting, setAcceptedUploadInitWaiting] =
    useState(true);
  const [needToRefreshTokenError, setNeedToRefreshTokenError] =
    useState<boolean>(false);

  // access tokens
  const [accessToken, setAccessToken] = useState<string>(
    getCookieValue("jwtAccess") || ""
  );
  const [refreshToken, setRefreshToken] = useState<string>(
    getCookieValue("jwtRefresh") || ""
  );
  const [acceptedUpload, setAcceptedUpload] = useState<boolean>(
    cookieStorage?.acceptedUpload || false
  );

  const [notLoggedInError, setNotLoggedInError] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);

  const changeAccessToken = (new_token: string) => {
    setChangingAccessToken(true);
    setAccessToken(new_token);
    setCookie(`jwtAccess`, new_token);
  };

  const changeRefreshToken = (new_token: string) => {
    setRefreshToken(new_token);
    setCookie(`jwtRefresh`, new_token);
  };

  useEffect(() => {
    if (!accessToken) {
    } else if (accessToken && changingAccessToken) {
      setChangingAccessToken(false);
    }
  }, [accessToken]);

  // const SetAcceptedUpload = (status: boolean, post: boolean) => {
  //   setAcceptedUpload(status);
  //   if (post) {
  //     const text = status ? "ACCEPTED" : "REJECTED";
  //     status && PostAcceptedStatus(accessToken, text).then((data) => {});
  //   }
  // };

  const componentIsMounted = useRef(true);
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const sign = async () => {
    // GETTING TOKENS FOR FIRST TIME

    console.log(authenticated, accountId, embeddedWallet);

    if (authenticated && accountId && embeddedWallet) {
      setLoading(true);
      try {
        const nonceObject = await GetNonce(accountId);
        if (nonceObject.status !== "not found") {
          const nonce = nonceObject.nonce.toString();
          try {
            const signed = await signMessage(nonce);
            try {
              const { accessToken, refreshToken } = await GetTokens(
                accountId,
                signed
              );
              setCookie(`accountId`, accountId);
              setCookie(`jwtAccess`, accessToken);
              setCookie(`jwtRefresh`, accessToken);

              changeAccessToken(accessToken);
              changeRefreshToken(refreshToken);
              router.push("/");
              setLoading(false);
            } catch (error) {
              console.log(`Registering...`);
              try {
                const { accessToken, refreshToken } = await RegisterTokens(
                  accountId
                );
                setCookie(`accountId`, accountId);
                setCookie(`jwtAccess`, accessToken);
                setCookie(`jwtRefresh`, accessToken);
                changeAccessToken(accessToken);
                changeRefreshToken(refreshToken);
                setLoading(false);
              } catch (error) {
                setLoading(false);
                console.log(
                  `[AuthProvider.ts] RegisterTokens ERROR = ${error}. Contact support.`
                );
              }
            }
          } catch (error) {
            setLoading(false);
            console.log("singed error===>", error);
          }
        } else {
          console.log(`Registering...`);
          try {
            const { accessToken, refreshToken } = await RegisterTokens(
              accountId
            );
            setCookie(`accountId`, accountId);
            setCookie(`jwtAccess`, accessToken);
            setCookie(`jwtRefresh`, accessToken);
            changeAccessToken(accessToken);
            changeRefreshToken(refreshToken);
          } catch (error) {
            setLoading(false);
            console.log(
              `[AuthProvider.ts] RegisterTokens ERROR = ${error}. Contact support.`
            );
          }
        }
      } catch (error) {
        setLoading(false);
        console.log("nonce error===>", error);
      }
    }
  };

  const queueRefresh = () => {
    // REFRESHING TOKENS
    const thisRefreshToken = refreshToken;
    if (thisRefreshToken && thisRefreshToken !== undefined) {
      setTimeout(() => {
        RefreshTokens(thisRefreshToken).then((jsonResult) => {
          const newAccessToken = jsonResult.access_token;
          changeAccessToken(newAccessToken);
        });
      }, 900000);
    }
  };

  const executeRefresh = () => {
    setExecutingRefresh(true);
    const thisRefreshToken = refreshToken;
    if (thisRefreshToken && thisRefreshToken !== undefined) {
      RefreshTokens(thisRefreshToken).then((jsonResult) => {
        const newAccessToken = jsonResult.access_token;
        changeAccessToken(newAccessToken);

        // set control signals
        setExecutingRefresh(false);
        setNeedToRefreshTokenError(false);
      });
    }
  };

  useEffect(() => {
    if (accountId && accessToken && getCookieValue("accountId") != accountId) {
      deleteCookie("jwtAccess");
      deleteCookie("jwtRefresh");
      window.location.reload();
    }
  }, [accountId]);

  // GENERATING TOKENS
  useEffect(() => {
    if (componentIsMounted && !accessToken && accountId && embeddedWallet) {
      sign();
      // queueRefresh();
    }
    if (
      componentIsMounted &&
      accountId &&
      accessToken &&
      refreshToken &&
      embeddedWallet
    ) {
      queueRefresh();
    }
  }, [didRefresh, accountId, accessToken, refreshToken, embeddedWallet]);

  useEffect(() => {
    if (didRefresh) {
      executeRefresh();
    }
  }, [didRefresh]);

  useEffect(() => {
    if (needToRefreshTokenError) {
      executeRefresh();
    }
  }, [needToRefreshTokenError]);

  // INITIALIZING ACCEPTED UPLOAD
  useEffect(() => {
    if (acceptedUploadInitWaiting && accessToken) {
      setAcceptedUploadInitWaiting(false);
      // GetAcceptedStatus(accessToken).then((response) => {
      //   if (response.data.usage_flag === "ACCEPTED") {
      //     setAcceptedUpload(true);
      //   } else if (response.data.usage_flag === "REJECTED") {
      //     setAcceptedUpload(false);
      //   }
      // });
    }
  }, [acceptedUploadInitWaiting, accessToken]);

  // ERROR SETTING
  useEffect(() => {
    if (componentIsMounted) {
      if (!accountId) {
        setNotLoggedInError(`NO ACCOUNT CONNECTED`);
      } else if (accountId && !changingAccessToken && !accessToken) {
        setNotLoggedInError(`Your signature is needed`);
      } else if (accountId && accessToken && !acceptedUpload) {
        setNotLoggedInError(`Please accept DataUnion's Guidelines.`);
      } else {
        setNotLoggedInError(``);
      }
    }
  }, [accountId, accessToken, acceptedUpload]);

  const SetNeedToRefreshTokenError = (status: boolean) => {
    setNeedToRefreshTokenError(status);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        changingAccessToken,
        refreshToken,
        acceptedUpload,
        acceptedUploadInitWaiting,
        // notLoggedInError,

        needToRefreshTokenError,
        executingRefresh,
        loading,

        // setAcceptedUpload: SetAcceptedUpload,
        setNeedToRefreshTokenError: SetNeedToRefreshTokenError,
        // clearAuth: ClearAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Helper hook to access the provider values
const useAuthContext = (): AuthContextValue => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
export default AuthContextProvider;
