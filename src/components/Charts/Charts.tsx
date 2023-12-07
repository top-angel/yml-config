import React from "react";
import BarChartCom from "./BarChart";
import HalfCircleProgressBar from "./RingChart";
import Image from "next/image";

const Charts = () => {
  return (
    <div className="grid grid-cols-3 gap-5 px-7 pt-5">
      <div className="col-span-2 rounded-xl border border-bordergray">
        <div className="flex w-full p-5">
          <Image
            src={"/assets/images/coca-cola.svg"}
            alt="chartsLogo"
            width="56"
            height="56"
          />
          <div className="ml-3 flex w-full">
            <div className="my-auto w-full">
              <div className="flex w-full items-center gap-1">
                <span className="font-primary text-lg font-semibold text-graystrongest">
                  Mission breakdown (330ml Cans)
                </span>
              </div>
              <div className="flex justify-between">
                <div className="font-primary text-sm font-normal text-graymiddle">
                  Keep track of your missions and their success rates
                </div>
              </div>
            </div>
            <Image
              src={"/assets/images/dropdown.svg"}
              alt="dropdown"
              width="20"
              height="20"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="border-b border-t border-bordergray px-5 pb-5 pt-10">
          <BarChartCom />
        </div>
        <div className="text-right">
          <button className="mx-5 my-3 rounded-lg border border-bordergraymiddle px-4 py-2.5 font-primary text-sm font-semibold text-graystrong">
            View full report
          </button>
        </div>
      </div>
      <div className="col-span-1 rounded-xl border border-bordergray">
        <div className="flex w-full p-5">
          <div className="flex w-full">
            <div className="my-auto w-full">
              <div className="flex w-full items-center gap-1">
                <span className="font-primary text-lg font-semibold text-graystrongest">
                  Storers monitored
                </span>
              </div>
              <div className="flex justify-between">
                <div className="font-primary text-sm font-normal text-graymiddle">
                  You’re using 80% of available Storers.
                </div>
              </div>
            </div>
            <Image
              src={"/assets/images/dropdown.svg"}
              alt="dropdown"
              width="20"
              height="20"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="flex justify-between border-t border-bordergray px-5 pt-5">
          <HalfCircleProgressBar total={240} percent={80} />
          <div className="flex h-5">
            <Image
              src={"/assets/images/percentraise.svg"}
              alt="percentraise"
              width="20"
              height="20"
            />
            <div className="ml-1 font-primary text-sm font-medium text-success">
              10%
            </div>
          </div>
        </div>
        <div className="mx-5 my-auto w-full">
          <div className="flex w-full items-center gap-1">
            <span className="font-primary text-base font-medium text-graystrongest">
              You’ve almost reached your potential !
            </span>
          </div>
          <div className="flex justify-between">
            <div className="font-primary text-sm font-normal text-graymiddle">
              You have used 80% of your available storers.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
