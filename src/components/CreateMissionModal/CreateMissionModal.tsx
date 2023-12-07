import { Dialog, Transition, RadioGroup, Listbox } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";

const plans = [
  {
    index: 0,
    name: "Use a Template",
    description: "Select your previous missions as a template",
    icon: "/assets/images/copy.svg",
  },
  {
    index: 1,
    name: "From Scratch",
    description: "Fill in all input fields without any prefills",
    icon: "/assets/images/path.svg",
  },
];

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
];

export default function CreateMissionModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(plans[0]);
  const [selectedOption, setSelectedOption] = useState(people[0]);
  const [createMission, setCreateMission] = useState(false);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const createHandle = () => {
    router.push("/creators");
    setCreateMission(true);
  };

  const cancelHandle = () => {
    router.push("/");
  }
  
  useEffect(() => {
    if (router.pathname === '/creators') {
      setCreateMission(true);
    } else {
      setCreateMission(false);
    }
  }, [router.pathname]);

 

  return (
    <>
      <div className="flex items-center justify-center">
        {createMission ? (
          <div className="flex">
             <button
                type="button"
                onClick={cancelHandle}
                className="mr-44 flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <AiFillPlusSquare className="h-5 w-5" />
                Cancel
              </button>
          </div>
        ):(
          <button
            type="button"
            onClick={openModal}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <AiFillPlusSquare className="h-5 w-5" />
            Create a Mission
          </button>
        )}
       
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-lg font-medium leading-6 text-textDarkBlue"
                  >
                    Create a Mission
                    <AiOutlineClose
                      className="h-5 w-5 cursor-pointer hover:opacity-80"
                      onClick={closeModal}
                    />
                  </Dialog.Title>
                  <div className="mt-5">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <div className="grid grid-cols-2 ">
                        {plans.map((plan, index) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={({ active, checked }) =>
                              `${
                                active ? "border  border-primary" : "border-t-1"
                              }
                  ${
                    checked
                      ? "border border-primary bg-primary  bg-opacity-10"
                      : index === 0
                      ? "border-y border-l border-gray"
                      : "border-y border-r border-gray"
                  }
                    relative flex cursor-pointer  px-5 py-4  focus:outline-none ${
                      index === 0 ? "rounded-l-xl" : "rounded-r-xl"
                    }`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex  items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className="flex items-center gap-3 font-primary text-base font-semibold text-textDarkBlue"
                                      >
                                        <div className="rounded-full border border-primary border-opacity-50 bg-primary bg-opacity-10 p-2">
                                          {" "}
                                          <img src={plan.icon} />
                                        </div>{" "}
                                        {plan.name}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="p"
                                        className="pt-5 font-primary text-sm font-light text-darkgray"
                                      >
                                        {plan.description}
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  {selected.index === 0 && (
                    <Listbox
                      value={selectedOption}
                      onChange={setSelectedOption}
                    >
                      <div className="relative mt-1">
                        <Listbox.Button className="relative mt-4 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left ring-1 ring-gray  ">
                          <span className="block truncate text-sm">
                            {selectedOption.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
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
                            {people.map((person, personIdx) => (
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
                  )}
                  <button
                    type="button"
                    onClick={createHandle}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    <AiFillPlusSquare className="h-5 w-5" />
                    Create a Mission
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
