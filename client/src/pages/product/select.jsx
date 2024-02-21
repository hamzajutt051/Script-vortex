import React from "react";
import "./product.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export default function SelectImage({
  images = [],
  deleteImage,
  addImages,
  deleteAll,
}) {
  const inputRef = React.useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    addImages(files);
  };

  return (
    <div className="main-container w-full">
      {/* <div className="main-left">
        <div className="main-sub-left">
          <IoDocumentTextOutline fontSize="30px" />
          <p>Local Files</p>
        </div>
      </div> */}

      <div
        className="main-middle w-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={async (e) => {
            const files = e.target.files;
            addImages(files);
          }}
          multiple
        />
        <p className="text-4xl ">Drag & Drop</p>
        <p className="text-4xl">any files</p>
        <br />
        <p>or</p>
        <br />
        <div className="main-btn">
          <button
            onClick={() => {
              inputRef.current.click();
            }}
          >
            UPLOAD FROM CAMERA ROLL OR PC
          </button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="main-right">
          <div className="sub-main-right text-center">
            <div className="sub-main-2 justify-center ">
              <p className="text-xl">Selection preview</p>
              {/* <button
                onClick={() => {
                  deleteAll();
                }}
              >
                <IoMdClose color="red" size={21} />
              </button> */}
            </div>
            {/* <p>Click pictures to resize or crop</p> */}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 m-5 ">
            {images.map((image) => (
              <div
                className="group relative m-3 bg-slate-50 flex justify-center items-center"
                key={image}
              >
                <img
                  src={image.url}
                  style={{
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="group-hover:opacity-100 opacity-0 absolute bottom-0 left-0 right-0 top-0 z-10 bg-[rgba(255,255,255,0.5)] flex justify-center items-end
                transition-all duration-300
                "
                >
                  {/* <button>
                    <MdOutlineModeEdit
                      size={21}
                      className="mr-2 text-green-900"
                    />
                  </button> */}
                  <button
                    onClick={() => {
                      deleteImage(image);
                    }}
                  >
                    <MdOutlineDeleteOutline
                      className="text-red-900"
                      size={21}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="main-right-btn text-center ">
            <button
              onClick={() => {
                deleteAll();
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
