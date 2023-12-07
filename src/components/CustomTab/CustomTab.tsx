import { ReactNode } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";

type props = {
  headers: Array<string>;
  children?: ReactNode;
  onTabClick?: (index: number) => void;
};

export default function CustomTab({ headers, children, onTabClick }: props) {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group defaultIndex={1}>
        <Tab.List className="mx-3 my-1 flex w-fit justify-between space-x-1 rounded-xl border border-bordergray">
          {headers.map((header: string, index: number) => (
            <Tab
              key={index}
              className={({ selected }) =>
                classNames(
                  "px-4 py-2.5 text-sm font-normal leading-5 text-graystrong",
                  {
                    "bg-bordergraymiddle bg-opacity-20 outline-none": selected,
                  },
                  {
                    "border-r-1 rounded-l-xl border border-b-0 border-l-0 border-t-0 border-bordergray":
                      index == 0,
                  },
                  {
                    "border-l-1 rounded-r-xl border border-b-0 border-r-0 border-t-0 border-bordergray":
                      index == headers.length - 1,
                  },
                  { hidden: header === " " },
                )
              }
              onClick={() => onTabClick && onTabClick(index)}
            >
              {header}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
