import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import classNames from "classnames";
import { Combobox, Transition } from "@headlessui/react";
import { groupBy } from "../../../utils/utils";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { userActions } from "../../../redux/user/userSlice";
import { useRouter } from "next/router";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [selectedPerson, setSelectedPerson] = useState();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handlePersonClick = (person: any, id: number) => {
    router.push({
      pathname: `/collector/${id}`,
    });
  };

  const { members } = useAppSelector((s) => ({
    members: s.user.members,
  }));

  const filteredPeople =
    query === ""
      ? members
      : members !== undefined
      ? members.filter((person: any) => {
          const name = person.name.first + person.name.last;
          return name.toLowerCase().includes(query.toLowerCase());
        })
      : null;

  const groupedPeople = filteredPeople
    ? groupBy(filteredPeople, "gender")
    : null;

  useEffect(() => {
    dispatch(
      userActions.allMembers({ url: "https://randomuser.me/api/?results=10" })
    );
  }, []);

  const _renderOptions = (group: string) =>
    groupedPeople[group].map((person: any, key: number) => {
      return (
        <Combobox.Option
          key={key}
          value={person}
          onClick={() => handlePersonClick(person, key)}
          className={classNames(
            `flex items-center justify-between px-10 py-2.5`,
            key % 2 === 0 ? "bg-lightgray" : ""
          )}
        >
          <div className="flex items-center gap-3 font-primary text-darkgray">
            <Image
              src={person.picture.thumbnail}
              alt="image"
              width={36}
              height={36}
              unoptimized
              className="rounded-full outline outline-2 outline-purple"
            />
            {person.name.first + " " + person.name.last}
          </div>
          <div className="flex gap-4">
            {group === "male" && (
              <div className="px-2 py-1 text-sm rounded-full bg-purple bg-opacity-20 text-purple">
                +400 Scanned
              </div>
            )}
            <div className="px-2 py-1 text-sm rounded-full bg-green bg-opacity-20 text-green">
              +200 Stored
            </div>
            {group === "female" && (
              <div className="px-2 py-1 text-sm rounded-full bg-darkestpurple bg-opacity-20 text-darkestpurple">
                +400 Returned
              </div>
            )}
            <div className="text-sm text-darkgray">+15 Missions</div>
            {group === "female" && (
              <div className="flex items-center">
                {
                  <Image
                    src="/assets/images/coca-cola.png"
                    alt="cola"
                    width="29"
                    height="29"
                    unoptimized
                    className="rounded-full outline outline-2 outline-white"
                  />
                }
                <Image
                  src="/assets/images/heinken.png"
                  alt="heinken"
                  width="29"
                  height="29"
                  unoptimized
                  className="-ml-1 rounded-full outline outline-2 outline-white"
                />
                <Image
                  src="/assets/images/mo-garage.png"
                  alt="garage"
                  width="29"
                  height="29"
                  unoptimized
                  className="-ml-1 rounded-full outline outline-2 outline-white"
                />
              </div>
            )}
          </div>
        </Combobox.Option>
      );
    });

  return (
    <div className="w-full ">
      <Combobox value={selectedPerson} onChange={setSelectedPerson}>
        {({ open }) => (
          <>
            <div className="relative w-full">
              <IoSearch className="absolute text-xl text-black opacity-50 left-3 top-2" />
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(person: any) =>
                  person.name.first + " " + person.name.last
                }
                className="w-full rounded-3xl bg-gray py-1.5 pl-10 pr-5 text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
              />
            </div>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              className="absolute inset-x-0 w-full bg-white top-24"
            >
              <Combobox.Options className="shadow-sm">
                {groupedPeople &&
                  Object.keys(groupedPeople).map((group: any, key: number) => {
                    return (
                      <>
                        <div
                          className={classNames(
                            "bg-opacity-20 px-10 font-primary text-sm capitalize text-darkgray",
                            key === 0
                              ? "bg-purple "
                              : key === 1
                              ? "bg-green"
                              : "bg-transpurple"
                          )}
                        >
                          {group}
                        </div>
                        {_renderOptions(group)}
                      </>
                    );
                  })}
                <div className="py-2 text-center text-darkgray">
                  {filteredPeople?.length} Results found
                </div>
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
    </div>
  );
};

export default SearchBar;
