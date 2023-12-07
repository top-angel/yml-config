import React, { useEffect, useState } from "react";
import CreateProductModal from "../CreateProductModal/CreateProductModal";
import Batch from "./Batch";
import UploadQRCode from "./UploadQRCode";
import GenerateQRCode from "./GenerateQRCode";

import { useAppDispatch } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";
import { useAppSelector } from "src/redux/hooks";
import { useAuthContext } from "src/context/AuthProvider";

const Products = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const { isDataLoading, myProducts } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    myProducts: s.user.myProducts,
  }));

  const [selectedBatch, setSelectedBatch] = useState();

  useEffect(() => {
    dispatch(userActions.getMyProducts({ token: accessToken }));
  }, []);

  const onSelectBatch = (item: any) => {
    console.log(item);
    dispatch(userActions.setUploadQRCodeResult(""));
    setSelectedBatch(item);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between p-5">
        <div className="flex items-center">
          <div className="text-3xl font-semibold font-primary text-graystrongest">
            Products
          </div>
          <div className="ml-2 text-sm font-medium opacity-50 font-primary text-graystrongest">
            (13)
          </div>
        </div>
        <CreateProductModal />
      </div>
      {isDataLoading && (
        <div className="flex justify-center">{loadingSpinner}</div>
      )}
      {!isDataLoading && myProducts && (
        <div className="grid grid-cols-4 gap-4 px-4">
          {myProducts.map((item, index) => {
            return (
              <Batch
                data={item}
                selected={selectedBatch}
                onSelect={onSelectBatch}
              />
            );
          })}
        </div>
      )}
      <div className="grid grid-cols-2 mx-4 mt-6 border-t border-bordergray">
        <UploadQRCode batch={selectedBatch} />
        <GenerateQRCode batch={selectedBatch} />
      </div>
    </div>
  );
};

export default Products;

const loadingSpinner = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="4" width="6" height="14" opacity="1">
      <animate
        id="spinner_rQ7m"
        begin="0;spinner_2dMV.end-0.25s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </rect>
    <rect x="9" y="4" width="6" height="14" opacity=".4">
      <animate
        begin="spinner_rQ7m.begin+0.15s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </rect>
    <rect x="17" y="4" width="6" height="14" opacity=".3">
      <animate
        id="spinner_2dMV"
        begin="spinner_rQ7m.begin+0.3s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </rect>
  </svg>
);
