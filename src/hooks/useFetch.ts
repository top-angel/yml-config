import { url } from "inspector";
import { useAuthContext } from "src/context/AuthProvider";

export const useFetch = (url: string, method: string, token: string) => {
  const headers = {
    "Content-Type": "text/plain",
    Authorization: `Bearer ${token}`,
  };
  const options: RequestInit = {
    method: method,
    headers: headers,
  };

  const promise = new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

  // Return the promise
  return promise;
};
