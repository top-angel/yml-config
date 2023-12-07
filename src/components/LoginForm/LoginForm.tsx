import React from "react";

import Image from "next/image";
import Button from "../Button/Button";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAuthContext } from "../../context/AuthProvider";

export interface Values {
  email: string;
  password: string;
}

type props = {
  onClick: () => void;
};

const LoginForm = ({ onClick }: props) => {
  const { user, authenticated } = usePrivy();
  const { accessToken, loading } = useAuthContext();

  return (
    <div className="w-1/2   p-10">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width="50"
          height="50"
        />
        <div className="text-3xl font-primary font-medium mt-3">
          Welcome back
        </div>
        <div className="text-lg font-primary font-light mt-3 text-darkgray">
          Start your Recyclium journey here!
        </div>
      </div>
      {!loading && (
        <Button
          type="button"
          onClick={onClick}
          className="mt-10 rounded-xl bg-primary font-primary text-white inline-flex items-center justify-center"
        >
          Login
        </Button>
      )}
      {loading && (
        <Button
          type="button"
          onClick={onClick}
          className="mt-10 rounded-xl bg-primary font-primary text-white inline-flex items-center justify-center"
        >
          {loadingSpinner} Loading...
        </Button>
      )}
    </div>
  );
};

const loadingSpinner = (
  <svg
    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default LoginForm;
