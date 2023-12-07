import React, { useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps extends ReactQuillProps {
  value: string;
  onChange: (value: string) => void;
  maxCharacters: number;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  maxCharacters,
  ...rest
}) => {
  const [characterCount, setCharacterCount] = useState(value.length);

  const handleEditorChange = (value: string) => {
    if (value.length <= maxCharacters) {
      onChange(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="richText w-full">
      <ReactQuill
        value={value}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link"],
          ],
        }}
        {...rest}
      />
      <p>Characters left: {maxCharacters - characterCount}</p>
    </div>
  );
};

export default QuillEditor;
