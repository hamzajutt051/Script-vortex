import React from "react";

import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import box1 from "../../assets/images/jpg.jpg";
import box2 from "../../assets/images/boxj.jpg";

export default function ProceedImages({
  images = [],
  deleteImage,
  cropImage,
  addToCart,
}) {
  return (
    <div className="md:grid md:grid-cols-3">
      {/*  Left section */}
      <div className="md:col-span-2 flex justify-center items-center py-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-images">
          {images.map((image, index) => {
            return (
              <div className="aspect-square relative group" key={index}>
                <div className="absolute top-0 right-0 left-0 bottom-0 z-10 border-[rgba(0,0,0,0.3)] border-[19px] rounded-lg transition-all duration-300 group-hover:border-[rgba(0,0,0,0.7)] ">
                  <div className="h-full w-full border border-[#fff] border-dashed"></div>
                </div>
                <img
                  src={image.cropped || image.url}
                  className="object-cover w-full h-full my-images2"
                  id={`image-${index}`}
                />
                <div className="absolute top-0 right-0 left-0 bottom-0 z-20 flex justify-end items-end opacity-0 group-hover:opacity-100 transition-all duration-300 p-5">
                  <button
                    onClick={() => {
                      deleteImage(image);
                    }}
                    className="rounded-full p-2 bg-red-300"
                  >
                    <MdOutlineDeleteOutline className="text-white" size={21} />
                  </button>
                  <button
                    onClick={() => cropImage(image)}
                    className="rounded-full p-2 bg-green-300 ml-2"
                  >
                    <MdOutlineModeEdit className="text-white" size={21} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Right section */}
      <div
        className="md:col-span-1 flex justify-center items-center py-5 proceed-parent px-5
      "
      >
        <div className="flex items-center gap-4 btn-end">
          <img src={box1} />
          <p className="w-[70%]">
            {" "}
            You can crop images to fit them into square magnets. Please review
            before placing your order
          </p>
        </div>
        <div className="flex items-center gap-4">
          {" "}
          <img src={box2} />
          <p className="w-[70%]">
            Area beyond the shaded lines will wrap around the edges of your
            magnets
          </p>
        </div>

        <button
          onClick={() => {
            addToCart();
          }}
          className="rounded-full py-3  bg-red-600 ml-2 px-7 text-white btn-end"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
