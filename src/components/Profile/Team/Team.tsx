import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Members from "./Members";
import { Tab } from "@headlessui/react";

const people = [{ name: "Viewer" }, { name: "Admin" }];
const Team = () => {
  const [selected, setSelected] = useState(people[0]);

  return (
    <Tab.Panel className="px-6">
      <div className="border border-bordergray  rounded-lg ">
        <div className="p-4 flex items-center justify-between">
          <div>
            <div className="font-primary text-lg font-semibold">
              Team members
              <span className="bg-primary bg-opacity-10 text-sm rounded-2xl px-2 border border-primary ml-3 text-primary border-opacity-40">
                48 Users
              </span>
            </div>
            <div className="text-sm text-darkgray">
              Manage your team members and their account permissions here.
            </div>
          </div>
          <div className="flex">
            <input
              type="email"
              className="rounded-l-md border-y border-bordergray border focus:outline-none px-3 text-sm text-textDarkBlue"
              placeholder="Example@mail.com"
            />
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default  bg-white h-[40px] pl-3 pr-10 text-left text-base font-primary border-y border-bordergray">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
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
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
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
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
            <button className="rounded-r-md font-primary text-sm px-5 bg-primary text-white flex items-center justify-center">
              <PlusIcon className="w-6" /> Add User
            </button>
          </div>
        </div>
        <Members />
      </div>
    </Tab.Panel>
  );
};

export default Team;
