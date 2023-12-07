import { Tab } from "@headlessui/react";
import { useState, useEffect } from "react";

interface TabPropertyProps {
  tabText: string[];
  selectedBgColor: string;
  alignMode?: string;
  selectedIndex: number;
}

function TabsHeader(props: TabPropertyProps) {
  var [tabContent, setTabContent] = useState<any>([]);

  useEffect(() => {
    var tmp: any = [];

    for (let i: number = 0; i < props.tabText.length; i++) {
      if (i == props.selectedIndex) {
        tmp = [
          ...tmp,
          <Tab
            key={i}
            className={`p-2 text-center transition duration-300 ${props.selectedBgColor} my-2 rounded-xl text-darkgray`}
          >
            {props.tabText[i]}
          </Tab>,
        ];
      } else {
        tmp = [
          ...tmp,
          <Tab
            key={i}
            className={`my-2 rounded-xl bg-transparent p-2 text-center text-darkgray transition duration-300`}
          >
            {props.tabText[i]}
          </Tab>,
        ];
      }
    }

    setTabContent(tmp);
  }, [props.selectedIndex]);

  return (
    <Tab.List
      className={`flex flex-${
        props.alignMode ? "col" : "row"
      } my-3 w-full justify-between`}
    >
      {tabContent}
    </Tab.List>
  );
}

export default TabsHeader;
