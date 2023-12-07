import React, { useState } from "react";
import TabsHeader from "../Tabs/TabsHeader";
import { Tab } from "@headlessui/react";

const tabText1 = [
  "Another Collector",
  "Another Collector",
  "Another Collector",
];
const tabText2 = ["Storer", "Storer", "Storer"];
const tabText3 = [
  "Creator/Recyclium",
  "Creator/Recyclium",
  "Creator/Recyclium",
];

function TabHeader() {
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [selectedIndex2, setSelectedIndex2] = useState(2);
  const [selectedIndex3, setSelectedIndex3] = useState(1);

  return (
    <div className="flex flex-row items-center justify-center gap-5 p-5 mx-3 text-center border-2 border-purple-600 border-dotted text h-tabHeader bg-lightdarkpurple">
      <Tab.Group selectedIndex={selectedIndex1} onChange={setSelectedIndex1}>
        <TabsHeader
          selectedBgColor={"bg-transgray"}
          tabText={tabText1}
          alignMode={"col"}
          selectedIndex={selectedIndex1}
        />
      </Tab.Group>
      <div className="flex flex-col">
        <Tab.Group selectedIndex={selectedIndex2} onChange={setSelectedIndex2}>
          <TabsHeader
            selectedBgColor={"bg-transgreen"}
            tabText={tabText2}
            alignMode={"col"}
            selectedIndex={selectedIndex2}
          />
        </Tab.Group>
      </div>
      <div className="flex flex-col">
        <Tab.Group selectedIndex={selectedIndex3} onChange={setSelectedIndex3}>
          <TabsHeader
            selectedBgColor={"bg-transpurple"}
            tabText={tabText3}
            alignMode={"col"}
            selectedIndex={selectedIndex3}
          />
        </Tab.Group>
      </div>
    </div>
  );
}

export default TabHeader;
