import React, { useState, ChangeEvent } from "react";

interface TextareaWithCharacterLimitProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxCharacters: number;
  className?: string;
}

const TextareaWithCharacterLimit: React.FC<TextareaWithCharacterLimitProps> = ({
  name,
  value,
  onChange,
  placeholder,
  maxCharacters,
  className,
}) => {
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxCharacters) {
      onChange(inputValue);
    }
  };

  return (
    <div className="w-full">
      <textarea
        name={name}
        value={value}
        onChange={handleDescriptionChange}
        placeholder={placeholder}
        className={`mt-1 h-[130px] w-full rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-graystrongest focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary ${className}`}
      />
      <div className="-mt-1 text-left font-primary text-sm font-normal text-graystrongest opacity-50">
        Characters left: {maxCharacters - value.length}
      </div>
    </div>
  );
};

export default TextareaWithCharacterLimit;
