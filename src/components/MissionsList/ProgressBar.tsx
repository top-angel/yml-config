import React from "react";

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  let cal_percent = 0;
  if (percent == 0) {
    cal_percent = 2;
  } else {
    cal_percent = percent;
  }
  const filledWidth = `${cal_percent}%`;

  return (
    <>
      {percent == null ? (
        <div className="flex w-full items-center">
          <div className="h-2 w-full rounded-full bg-greenweak"></div>
          <div className="ml-2 font-primary text-sm font-medium text-graystrong">
            NA
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center">
          <div className="h-2 w-full rounded-full bg-bordergray">
            <div
              className="h-full rounded-full"
              style={{ width: filledWidth, backgroundColor: "#00B0AD" }}
            ></div>
          </div>
          <div className="ml-2 font-primary text-sm font-medium text-graystrong">
            {percent}%
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
