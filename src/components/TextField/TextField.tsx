import { FieldHookConfig, useField } from "formik";
import React, { useState } from "react";

type InputProps = {
  label: string;
  name: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  type?: string;
  multiple?: boolean;
  value?: string;
  className?: string;
  placeholder?: string;
  labelclassName?: string;
  setValue?: (val: string) => void;
};

const TextField = ({ label, setValue, ...props }: InputProps) => {
  const [field, meta, helpers] = useField(props);

  const [val, setVal] = useState("");
  const handleChange = (e: any) => {
    field.onChange(e);
    setVal(e.target.value);
    setValue?.(e.target.value);
  };

  return (
    <div className={props.labelclassName}>
      <label>
        <p className="font-primary text-darkgray">{label}</p>
        <input
          {...field}
          {...props}
          value={val}
          onChange={handleChange}
          className={`mt-1 w-96 rounded-md bg-gray px-3 py-2 text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary ${props.className}`}
        />
      </label>
      {meta.touched && meta.error ? (
        <div className="text-sm text-red">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextField;
