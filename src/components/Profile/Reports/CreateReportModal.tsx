import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { userActions } from "../../../redux/user/userSlice";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";


interface DataItem {
  id: number;
  selected: boolean;
  title: string;
  billingDate: string;
  status: string;
  size: string;
}

const dataItem = {
  id: 1,
  selected: true,
  title: "Sample Data",
  billingDate: "2023-10-29",
  status: "Active",
  size: "Medium",
};


type CreateReportModalProps = {
  showSlideshow: boolean;
  setShowSlideshow: (show: boolean) => void;
  updateReportsData: any;
}

interface FormValues {
  missionName: string;
  productName: string;
  batchName: string;
  startDate: Date;
  endDate: Date;
}

const validationSchema = Yup.object().shape({
});

const mission = [
  { name: "Search" },
  { name: "150ml cans" },
  { name: "250ml cans" },
  { name: "330ml cans" },
  { name: "500ml cans" },
];

const product = [
  { name: "Search" },
  { name: "Shirt" },
  { name: "T-shirt" },
  { name: "Car" },
];

const batch = [
  { name: "Search" },
  { name: "Batch 123" },
  { name: "Batch 456" },
  { name: "Batch 789" },
];

const CreateReportModal: React.FC<CreateReportModalProps> = ({
  showSlideshow,
  setShowSlideshow,
  updateReportsData
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [selectedMission, setSelectedMission] = useState(mission[0]);
  const [customMission, setCustomMission] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(product[0]);
  const [customProduct, setCustomProduct] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(batch[0]);
  const [customBatch, setCustomBatch] = useState("");

  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };


  function closeModal() {
    setIsOpen(false);
    setShowSlideshow(false);
  }

  useEffect(() => {
    if (showSlideshow) {
      setIsOpen(true);
    }
  }, [showSlideshow])


  const currentDate = new Date();
  
  function formatDateToCustomString(dateString) {
    const date = new Date(dateString);
    const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    const datePickerWrappers: any = document.querySelectorAll(
      ".react-datepicker-wrapper",
    );

    datePickerWrappers.forEach((datePickerWrapper: any) => {
      datePickerWrapper.style.setProperty("width", "100%", "important");
    });
  }, []);

  const { accessToken } = useAuthContext();
  const dispatch = useAppDispatch();

  const { isDataLoading, reportId } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,

    reportId: s.user.reportId,
  }));

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
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
            <div className="flex min-h-full justify-end text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg h-fit mt-20 pt-8 transform overflow-hidden bg-white p-6 text-left align-middle  transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-lg font-medium leading-6 text-textDarkBlue"
                  >
                    Create a Report
                    <AiOutlineClose
                      className="h-5 w-5 cursor-pointer hover:opacity-80"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <Formik
                    initialValues={{
                      missionName: "",
                      productName: "",
                      batchName: "",
                      startDate: currentDate,
                      endDate: currentDate,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values: FormValues) => {
                      (async () => {
                        const reportCreationData = {
                          mission_id: "mission:AmKFhpibmzpScMX",
                          product_id: "product_id",
                          start_date: values.startDate.toString(),
                          end_date: values.endDate.toString(),
                          filetype: "pdf",
                          token: accessToken,
                        };
                    
                        try {
                          await dispatch(userActions.reportCreation(reportCreationData));
                          const newReport = {
                            selected: false,
                            title: selectedMission.name === "Search" ? 'No title' : selectedMission.name,
                            billingDate: formatDateToCustomString(values.startDate),
                            status: "Ready",
                            size: "10.2 Mb",
                          };
                          updateReportsData(newReport);
                          closeModal();
                        } catch (error) {
                          console.error("Error during report creation dispatch:", error);
                        }
                      })();
                    }}
                  >
                    {({ values, touched, isValid, setFieldValue, errors }) => (
                      <Form>
                        <div className="w-full">
                          <div className="border-t border-gray mt-5"></div>
                          <div className="mt-5">
                            <div className="font-primary text-sm font-semibold text-graystrongest">
                              Mission Name
                            </div>
                            <div className="relative">
                              <Listbox
                                value={selectedMission}
                                onChange={(newValue) => {
                                  if (newValue.name === "Search") {
                                    setSelectedMission(newValue);
                                  } else {
                                    setSelectedMission(newValue);
                                    setCustomMission("");
                                  }
                                }}
                              >
                                <div className="relative mt-1 w-full">
                                  <Listbox.Button className="relative w-full cursor-default items-center rounded-lg bg-white py-2 pl-10 pr-10 text-left ring-1 ring-gray  ">
                                    <span className="block truncate text-base text-darkgray">
                                      {selectedMission.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon
                                        className="text-gray-400 h-5 w-5"
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
                                      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >
                                      {mission.map((material, materialIdx) => (
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
                                                    className="h-5 w-5"
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
                              <Image
                                src={`/assets/images/reportsearchicon.svg`}
                                alt="productmodalother"
                                width="24"
                                height="24"
                                className="absolute top-2 left-2"
                              />
                            </div>
                            <div className="mt-2 font-primary text-sm font-normal text-graystrongest opacity-50">
                              Search & Select missions to filter
                            </div>
                            {selectedMission.name != "Search" && (
                              <div className="flex rounded-full bg-primary bg-opacity-10 px-1.5 py-0.5 mt-1 border border-opacitygreen w-fit items-center">
                                <Image
                                  src={"/assets/images/coca-cola.svg"}
                                  alt="logo"
                                  width={12}
                                  height={12}
                                  unoptimized
                                />
                                <div className="font-primary text-xs font-medium text-primary ml-1">
                                  {selectedMission.name}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mt-5">
                            <div className="font-primary text-sm font-semibold text-graystrongest">
                              Product Name
                            </div>
                            <div className="relative">
                              <Listbox
                                value={selectedProduct}
                                onChange={(newValue) => {
                                  if (newValue.name === "Search") {
                                    setSelectedProduct(newValue);
                                  } else {
                                    setSelectedProduct(newValue);
                                    setCustomProduct("");
                                  }
                                }}
                              >
                                <div className="relative mt-1 w-full">
                                  <Listbox.Button className="relative w-full cursor-default items-center rounded-lg bg-white py-2 pl-10 pr-10 text-left ring-1 ring-gray  ">
                                    <span className="block truncate text-base text-darkgray">
                                      {selectedProduct.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon
                                        className="text-gray-400 h-5 w-5"
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
                                      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >
                                      {product.map((material, materialIdx) => (
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
                                                    className="h-5 w-5"
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
                              <Image
                                src={`/assets/images/reportsearchicon.svg`}
                                alt="productmodalother"
                                width="24"
                                height="24"
                                className="absolute top-2 left-2"
                              />
                            </div>
                            <div className="mt-2 font-primary text-sm font-normal text-graystrongest opacity-50">
                              Search & Select missions to filter
                            </div>
                            {selectedProduct.name != "Search" && (
                              <div className="flex rounded-full bg-primary bg-opacity-10 px-1.5 py-0.5 mt-1 border border-opacitygreen w-fit items-center">
                                <Image
                                  src={"/assets/images/coca-cola.svg"}
                                  alt="logo"
                                  width={12}
                                  height={12}
                                  unoptimized
                                />
                                <div className="font-primary text-xs font-medium text-primary ml-1">
                                  {selectedProduct.name}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mt-5">
                            <div className="font-primary text-sm font-semibold text-graystrongest">
                              Batch Name
                            </div>
                            <div className="relative">
                              <Listbox
                                value={selectedBatch}
                                onChange={(newValue) => {
                                  if (newValue.name === "Search") {
                                    setSelectedBatch(newValue);
                                  } else {
                                    setSelectedBatch(newValue);
                                    setCustomBatch("");
                                  }
                                }}
                              >
                                <div className="relative mt-1 w-full">
                                  <Listbox.Button className="relative w-full cursor-default items-center rounded-lg bg-white py-2 pl-10 pr-10 text-left ring-1 ring-gray  ">
                                    <span className="block truncate text-base text-darkgray">
                                      {selectedBatch.name}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                      <ChevronDownIcon
                                        className="text-gray-400 h-5 w-5"
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
                                      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >
                                      {batch.map((material, materialIdx) => (
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
                                                    className="h-5 w-5"
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
                              <Image
                                src={`/assets/images/reportsearchicon.svg`}
                                alt="productmodalother"
                                width="24"
                                height="24"
                                className="absolute top-2 left-2"
                              />
                            </div>
                            <div className="mt-2 font-primary text-sm font-normal text-graystrongest opacity-50">
                              Search & Select missions to filter
                            </div>
                            {selectedBatch.name != "Search" && (
                              <div className="flex rounded-full bg-primary bg-opacity-10 px-1.5 py-0.5 mt-1 border border-opacitygreen w-fit items-center">
                                <Image
                                  src={"/assets/images/coca-cola.svg"}
                                  alt="logo"
                                  width={12}
                                  height={12}
                                  unoptimized
                                />
                                <div className="font-primary text-xs font-medium text-primary ml-1">
                                  {selectedBatch.name}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="border-t border-gray mt-5"></div>
                          <div className="mt-5">
                            <div className="font-primary text-sm font-semibold text-graystrongest">
                              Timeframe
                            </div>
                            <div className="relative">
                              <DatePicker
                                showIcon
                                selected={values.startDate}
                                onChange={(date) => setFieldValue("startDate", date)}
                                placeholderText="25/06/2023"
                                className="mb-1 mt-1 flex w-full rounded-xl bg-white !px-8 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary border border-gray"
                              />
                              <Image
                                src={`/assets/images/calendar.svg`}
                                alt="calendar"
                                width="24"
                                height="24"
                                className="absolute top-2 left-2"
                              />
                            </div>
                            <div className="relative">
                              <DatePicker
                                showIcon
                                selected={values.endDate}
                                onChange={(date) => setFieldValue("endDate", date)}
                                placeholderText="25/06/2023"
                                className="mb-1 mt-1 flex w-full rounded-xl bg-white !px-8 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary border border-gray"
                              />
                              <Image
                                src={`/assets/images/calendar.svg`}
                                alt="calendar"
                                width="24"
                                height="24"
                                className="absolute top-2 left-2"
                              />
                            </div>
                            <div className="mt-2 font-primary text-sm font-normal text-graystrongest opacity-50">
                              Search & Select missions to filter
                            </div>
                          </div>
                          <div className="border-t border-gray mt-5"></div>
                          <div className="flex items-center space-x-2 mt-8 mb-12">
                            <input
                              type="checkbox"
                              className="h-4 w-4 !text-primary border rounded-sm checked:bg-primary"
                              checked={checked}
                              onChange={handleCheckboxChange}
                            />
                            <label className="font-primary font-medium text-sm text-graystrongest">Include ongoing mission results</label>
                          </div>
                          <button
                            type="submit"
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            <Image
                              src={`/assets/images/reportmodalicon.svg`}
                              alt="productmodalother"
                              width="24"
                              height="24"
                            />
                            Create a Report
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateReportModal;
