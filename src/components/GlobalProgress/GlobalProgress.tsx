import React from "react";
import Card from "../Card/Card";
import ProgressBar from "../ProgressBar/ProgressBar";

const GlobalProgress = () => {
  return (
    <Card>
      <div className="text-lg font-semibold text-darkgray font-primary">
        GlobalProgress
      </div>
      <ProgressBar
        percentage={70}
        bgcolor="bg-purple"
        label="Scanned"
        value="13400"
        className="mt-3"
      />
      <ProgressBar
        percentage={60}
        bgcolor="bg-green"
        label="Stored"
        value="7051"
        className="mt-3"
      />
      <ProgressBar
        percentage={40}
        bgcolor="bg-darkestpurple"
        label="Returned"
        value="3457"
        className="mt-3"
      />
    </Card>
  );
};

export default GlobalProgress;
