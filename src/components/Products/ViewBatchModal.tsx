import { Dialog, Transition, Listbox } from "@headlessui/react";
import React, { useEffect, useState, Fragment } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";

import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import { useAppDispatch } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";
import { useAppSelector } from "src/redux/hooks";
import { useAuthContext } from "src/context/AuthProvider";
import { dataLength } from "ethers";

interface FormValues {
  name: string;
  material_type: string;
  material_size: string;
  example_image: any;
  // materialSize: number | "";
  // customMaterial: string;
  // customMaterialSize: number | "";
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product Name Required"),
  material_type: Yup.string().required("Material Type Required"),
  material_size: Yup.string().required("Material Size Required"),
  example_image: Yup.mixed().required("File is required"),
  // customMaterial: Yup.string().required("Custom Material Required"),
  // selectSize: Yup.string().required("Material Size Selection Required"),
  // materialSize: Yup.number()
  //   .typeError("Please enter a valid number")
  //   .required("Number is required"),
  // customMaterialSize: Yup.number()
  //   .typeError("Please enter a valid number")
  //   .required("Number is required"),
});

const materialType = [
  // { name: "other" },
  { name: "paper" },
  { name: "plastic" },
  { name: "wood" },
];

const materialSize = [
  // { name: "other" },
  { name: "12" },
  { name: "16" },
  { name: "24" },
];

export default function ViewBatchModal({ data }: any) {
  let [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(materialType[0]);
  const [size, setSize] = useState(materialSize[0]);

  const { isDataLoading2, getAllBatchList } = useAppSelector((s) => ({
    isDataLoading2: s.user.isDataLoading2,
    getAllBatchList: s.user.getAllBatchList.result,
  }));

  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();
  // const [customMaterial, setCustomMaterial] = useState("");
  // const [customMaterialSize, setCustomMaterialSize] = useState("");
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
    setType(materialType[0]);
    setSize(materialSize[0]);
  }

  function openModal() {
    setIsOpen(true);
    // dispatch(userActions.setNewProduct(""));
  }

  useEffect(() => {
    if (isOpen) {
      dispatch(
        userActions.getAllBatchList({
          token: accessToken,
          product_id: data._id,
          page: 1,
          page_size: 1000,
        })
      );
    }
  }, [isOpen]);

  // function onSubmit(values) {
  //   dispatch(
  //     userActions.createProduct({
  //       name: values.name,
  //       material_type: values.material_type,
  //       material_size: values.material_size,
  //       example_image: values.example_image,
  //       token: accessToken,
  //     })
  //   );
  // }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border rounded-md border-primary text-primary hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          View Batches
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-lg font-medium leading-6 text-textDarkBlue"
                  >
                    {data.name}
                    <AiOutlineClose
                      className="w-5 h-5 cursor-pointer hover:opacity-80"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <div className="mt-3 border rounded-md border-border">
                    <div className="text-center">
                      {isDataLoading2 && loadingSpinner}
                    </div>
                    {!isDataLoading2 &&
                      getAllBatchList?.map((item) => {
                        return (
                          <div className="flex items-center justify-between p-4 border-b border-bordergray">
                            <div className="text-textDarkBlue">
                              {item.batch_name}
                            </div>
                            <div>{item.created_at}</div>
                          </div>
                        );
                      })}
                    <div className="flex items-center justify-between p-4 ">
                      <div className="inline-flex items-center px-2 py-1 rounded-lg bg-gray">
                        <MdOutlineQrCodeScanner className="w-5 h-5 text-blue-400" />
                        <div className="text-sm text-blue-400">
                          {getAllBatchList?.length}
                        </div>
                      </div>
                      {getAllBatchList?.length > 0 && (
                        <button
                          type="button"
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border rounded-md border-primary text-primary hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          Download Batch
                        </button>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

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
