import React, { useEffect, useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUploader from "./ImageUploader/ImageUploader";
import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import dynamic from "next/dynamic";
import TextareaWithCharacterLimit from "./TextareaLimitation/TextareaLimitation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { userActions } from "src/redux/user/userSlice";
import { useRouter } from "next/router";
import Batch from "./Batch";

const DynamicQuillEditor = dynamic(() => import("./QuillEditor/QuillEditor"), {
  ssr: false, // This disables server-side rendering for this component
});

interface FormValues {
  missionTitle: string;
  missionImage: string;
  selectProduct: string;
  missionDescription: string;
  specialInstruction: string;
  startDate: Date;
  endDate: Date;
  location: string;
  collectionPoint: string;
  collectionDescription: string;
  minimumStored: number | "";
  minimumReturned: number | "";
  amountOfItems: number | "";
  totalRewards: number | "";
}

const validationSchema = Yup.object().shape({
  missionTitle: Yup.string().required("Mission Title Required"),
  missionDescription: Yup.string().required("Mission Description Required"),
  minimumStored: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  minimumReturned: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  totalRewards: Yup.number()
    .typeError("Please enter a valid number")
    .required("Number is required"),
  location: Yup.string().required("Location Required"),
});

const MissionCreation = () => {
  const router = useRouter();
  

  const [editorValue, setEditorValue] = useState<string>("");
  const maxCharacters = 1000;
  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  };

  const [specialInstruction, setSpecialInstruction] = useState("");

  const handleDescriptionChange = (value: string) => {
    setSpecialInstruction(value);
  };

  const [collectionDescription, setCollectionDescription] = useState("");

  const handleCollectionChange = (value: string) => {
    setCollectionDescription(value);
  };

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure double-digit day
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1
  const year = currentDate.getFullYear().toString();

  const formattedDate = `${day}.${month}.${year}`;

  const datePickerWrappers: any = document.querySelectorAll(
    ".react-datepicker-wrapper",
  );

  datePickerWrappers.forEach((datePickerWrapper: any) => {
    datePickerWrapper.style.setProperty("width", "100%", "important");
  });

  const { accessToken } = useAuthContext();
  const dispatch = useAppDispatch();

  const { isDataLoading, getAllItemsBatchList, getNotUsedBatchList, createBounty, myProducts, isDataLoading2, getAllBatchList } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    getAllItemsBatchList: s.user.getAllItemsBatchList,
    getNotUsedBatchList: s.user.getNotUsedBatchList,
    createBounty: s.user.createBounty,
    myProducts: s.user.myProducts,
    isDataLoading2: s.user.isDataLoading2,
    getAllBatchList: s.user.getAllBatchList.result,
  }));

  const [selectedBatch, setSelectedBatch] = useState();

  const onSelectBatch = (item: any) => {
    setSelectedBatch(item);
    dispatch(
      userActions.getAllBatchList({
        token: accessToken,
        product_id: selectedOption?._id,
        page: 1,
        page_size: 1000,
      })
    );
  };
  
  useEffect(() => {
    dispatch(userActions.setGetNotUsedBatchList(false));
    dispatch(userActions.getMyProducts({ token: accessToken }));
  },[])

  const [selectedOption, setSelectedOption] = useState(myProducts[0] || undefined);

  const [selectedgetAllItemsBatchListOption, setSelectedgetAllItemsBatchListOption] = useState(getAllBatchList[0] || undefined);

  useEffect(() => {
    setSelectedgetAllItemsBatchListOption(getAllBatchList[0]);
  },[getAllBatchList])

  
  const [getNotUsedBatch, setGetNotUsedBatch] = useState(false);

  const checkGetUsedBatchHandle = () => {
    const data = {
      token: accessToken,
      product_id: selectedOption?._id,
      page: 1,
      page_size: 10,
    };
    dispatch(userActions.getNotUsedBatchList(data));
  };

  useEffect(() => {
    if (getNotUsedBatchList.status == "success") {
      setGetNotUsedBatch(true);
    }
    else {
      setGetNotUsedBatch(false);
    }
  },[getNotUsedBatchList]);

  const [submitData, setSubmitData] = useState<any>();
  const [missionTitleInput, setMissionTitleInput] = useState<string>("");
  const [missionImageInput, setMissionImageInput] = useState<File | null>(null);
  const [missionStartDate, setMissionStartDate] = useState<string | null>(currentDate.toISOString().split('T')[0]);
  const [missionEndDate, setMissionEndDate] = useState<string | null>(currentDate.toISOString().split('T')[0]);
  const [missionLocationInput, setMissionLocationInput] = useState<string>("");
  const [missionCollectionPointInput, setMissionCollectionPointInput] = useState<string>("");
  const [missionMinimumStored, setMissionMinimumStored] = useState<string>("");
  const [missionMinimumReturned, setMissionMinimumReturned] = useState<string>("");
  const [missionAmountOfItems, setMissionAmountOfItems] = useState<string>("");
  const [missionTotalRewards, setMissionTotalRewards] = useState<string>("");

  const createMissionHandle = async () => {
    //-------------Total Params---------------//
    // ("missionTitleInput", missionTitleInput)
    // ("missionImageInput", missionImageInput)
    // ("productInput", selectedOption.name)
    // ("batch", selectedgetAllItemsBatchListOption?.batch_name)//
    // ("batchused", getNotUsedBatch.toString())//
    // ("missionDescription", editorValue.toString())
    // ("specialInstruction", specialInstruction)
    // ("missionStartDate", missionStartDate)
    // ("missionEndDate", missionEndDate)
    // ("missionLocationInput", missionLocationInput)
    // ("missionCollectionPointInput", missionCollectionPointInput)
    // ("missionCollectionPointDescriptionInput", collectionDescription)
    // ("missionMinimumStored", missionMinimumStored)
    // ("missionMinimumReturned", missionMinimumReturned)
    // ("missionAmountOfItems", missionAmountOfItems)
    // ("missionTotalRewards", missionTotalRewards)
    if (missionTitleInput == "") {
      alert("Please input Mission Title.")
    }
    else if (missionImageInput == null) {
      alert("Please upload Mission Image.")
    }
    else if (selectedOption == undefined) {
      alert("Please create a product and recreate this Mission.")
    }
    else if (editorValue.toString() == "") {
      alert("Please write Mission Description.")
    }
    else if (specialInstruction == "") {
      alert("Please write Special Instructions.")
    }
    else if (missionLocationInput == "") {
      alert("Please input Location.")
    }
    else if (missionCollectionPointInput == "") {
      alert("Please input Collection Point.")
    }
    else if (collectionDescription == "") {
      alert("Please input Collection Point Description.")
    }
    else if (missionMinimumStored.toString() == "") {
      alert("Please input Minimum Amount to be Stored.")
    }
    else if (missionMinimumReturned.toString() == "") {
      alert("Please input Minimum Amount to be Returned.")
    }
    else if (missionAmountOfItems.toString() == "") {
      alert("Please input Amount of Items.")
    }
    else if (missionTotalRewards.toString() == "") {
      alert("Please input Rewards to be allocated.")
    }
    else {
      currentDate.setMinutes(currentDate.getMinutes() - 1440);
      const revertStartDate = new Date(missionStartDate);
      const revertEndDate = new Date(missionEndDate);
      if (revertStartDate < currentDate) {
        alert("Start date should be current date or later.");
      } else if (revertEndDate <= revertStartDate) {
        alert("End date should be later than the start date.");
      }
      else {
        const formData = new FormData();
        formData.append('company_name', missionTitleInput);
        formData.append('company_description', editorValue.toString()); 
        formData.append('bounty_description', collectionDescription); 
        formData.append('start_date', missionStartDate ); 
        formData.append('end_date', missionEndDate); 
        formData.append('bounty_name', missionCollectionPointInput); 
        formData.append('bounty_image', missionImageInput); 
        formData.append('company_image', missionImageInput); 
        formData.append('tags', "test"); 
        formData.append('sample_data_list', "gfdgdf,rtgyrth"); 
        formData.append('image_requirements', "test"); 
        formData.append('image_count', "1"); 
        formData.append('image_format', "jpeg"); 
        formData.append('number_of_verifications', "1000000"); 
        formData.append('entity_list_name', "entity_list:MggkpsmCIVXpIMk"); 
        formData.append('bounty_type', "upload"); 
        formData.append('entity_list_ids', "[]"); 
        formData.append('status', "in_progress"); 
        formData.append('product_id', selectedOption._id); 
        formData.append('special_instructions', specialInstruction); 
        formData.append('minimum_amount_stored', missionMinimumStored);
        formData.append('minimum_amount_returned', missionMinimumReturned); 
        formData.append('amount_of_items', missionAmountOfItems); 
        formData.append('amount_of_reward', missionTotalRewards); 
        formData.append('location', missionLocationInput);
        formData.append('qr_code', ""); 
        if (selectedgetAllItemsBatchListOption?._id) {
          formData.append('batch_ids', selectedgetAllItemsBatchListOption._id);
        } else {
          formData.append('batch_ids', "[]");
        }
        try {
          await dispatch(
            userActions.createBounty({
              accessToken: accessToken,
              formData: formData,
            }),
          );      
          alert("Created Mission successfully!");
          router.push("/");
        } catch (error) {
          alert("Error occurred. Please try again.");
        }
      }
    }
  }

  if (createBounty[0] === "loading") {
    return (
      <div className="flex items-center justify-center">
        {loadingSpinner}
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        missionTitle: "",
        missionImage: "",
        selectProduct: "",
        missionDescription: "",
        specialInstruction: "",
        startDate: currentDate,
        endDate: currentDate,
        location: "",
        collectionPoint: "",
        collectionDescription: "",
        minimumStored: "",
        minimumReturned: "",
        amountOfItems: "",
        totalRewards: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => {}}
    >
      {({ values, touched, isValid, setFieldValue, errors }) => (
        <Form>
          <div className="w-full p-5">
            <div className="flex justify-between">
              <div className="mb-5 text-left font-primary text-3xl font-semibold text-graystrongest">
                Create a Mission
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-3 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Mission Title
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    lipsum
                  </div>
                </div>
                <Field
                  type="text"
                  name="missionTitle"
                  onChange={(e) => {
                    setMissionTitleInput(e.target.value); 
                    setFieldValue('missionTitle', e.target.value);
                  }}
                  placeholder="Example Mission Title"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Title Image
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Upload your title image of your mission
                  </div>
                </div>
                <ImageUploader
                  className="h-[126px]"
                  onImageUpload={(imageFile: File) => {
                    setFieldValue("missionImage", imageFile);
                    setMissionImageInput(imageFile);
                  }}
                />
              </div>
            </div>
            {selectedOption && (
              <div>
                <div className="grid grid-cols-3 border-b border-bordergray">
                  <div className="col-span-2 mb-4 mt-4 flex">
                    <div className="mr-5 min-w-[280px]">
                      <div className="font-primary text-sm font-semibold text-graystrongest">
                        Select Product
                      </div>
                      <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                        Select your created product to be collected
                      </div>
                    </div>
                    <Listbox value={selectedOption} onChange={setSelectedOption}>
                      <div className="relative mt-1 w-full">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left ring-1 ring-gray  ">
                          <span className="block truncate text-base text-darkgray">
                            {selectedOption.name}
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
                            style={{ position: "relative", zIndex: 1 }}
                            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            {myProducts && myProducts.map((person, personIdx) => (
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
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {person.name}
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
                    <div className="w-full ml-2 mt-1">
                      <Batch
                        data={selectedOption}
                        selected={selectedBatch}
                        onSelect={onSelectBatch}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-b border-bordergray">
                  <div className="col-span-2 mb-4 mt-4 flex">
                    <div className="mr-5 min-w-[280px]">
                      <div className="font-primary text-sm font-semibold text-graystrongest">
                        Available Batches for the product
                      </div>
                      <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                        Select available Batches for the product
                      </div>
                    </div>
                    {isDataLoading2 && (
                      <div className="flex justify-center">{loadingSpinner}</div>
                    )}
                    {!isDataLoading2 && selectedgetAllItemsBatchListOption ? (
                      <Listbox 
                        value={selectedgetAllItemsBatchListOption} 
                        onChange={(selectedOption) => {
                          setSelectedgetAllItemsBatchListOption(selectedOption);
                          checkGetUsedBatchHandle();
                      }}>
                        <div className="relative mt-1 w-full">
                          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left ring-1 ring-gray min-h-[32px] ">
                            <span className="block truncate text-base text-darkgray">
                              {selectedgetAllItemsBatchListOption?.batch_name}
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
                              style={{ position: "relative", zIndex: 1 }}
                              className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                              {getAllBatchList.map((person, personIdx) => (
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
                                          selected ? "font-medium" : "font-normal"
                                        }`}
                                      >
                                        {person.batch_name}
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
                    ) : (
                      <div className="text-green font-primary text-sm">There is no available Batches for the product.</div>
                    )}
                  </div>
                  <div className="col-span-2 mb-4 mt-4 flex">
                    <div className="mr-5 min-w-[280px]">
                      <div className="font-primary text-sm font-semibold text-graystrongest">
                        Get Used by other User
                      </div>
                      <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                        Checking whether this batch is used or not
                      </div>
                    </div>
                    {selectedgetAllItemsBatchListOption && (
                      <div className="font-primary text-sm font-semibold text-graystrongest">
                        {isDataLoading && (
                          <div className="flex justify-center">{loadingSpinner}</div>
                        )}
                        {!isDataLoading && getNotUsedBatch && (
                          <div className="text-green">This batch is not used by other user.</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Mission Description
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Write a short introduction.
                  </div>
                </div>
                <DynamicQuillEditor
                  className="w-full font-primary text-sm font-normal text-graystrongest"
                  value={editorValue}
                  onChange={handleEditorChange}
                  placeholder="Our goal is to collect and recycle as many 330ml Coca Cola cans as possible to promote sustainable practices and reduce waste. By participating in this mission, you'll contribute to the conservation of valuable resources and protect the environment from unnecessary pollution."
                  maxCharacters={maxCharacters}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Special Instructions
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Write your special instructions about your products.
                  </div>
                </div>
                <TextareaWithCharacterLimit
                  name="specialInstruction"
                  value={specialInstruction}
                  onChange={handleDescriptionChange}
                  placeholder="Do not bend, cut or smash the cans. Damaged cans will not be accepted."
                  maxCharacters={maxCharacters}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Duration
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Enter your mission dates
                  </div>
                </div>
                <div className="mr-5 w-full">
                  <div className="font-primary text-sm font-medium text-graystrong">
                    From
                  </div>
                  <DatePicker
                    selected={values.startDate}
                    onChange={(date) => {
                      setFieldValue("startDate", date);
                      setMissionStartDate(date ? date.toISOString().split('T')[0] : ''); 
                    }}
                    placeholderText="25/06/2023"
                    className="mb-1 mt-1 flex w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                  />
                </div>
                <div className="w-full">
                  <div className="font-primary text-sm font-medium text-graystrong">
                    Until
                  </div>
                  <div className="flex">
                    <DatePicker
                      selected={values.endDate}
                      onChange={(date) => {
                        setFieldValue("endDate", date);
                        setMissionEndDate(date ? date.toISOString().split('T')[0] : ''); 
                      }}
                      placeholderText="N/A"
                      className="mb-1 mt-1 flex w-full rounded-l-xl border border-bordergray bg-white px-3 py-2 text-sm font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    <div className="mb-1 mt-1 rounded-r-xl border border-bordergray px-3 py-2 font-primary text-sm font-medium text-graystrongest">
                      Disable
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Location
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Enter the location of your mission
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex w-full">
                    <Field
                      type="text"
                      name="location"
                      onChange={(e) => {
                        setMissionLocationInput(e.target.value); 
                        setFieldValue('location', e.target.value);
                      }}
                      placeholder="Example Country"
                      className="mb-1 mt-1 w-full rounded-l-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                    />
                    <div className="mb-1 mt-1 flex w-full max-w-[223px] items-center rounded-r-xl border border-bordergray px-3 py-2 text-center font-primary text-sm font-medium text-graystrongest">
                      <Image
                        src="/assets/images/locationicon.svg"
                        alt="location"
                        width="24"
                        height="24"
                        style={{ marginRight: 10 }}
                        unoptimized
                      />
                      Available Worldwide
                    </div>
                  </div>
                  <div className="mt-2 flex w-fit rounded-xl border border-primary bg-[#ebf7f7] px-1 py-0.5 font-primary text-sm font-medium text-primary">
                    Paris, France
                    <Image
                      src="/assets/images/locationdelete.svg"
                      alt="location"
                      width="16"
                      height="16"
                      style={{ marginLeft: 5, cursor: "pointer" }}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Collection Point
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Enter collection point for your storers
                  </div>
                </div>
                <Field
                  type="text"
                  name="collectionPoint"
                  onChange={(e) => {
                    setMissionCollectionPointInput(e.target.value); 
                    setFieldValue('collectionPoint', e.target.value);
                  }}
                  placeholder="Address"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-graystrongest focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Collection Point Description
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Write your instructions about your collection point.
                  </div>
                </div>
                <TextareaWithCharacterLimit
                  name="collectionDescription"
                  value={collectionDescription}
                  onChange={handleCollectionChange}
                  placeholder="Open from 9-18:00 on weekdays. Closed on weekends.
                  Bring your items to the back entrance"
                  maxCharacters={maxCharacters}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px] max-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Minimum Amount to be Stored
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Set the minimum amount for collectors to complete before
                    storing the items
                  </div>
                </div>
                <Field
                  type="number"
                  name="minimumStored"
                  onChange={(e) => {
                    setMissionMinimumStored(e.target.value); 
                    setFieldValue('minimumStored', e.target.value);
                  }}
                  placeholder="10 Items"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px] max-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Minimum Amount to be Returned
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Set the minimum amount for Storers to complete before
                    returning the items
                  </div>
                </div>
                <Field
                  type="number"
                  name="minimumReturned"
                  onChange={(e) => {
                    setMissionMinimumReturned(e.target.value); 
                    setFieldValue('minimumReturned', e.target.value);
                  }}
                  placeholder="1000 Items"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px] max-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Amount of Items
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Total amount of Items you want to be returned
                  </div>
                </div>
                <Field
                  type="number"
                  name="amountOfItems"
                  onChange={(e) => {
                    setMissionAmountOfItems(e.target.value); 
                    setFieldValue('amountOfItems', e.target.value);
                  }}
                  placeholder="100,000"
                  className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-bordergray">
              <div className="col-span-2 mb-4 mt-4 flex">
                <div className="mr-5 min-w-[280px] max-w-[280px]">
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    Rewards to be allocated
                  </div>
                  <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
                    Total amount of money you allocate
                  </div>
                </div>
                <div className="relative w-full">
                  <div className="absolute left-3.5 top-3.5 font-primary text-base font-normal text-graystrongest">
                    $
                  </div>
                  <Field
                    type="number"
                    name="totalRewards"
                    onChange={(e) => {
                      setMissionTotalRewards(e.target.value); 
                      setFieldValue('totalRewards', e.target.value);
                    }}
                    placeholder="1,00"
                    className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white py-2 pl-7 pr-24  text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
                  />
                  <div className="absolute right-3.5 top-3.5 font-primary text-base font-normal text-graystrongest">
                    Per Item
                  </div>
                </div>
              </div>
              <div className="col-span-1 mb-auto ml-5 mt-auto items-center font-primary text-sm font-semibold">
                = $100,000 in Total
              </div>
            </div>
            <div className="flex fixed top-7 right-14">
              <button
                type="button"
                onClick={createMissionHandle}
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Submit Mission
                <Image
                  src="/assets/images/submiticon.svg"
                  alt="image"
                  width={21}
                  height={21}
                  unoptimized
                  style={{ marginLeft: "8px" }}
                />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MissionCreation;

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
