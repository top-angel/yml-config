import React, { useState, ChangeEvent, useRef, useEffect } from "react";

interface SelectedImage {
  file: File;
  url: string;
}

type props = {
  className?: string;
  onImageUpload: (imageFile: File) => void;
  batch?: any;
};

const ImageUploader = (props: props) => {
  const { className, onImageUpload } = props;

  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );

  useEffect(() => {
    setSelectedImage(null);
  }, [props.batch]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          if (img.width < 400 || img.height < 400) {
            alert("Image should be larger than 400x400 pixels.");
          } else {
            setSelectedImage({
              file: file,
              url: reader.result as string,
            });
            onImageUpload(file);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {selectedImage ? (
        <div className="relative w-full">
          <img
            src={selectedImage.url}
            alt="Uploaded"
            className={`w-full rounded-2xl py-2 ${className}`}
          />
          <div className="absolute flex justify-between w-full px-2 text-xs font-normal bottom-2 font-primary text-darkgray">
            <button
              onClick={handleButtonClick}
              className="px-2 py-1 text-white bg-black rounded-lg bg-opacity-20"
            >
              Reupload
            </button>
            <div className="px-2 py-1 text-white bg-black rounded-lg bg-opacity-20">
              {selectedImage.file.name}
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleButtonClick}
          className={`border-1 w-full items-center rounded-xl border border-dashed border-bordergray text-center font-primary text-xs font-normal text-darkgray ${className}`}
        >
          <button className="mx-auto mt-5">
            <img
              src={"/assets/images/uploadicon.svg"}
              alt="upload"
              width="40"
              height="40"
            />
          </button>
          <div className="text-sm font-normal font-primary text-graymiddle">
            <span className="cursor-pointer text-primary">
              Click to upload{" "}
            </span>
            or drag and drop
          </div>
          <div className="text-sm font-normal font-primary text-graymiddle">
            SVG, PNG, JPG or GIF (max. 800x800px)
          </div>
        </div>
      )}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
