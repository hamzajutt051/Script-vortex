import React, { useEffect } from "react";
import { Cropper } from "react-advanced-cropper";

import Modal from "../../components/modal";

export default function CropModal({
  visible = false,
  onClose = () => {},
  image = {},
  setImages = () => {},
}) {
  const cropperRef = React.useRef();

  const onCropChange = (cropper) => {
    console.log(cropper.getCoordinates(), cropper.getCanvas());
  };

  const handleCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      setImages((prev) => {
        return prev.map((img) => {
          if (img.url === image.url) {
            return {
              ...img,
              cropped: canvas.toDataURL(),
              area: cropper.getCoordinates(),
            };
          }
          return img;
        });
      });
      onClose();
    }
  };

  const defaultSize = ({ imageSize, visibleArea }) => {
    return {
      width: (visibleArea || imageSize).width,
      height: (visibleArea || imageSize).height,
    };
  };

  useEffect(() => {
    if (image?.area) {
      setTimeout(() => {
        cropperRef.current.setCoordinates(image.area);
      }, 1000);
    }
  }, [image]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="flex flex-col justify-center items-center h-screen w-screen border">
        <div className="w-1/2 h-1/2 border">
          {image?.url && (
            <Cropper
              ref={cropperRef}
              aspectRatio={1}
              src={image.url}
              onChange={onCropChange}
              className={"cropper"}
              defaultSize={defaultSize}
            />
          )}
        </div>
        <button
          onClick={handleCrop}
          className="bg-blue-500 hover:bg-blue-700 text-white mt-5 py-2 px-4 rounded"
        >
          Crop
        </button>
      </div>
      <button
        className="absolute bottom-0 right-0 p-4"
        onClick={() => {
          onClose();
        }}
      >
        Close
      </button>
    </Modal>
  );
}
