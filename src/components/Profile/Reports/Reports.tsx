import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import CreateReportModal from "./CreateReportModal";
import FilterModal from "./FilterModal";
import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { userActions } from "src/redux/user/userSlice";

interface DataItem {
  id: number;
  selected: boolean;
  title: string;
  billingDate: string;
  status: string;
  size: string;
}

type DownloadProps = {
  reportData: DataItem[];
};

const dataItem = [
  {
    id: 1,
    selected: false,
    title: "150ml cans",
    billingDate: "Dec 1, 2022",
    status: "Ready",
    size: "14.2 Mb",
  },
  {
    id: 2,
    selected: false,
    title: "150ml cans",
    billingDate: "Nov 1, 2022",
    status: "Ready",
    size: "14.2 Mb",
  },
  {
    id: 3,
    selected: false,
    title: "330ml cans",
    billingDate: "Oct 1, 2022",
    status: "Ready",
    size: "14.2 Mb",
  },
];

const DownloadList = () => {
  const { isDataLoading, getReportsData } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,

    getReportsData: s.user.getReportsData,
  }));


  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [data, setData] = useState<any>(getReportsData);

  const updateReportsData = (newData) => {
    const nextId = Math.max(...data.map(item => item.id), 0) + 1;
  
    const newDataWithId = {
      ...newData,
      id: nextId,
    };
  
    setData([...data, newDataWithId]);
  };

  const updateFilterData = (newData) => {
    const filteredData = data.filter(item => item.title.includes(newData.mission));
    setData(filteredData);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedData = data.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setData(updatedData);
  };

  const toggleSelectRow = (id: number) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });
    setData(updatedData);
  };

  const downloadFile = (id: number) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: "Processing" };
      }
      return item;
    });
    setData(updatedData);

    setTimeout(() => {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          return { ...item, status: "Ready" };
        }
        return item;
      });
      setData(updatedData);
    }, 3000);
  };

  const downloadSelectedFiles = () => {
    const selectedItems = data.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      alert("Please select items to download");
    } else {
      const updatedData = data.map((item) => {
        if (item.selected) {
          return { ...item, status: "Processing" };
        }
        return item;
      });
      setData(updatedData);

      setTimeout(() => {
        const updatedData = data.map((item) => {
          if (item.selected) {
            return { ...item, status: "Ready" };
          }
          return item;
        });
        setData(updatedData);
      }, 3000);
    }
  };

  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showFiltershow, setShowFiltershow] = useState(false);

  const createReporterHandle = () => {
    setShowSlideshow(true)
  };

  const filterHandle = () => {
    setShowFiltershow(true)
  }

  const { accessToken } = useAuthContext();
  const dispatch = useAppDispatch();



  useEffect(() => {
    const actionData = {
      mission_id : "mission:AmKFhpibmzpScMX",
      start_date : "2023-10-15",
      end_date : "2023-11-29",
      sort_by : "asc",
      token: accessToken,
    };
    dispatch(userActions.getReportsData(actionData));
  },[]);

  
  if (isDataLoading) {
    return <LoadingSpinner />;
  }
  

  return (
    <Tab.Panel className="px-6">
      <div className="mb-5 flex justify-between">
        <div>
          <div className="font-primary text-lg font-semibold">Files</div>
          <div className="text-sm text-darkgray">
            Select and download files of your choice
          </div>
        </div>
        <div className="flex">
          <button
            onClick={downloadSelectedFiles}
            className="flex rounded-lg border border-bordergraymiddle px-4 py-2.5 font-primary text-sm font-semibold text-graystrong"
          >
            <Image
              src={"/assets/images/downloadnewicon.svg"}
              alt="download"
              width="20"
              height="20"
              style={{ marginRight: 5 }}
            />
            Download all
          </button>
          <button
            onClick={filterHandle}
            className="mx-4 flex rounded-lg border border-bordergraymiddle px-4 py-2.5 font-primary text-sm font-semibold text-graystrong"
          >
            <Image
              src={"/assets/images/filternewicon.svg"}
              alt="filter"
              width="20"
              height="20"
              style={{ marginRight: 5 }}
            />
            Filter
          </button>
          <button
            onClick={createReporterHandle}
            className="flex rounded-lg border border-bordergraymiddle px-4 py-2.5 font-primary text-sm font-semibold text-graystrong"
          >
            <Image
              src={"/assets/images/createreportnewicon.svg"}
              alt="create"
              width="20"
              height="20"
              style={{ marginRight: 5 }}
            />
            Create a Report
          </button>
        </div>
      </div>
      <table className="reportTable min-w-full rounded-lg border border-bordergray">
        <thead>
          <tr>
            <th className="w-[40px] cursor-pointer py-2 pl-5 text-left font-primary text-xs font-medium text-graymiddle">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                style={{ width: 20, height: 20, marginTop: 5 }}
              />
            </th>
            <th className="w-[700px] px-5 py-2 text-left font-primary text-xs font-medium text-graymiddle">
              Select All
            </th>
            <th className="mt-1.5 flex px-5 py-2 text-left font-primary text-xs font-medium text-graymiddle">
              Billing Date
              <Image
                src={"/assets/images/billingdateicon.svg"}
                alt="billingdate"
                width="16"
                height="16"
                style={{ marginLeft: 2 }}
              />
            </th>
            <th className="px-5 py-2 text-left font-primary text-xs font-medium text-graymiddle">
              Status
            </th>
            <th className="px-5 py-2 text-left font-primary text-xs font-medium text-graymiddle">
              Size
            </th>
            <th className="px-5 py-2 text-right font-primary text-xs font-medium text-graymiddle"></th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item) => (
            <tr key={item._id}>
              <td className="w-[40px] cursor-pointer border-t border-bordergray py-3 pl-5 text-left hover:opacity-90">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleSelectRow(item.id)}
                  style={{ width: 20, height: 20 }}
                />
              </td>
              <td className="flex w-[700px] cursor-pointer items-center border-t border-bordergray px-5 py-3 text-left font-primary text-sm font-medium hover:opacity-90">
                <Image
                  src={"/assets/images/pdficon.svg"}
                  alt="pdf"
                  width="40"
                  height="40"
                  style={{ marginRight: 15 }}
                />
                {item.filename}
              </td>
              <td className="cursor-pointer border-t border-bordergray px-5 py-3 text-left font-primary text-sm font-medium hover:opacity-90">
                {item.created_at}
              </td>
              <td className="cursor-pointer border-t border-bordergray px-5 py-3 text-left font-primary text-sm font-medium hover:opacity-90">
                {item.status === "Ready" && (
                  <Image
                    src={"/assets/images/readyicon.svg"}
                    alt="ready"
                    width="64"
                    height="22"
                  />
                )}
                {item.status === "Processing" && (
                  <Image
                    src={"/assets/images/processingicon.svg"}
                    alt="processing"
                    width="85"
                    height="22"
                  />
                )}
              </td>
              <td className="cursor-pointer border-t border-bordergray px-5 py-3 text-left font-primary text-sm font-medium hover:opacity-90">
                {item.filesize}MB
              </td>
              <td className="cursor-pointer border-t border-bordergray px-5 py-3 text-right font-primary text-sm font-medium hover:opacity-90">
                <div
                  onClick={() => downloadFile(item.id)}
                  className={`cursor-pointer font-primary text-sm font-semibold text-primary ${
                    item.status === "Processing" ? "opacity-30" : "opacity-100"
                  }`}
                >
                  Download
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreateReportModal showSlideshow={showSlideshow} setShowSlideshow={setShowSlideshow} updateReportsData={updateReportsData}/>
      <FilterModal showSlideshow={showFiltershow} setShowSlideshow={setShowFiltershow} updateFilterData={updateFilterData}/>
    </Tab.Panel>
  );
};

export default DownloadList;
