import { Tokens } from "src/context/AuthProvider";

export type PostNonceRequest = {
  nonce: number;
  message: string;
  [key: string]: number | string;
};

export interface SignResponse {
  accountId: string;
  signed: string;
  [key: string]: string;
}

export const API_URI = "https://crab.recyclium.dataunion.app/";

/// Register api
export const Register = async (accountId: string): Promise<number> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const obj = {
    public_address: accountId,
  };
  const addressObject = JSON.stringify(obj);

  const nonceRequest = await fetch(`${API_URI}/register`, {
    method: "POST",
    headers: myHeaders,
    body: addressObject,
    redirect: "follow",
  });

  const jsonResult: PostNonceRequest = await nonceRequest.json();
  if (jsonResult.status != "failed") {
    const { nonce } = jsonResult;
    return nonce;
  } else {
    return 0;
  }
};

// / Sign in api
export const Sign = async (
  nonce: string,
  accountId: string
): Promise<SignResponse> => {
  return new Promise((resolve, reject) => {
    // const { user, signMessage } = usePrivy();
    // const message = "Hello world";
    // signMessage(message).then((signature: any) => {
    //   console.log(signature);
    // });

    console.log(nonce, accountId);

    return resolve({ accountId, signed: "" });
    // const web3 = new Web3(Web3.givenProvider || `ws://${API_URI}`);
    // web3.eth.personal.sign(
    //   web3.utils.utf8ToHex(nonce),
    //   accountId,
    //   "",
    //   (err: any, signed: string) => {
    //     if (err) {
    //       return reject(err);
    //     } else {
    //       return resolve({ accountId, signed });
    //     }
    //   }
    // );
  });
};

/// Login Api
export const Login = async (accountId: string, signature: string) => {
  const obj = {
    public_address: accountId,
    signature,
  };

  const loginObject = JSON.stringify(obj);

  const loginResult = await fetch(`${API_URI}/login`, {
    method: "POST",
    body: loginObject,
  });

  const jsonResult = await loginResult.json();
  const accessToken = jsonResult.access_token;
  const refreshToken = jsonResult.refresh_token;

  const tokens: Tokens = {
    accessToken,
    refreshToken,
  };

  return tokens;
};

// // Logout
// export const Logout

export const GetNonce = async (accountId: string) => {
  const nonceRequest = await fetch(
    `${API_URI}/get-nonce?public_address=${accountId}`,
    {
      method: "GET",
    }
  );

  const nonce = await nonceRequest.json();
  return nonce;
};

export const GetTokens = async (
  accountId: string,
  signed: string
): Promise<Tokens> => {
  return new Promise((resolve, reject) => {
    Login(accountId, signed)
      .then((tokens) => {
        resolve(tokens);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

export const GetTokensForNewAddress = async (
  nonce: number,
  accountId: string
): Promise<Tokens> => {
  return new Promise((resolve, reject) => {
    console.log("GetTokensForNewAddress: ", nonce, accountId);
    const nonceStr = nonce.toString();
    Sign(nonceStr, accountId)
      .then((signObject) => {
        const signObjectString = JSON.stringify(signObject);
        const signObjectJson = JSON.parse(signObjectString);
        const signature = signObjectJson.signed;

        Login(accountId, signature)
          .then((tokens) => {
            resolve(tokens);
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        return reject();
      });
  });
};

export const RegisterTokens = async (accountId: string): Promise<Tokens> => {
  return new Promise((resolve, reject) => {
    Register(accountId).then((nonceNumber) => {
      console.log(accountId);
      const nonce = nonceNumber.toString();
      Sign(nonce, accountId).then((signObject) => {
        const signObjectString = JSON.stringify(signObject);
        const signObjectJson = JSON.parse(signObjectString);
        const signature = signObjectJson.signed;

        Login(accountId, signature)
          .then((tokens) => {
            resolve(tokens);
          })
          .catch((err) => {
            return reject(err);
          });
      });
    });
  });
};

export const RefreshTokens = async (refreshToken: string) => {
  const refreshHeaders = new Headers();
  refreshHeaders.append("Authorization", `Bearer ${refreshToken}`);

  const refreshResult = await fetch(`${API_URI}/refresh`, {
    method: "POST",
    headers: refreshHeaders,
  });

  const jsonResult = await refreshResult.json();
  return jsonResult;
};
