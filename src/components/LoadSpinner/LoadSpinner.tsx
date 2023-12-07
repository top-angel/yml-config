import React from "react";
import Image from "next/image";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div className={`flex h-screen items-center justify-center ${className}`}>
      <div className="animate-spin">
        <span className="animate-pulse">
          <Image
            src="/assets/images/loadspinner.svg"
            alt="cola"
            width="29"
            height="29"
            unoptimized
          />
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
