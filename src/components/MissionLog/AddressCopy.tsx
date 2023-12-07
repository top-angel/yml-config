import React, { useState } from "react";
import Image from "next/image";

interface AddressCopyButtonProps {
  address: string;
}

function AddressCopy({ address }: AddressCopyButtonProps) {
  const copyToClipboard = () => {
    const tempInput = document.createElement("input");
    tempInput.value = address;
    document.body.appendChild(tempInput);
    tempInput.select();

    document.execCommand("copy");

    document.body.removeChild(tempInput);
  };
  const truncatedAddress =
    address?.length > 16 ? address.slice(0, 16) : address;

  return (
    <div className="flex items-center">
      <div className="text-base font-normal text-darkgray">
        {truncatedAddress}
      </div>
      <Image
        src={`/assets/images/copyicon.svg`}
        alt="copyIcon"
        width="24"
        height="24"
        style={{ marginLeft: 10, cursor: "pointer" }}
        onClick={copyToClipboard}
      />
    </div>
  );
}

export default AddressCopy;
