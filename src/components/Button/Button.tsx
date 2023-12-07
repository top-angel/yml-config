import React, { ReactNode } from "react";

type props = {
  type: "button" | "submit";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void | undefined;
};

const Button = ({ type, children, className, onClick, disabled }: props) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`w-full py-2 ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
