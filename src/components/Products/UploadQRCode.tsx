import React, { useState } from "react";
import ImageUploader from "../CreateProductModal/ImageUploader";
import { useAppDispatch } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";
import { useAppSelector } from "src/redux/hooks";
import { useAuthContext } from "src/context/AuthProvider";

type props = {
  batch: any;
};

const UploadQRCode = ({ batch }: any) => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const [batchName, setBatchName] = useState<string>("");

  const { uploadQRCodeResult } = useAppSelector((s) => ({
    uploadQRCodeResult: s.user.uploadQRCodeResult,
  }));

  const onUploadQRCode = (file: any) => {
    if (batch === undefined && batchName === "") {
      return;
    } else {
      dispatch(
        userActions.uploadQRCode({
          batch_name: batchName,
          product_id: batch._id,
          file: file,
          token: accessToken,
        })
      );
    }
  };

  return (
    <div className="px-3 mt-4 border-r border-bordergray">
      <div className="font-bold text-center font-primary">
        Upload QR Code Batches
        <span className="text-sm font-medium font-primary text-darkgray">
          (1000)
        </span>
      </div>
      <div className="mt-2 text-base font-medium text-center font-primary text-darkgray">
        Select a Product to Upload QR Codes
      </div>
      <div className="mt-5">
        <label className="text-sm text-darkgray">Batch Name*</label>
        <input
          type="text"
          className="w-full px-2 py-1.5 mt-1 text-base border rounded-lg border-bordergray focus:outline-none"
          placeholder="Batch1"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
        />
      </div>
      <div className="mt-2 text-sm text-center text-yellow-800"></div>
      {batch && batchName !== "" && (
        <ImageUploader
          className="h-[126px] mt-4"
          onImageUpload={(imageFile: File) => onUploadQRCode(imageFile)}
          batch={batch}
        />
      )}
    </div>
  );
};

export default UploadQRCode;
