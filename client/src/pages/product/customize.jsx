import { useLocation, useNavigate } from "react-router-dom";

import React from "react";

import "./index.css";
import CropModal from "../../components/product/crop";
import ProceedImages from "./proceed";
import SelectImage from "./select";
import useCart from "../../hook/useCart";
import toast from "react-hot-toast";

export default function MainPage() {
  let { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart, updateImages } = useCart();
  const selectedOption = parseInt(state.selectedOption) || 9;
  const [images, setImages] = React.useState([]);
  const [cropModal, setCropModal] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const cropImageCenter = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const minDimension = Math.min(img.width, img.height);
          const offsetX = (img.width - minDimension) / 2;
          const offsetY = (img.height - minDimension) / 2;

          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = minDimension;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(
            img,
            offsetX,
            offsetY,
            minDimension,
            minDimension,
            0,
            0,
            minDimension,
            minDimension
          );

          canvas.toBlob((blob) => {
            resolve(blob);
          }, "image/jpeg");
        };
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  };

  const addImages = async (files) => {
    const imgs = [];
    const length = Array.from(files).length;

    if (images.length + length > selectedOption) {
      toast.error(`You can select total ${selectedOption} images`);
    }

    for (let i = 0; i < length; i++) {
      if (images.length + imgs.length < selectedOption) {
        if (files[i].size > 10000000) {
          toast.error("Image size should be less than 10MB");
          continue;
        }

        if (!files[i].type.startsWith("image/")) {
          toast.error("Only images are allowed");
          continue;
        }

        await cropImageCenter(files[i]).then((blob) => {
          imgs.push({
            file: files[i],
            url: URL.createObjectURL(files[i]),
            cropped: URL.createObjectURL(blob),
          });
        });
      } else {
        break;
      }
    }

    setImages((prev) => [...prev, ...imgs]);
  };

  const addToCartF = async () => {
    const newImages = images.map((image) => image.cropped);
    const id = addToCart(newImages, selectedOption);
    toast.success("Images added to cart");
    updateImages(newImages, id);
    navigate("/cart");
  };

  return (
    <React.Fragment>
      {images.length < selectedOption ? (
        <SelectImage
          images={images}
          deleteImage={(image) => {
            setImages((prev) => prev.filter((img) => img !== image));
          }}
          addImages={addImages}
          deleteAll={() => {
            setImages([]);
          }}
        />
      ) : (
        <ProceedImages
          images={images}
          deleteImage={(image) => {
            setImages((prev) => prev.filter((img) => img !== image));
          }}
          cropImage={(image) => {
            setImage(image);
            setCropModal(true);
          }}
          addToCart={addToCartF}
        />
      )}

      <CropModal
        visible={cropModal}
        onClose={() => {
          setCropModal(false);
        }}
        image={image}
        setImages={setImages}
      />
    </React.Fragment>
  );
}
