import React, { useState } from "react";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <input
      type="checkbox"
      className="form-checkbox ml-5 h-5 w-5 rounded-md border border-bordergraymiddle text-primary"
      checked={isChecked}
      onChange={toggleCheckbox}
    />
  );
};

export default Checkbox;
