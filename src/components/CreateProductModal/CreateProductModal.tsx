import { Dialog, Transition, Listbox } from "@headlessui/react";
import React, { useEffect, useState, Fragment } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ImageUploader from "./ImageUploader";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import { useAppDispatch } from "../../redux/hooks";
import { userActions } from "../../redux/user/userSlice";
import { useAppSelector } from "src/redux/hooks";
import { useAuthContext } from "src/context/AuthProvider";

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

export default function CreateProductModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(materialType[0]);
  const [size, setSize] = useState(materialSize[0]);

  const { isDataLoading, newProduct } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    newProduct: s.user.newProduct,
  }));

  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();
  // const [customMaterial, setCustomMaterial] = useState("");
  // const [customMaterialSize, setCustomMaterialSize] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (newProduct !== "") {
      closeModal();
    }
  }, [newProduct]);

  function closeModal() {
    setIsOpen(false);
    setType(materialType[0]);
    setSize(materialSize[0]);
  }

  function openModal() {
    setIsOpen(true);
    // dispatch(userActions.setNewProduct(""));
  }

  function onSubmit(values) {
    dispatch(
      userActions.createProduct({
        name: values.name,
        material_type: values.material_type,
        material_size: values.material_size,
        example_image: values.example_image,
        token: accessToken,
      })
    );
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-md border-primary text-primary hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <Image
            src={`/assets/images/productmodalicon.svg`}
            alt="productmodal"
            width="24"
            height="24"
          />
          Create a Product
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
                    Create a Product
                    <AiOutlineClose
                      className="w-5 h-5 cursor-pointer hover:opacity-80"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <Formik
                    initialValues={{
                      name: "",
                      material_type: materialType[0].name,
                      material_size: materialSize[0].name,
                      example_image: null,
                      // selectSize: "",
                      // materialSize: "",
                      // customMaterial: "",
                      // customMaterialSize: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values: FormValues) => {
                      onSubmit(values);
                    }}
                  >
                    {({ values, touched, isValid, setFieldValue, errors }) => {
                      return (
                        <Form>
                          <div className="w-full">
                            <div className="mt-5">
                              <div className="text-sm font-semibold font-primary text-graystrongest">
                                Product Name
                              </div>
                              <div className="text-sm font-normal opacity-50 font-primary text-graystrongest">
                                Enter the name of your product (e.g 330ml coke
                                bottles)
                              </div>
                              <Field
                                type="text"
                                name="name"
                                placeholder="Example Product Name"
                                className="w-full px-3 py-2 mt-2 mb-1 text-base font-normal bg-white border rounded-xl border-bordergray text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                              />
                              {errors.name && (
                                <div className="text-sm text-rose-500">
                                  {errors.name}
                                </div>
                              )}
                            </div>
                            <div className="mt-5">
                              <div className="text-sm font-semibold font-primary text-graystrongest">
                                Material Type
                              </div>
                              <div className="mb-2 text-sm font-normal opacity-50 font-primary text-graystrongest">
                                Select your products material
                              </div>
                              <Listbox
                                name="material_type"
                                value={type}
                                onChange={(newValue: any) => {
                                  setFieldValue("material_type", newValue.name);
                                  setType(newValue);
                                  // if (newValue.name === "other") {
                                  //   setSelectedMaterial(newValue);
                                  // } else {

                                  // }
                                }}
                              >
                                <div className="relative w-full mt-1">
                                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default ring-1 ring-gray ">
                                    <span className="block text-base truncate text-darkgray">
                                      {type.name}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <ChevronDownIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options
                                      style={{
                                        position: "relative",
                                        zIndex: 1,
                                      }}
                                      className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >
                                      {materialType.map(
                                        (material, materialIdx) => (
                                          <Listbox.Option
                                            key={materialIdx}
                                            className={({ active }) =>
                                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                  ? "bg-primary bg-opacity-10 text-primary"
                                                  : "text-gray-900"
                                              }`
                                            }
                                            value={material}
                                          >
                                            {({ selected }) => (
                                              <>
                                                <span
                                                  className={`block truncate ${
                                                    selected
                                                      ? "font-medium"
                                                      : "font-normal"
                                                  }`}
                                                >
                                                  {material.name}
                                                </span>
                                                {selected ? (
                                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                    <CheckIcon
                                                      className="w-5 h-5"
                                                      aria-hidden="true"
                                                    />
                                                  </span>
                                                ) : null}
                                              </>
                                            )}
                                          </Listbox.Option>
                                        )
                                      )}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                              {errors.material_type && (
                                <div className="text-sm text-rose-500">
                                  {errors.material_type}
                                </div>
                              )}
                              {/* <Field
                              type="text"
                              name="customMaterial"
                              placeholder="Enter Custom Material"
                              className="w-full px-3 py-2 mt-2 mb-1 text-base font-normal bg-white border rounded-xl border-bordergray text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                            /> */}
                            </div>
                            <div className="mt-5">
                              <div className="text-sm font-semibold font-primary text-graystrongest">
                                Material Size
                              </div>
                              <div className="mb-2 text-sm font-normal opacity-50 font-primary text-graystrongest">
                                Enter the size of your product (e.g 400 ml)
                              </div>
                              {/* <Field
                              type="text"
                              name="missionTitle"
                              placeholder="10"
                              className="w-full px-3 py-2 mt-0 mb-2 text-base font-normal bg-white border rounded-xl border-bordergray text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                            /> */}
                              <Listbox
                                name="material_size"
                                value={size}
                                onChange={(newValue) => {
                                  setFieldValue("material_size", newValue.name);
                                  setSize(newValue);
                                  // if (newValue.name === "other") {
                                  //   setSelectedOption(newValue);
                                  // } else {
                                  //   setSelectedOption(newValue);
                                  //   setCustomMaterialSize("");
                                  // }
                                }}
                              >
                                <div className="relative w-full mt-1">
                                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default ring-1 ring-gray ">
                                    <span className="block text-base truncate text-darkgray">
                                      {size.name}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <ChevronDownIcon
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>
                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options
                                      style={{
                                        position: "relative",
                                        zIndex: 1,
                                      }}
                                      className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >
                                      {materialSize.map((person, personIdx) => (
                                        <Listbox.Option
                                          key={personIdx}
                                          className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                              active
                                                ? "bg-primary bg-opacity-10 text-primary"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value={person}
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                {person.name}
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                  <CheckIcon
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                              {/* <Field
                              type="text"
                              name="customMaterialSize"
                              placeholder="Enter Custom Unit"
                              className="w-full px-3 py-2 mt-2 mb-1 text-base font-normal bg-white border rounded-xl border-bordergray text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                            /> */}
                            </div>
                            <div className="mt-5">
                              <div className="text-sm font-semibold font-primary text-graystrongest">
                                Example Image
                              </div>
                              <div className="mb-2 text-sm font-normal opacity-50 font-primary text-graystrongest">
                                Upload an example image of the product to guide
                                your collectors
                              </div>
                              <ImageUploader
                                className="h-[126px]"
                                onImageUpload={(imageFile: File) =>
                                  setFieldValue("example_image", imageFile)
                                }
                              />
                              {errors.example_image && (
                                <div className="text-sm text-rose-500">
                                  {errors.example_image.toString()}
                                </div>
                              )}
                            </div>
                            <button
                              type="submit"
                              className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-5 text-sm font-medium text-white rounded-md bg-primary disabled:hover:bg-opacity-80 hover:bg-opacity-80 disabled:bg-opacity-80"
                              disabled={!isValid || isDataLoading}
                            >
                              <Image
                                src={`/assets/images/productmodalothericon.svg`}
                                alt="productmodalother"
                                width="24"
                                height="24"
                              />
                              Create a Product {isDataLoading && loadingSpinner}
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
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
    className="w-6 h-6 mr-3 -ml-1 text-white animate-spin"
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
