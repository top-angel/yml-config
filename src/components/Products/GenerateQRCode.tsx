import React, { useState } from "react";

import { useAppDispatch } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";
import { useAppSelector } from "src/redux/hooks";
import { useAuthContext } from "src/context/AuthProvider";

type props = {
  batch: any;
};
const GenerateQRCode = ({ batch }: props) => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { isDataLoading } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
  }));

  const onClickGenerate = () => {
    dispatch(
      userActions.generateQRCode({
        batch_name: name,
        batch_size: amount,
        product_id: batch._id,
        token: accessToken,
      })
    );
  };

  return (
    <div className="px-3 mt-4 border-r border-bordergray">
      <div className="font-bold text-center font-primary">
        Generate QR Code Batches
        <span className="text-sm font-medium font-primary text-darkgray">
          (1000)
        </span>
      </div>
      <div className="mt-2 text-base font-medium text-center font-primary text-darkgray">
        Select a Product to Generate QR Codes
      </div>
      <div className="mt-5">
        <label className="text-sm text-darkgray">Batch Name*</label>
        <input
          type="text"
          className="w-full px-2 py-1.5 mt-1 text-base border rounded-lg border-bordergray text-textDarkBlue focus:outline-none"
          placeholder="Batch1"
          onChange={(e: any) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="mt-5">
        <label className="text-sm text-darkgray">Amount of items*</label>
        <input
          type="number"
          className="w-full px-2 py-1.5 mt-1 text-base border rounded-lg border-bordergray text-textDarkBlue focus:outline-none"
          placeholder="1000"
          onChange={(e: any) => setAmount(e.target.value)}
          value={amount}
        />
        <button
          type="button"
          className="items-center w-full gap-2 px-4 py-2 mt-4 text-sm font-medium text-center text-white rounded-md bg-primary hover:bg-opacity-80 focus:outline-none disabled:bg-opacity-80 hover:disabled:bg-opacity-80"
          onClick={onClickGenerate}
          disabled={name === "" || amount === "" || !batch}
        >
          {isDataLoading ? "waiting..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default GenerateQRCode;
