import { IoMdClose } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import React from "react";
import "./index.css";
import CropModal from "./crop";

export default function MainPage() {
  const inputRef = React.useRef();

  const [images, setImages] = React.useState([]);
  const [cropModal, setCropModal] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const downloadImages = () => {
    images.forEach((image) => {
      if (!image.cropped) {
        // Crop the image from the center
        cropImageCenter(image.file).then((blob) => {
          // Update the image with the cropped image
          image.cropped = URL.createObjectURL(blob);
          // Download the cropped image
          const link = document.createElement("a");
          link.download = "image.jpeg";
          link.href = image.cropped;
          link.click();
        });
      } else {
        // download the cropped image
        const link = document.createElement("a");
        link.download = "image.jpeg";
        link.href = image.cropped;
        link.click();
      }
    });
  };

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

  const generatePdf = () => {
    const doc = new jsPDF();

    // circle
    circle(doc);

    // images
    printImages(doc);
  };

  const circle = (doc) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const offsetFromHor = 12.5;
    const offsetFromVert = 10;
    const circleRadiusPoints = 2.5;

    doc.setFillColor(0, 0, 0);
    doc.circle(offsetFromHor, offsetFromVert, circleRadiusPoints, "F"); // Top-left corner
    doc.circle(
      pageWidth - offsetFromHor,
      offsetFromVert,
      circleRadiusPoints,
      "F"
    ); // Top-right corner
    doc.circle(
      offsetFromHor,
      pageHeight - offsetFromVert,
      circleRadiusPoints,
      "F"
    ); // Bottom-left corner

    doc.circle(
      pageWidth - offsetFromHor,
      pageHeight - offsetFromVert,
      circleRadiusPoints,
      "F"
    ); // Bottom-right corner
  };

  const printImages = (doc) => {
    const imageWidth = 55;
    const imageHeight = 55;

    let xPosition = 10;
    let yPosition = 19.75;

    images.forEach((img, index) => {
      html2canvas(document.getElementById(`image-${index}`)).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        if (index % 3 === 0 && index !== 0) {
          xPosition = 10;
          yPosition += imageHeight + 12.5;
        } else if (index !== 0) {
          xPosition += imageWidth + 12.5;
        }

        doc.addImage(
          imgData,
          "PNG",
          xPosition,
          yPosition,
          imageWidth,
          imageHeight
        );

        if (index === images.length - 1) {
          doc.save("images-12.pdf");
        }
      });
    });
  };

  return (
    <>
      {images.length < 12 ? (
        <div className="main-container">
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={async (e) => {
              const files = e.target.files;
              const imgs = [];

              for (let i = 0; i < files.length; i++) {
                if (images.length + imgs.length < 12) {
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

              console.log(imgs);

              setImages((prev) => [...prev, ...imgs]);
            }}
            multiple
          />
          <div className="main-left">
            <div className="main-sub-left">
              <IoDocumentTextOutline />
              <p>Local Files</p>
            </div>
          </div>

          <div className="main-middle">
            <h4>drag & drop</h4>
            <h4>any files</h4>
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

          <div className="main-right">
            <div className="sub-main-right">
              <div className="sub-main-2">
                <p>Selection preview</p>
                <IoMdClose color="red" size={21} />
              </div>
              <p>Click pictures to resize or crop</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 m-5">
              {images.map((image) => (
                <div className="group relative m-3" key={image}>
                  <img
                    src={image.url}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className="group-hover:opacity-100 opacity-0 absolute bottom-0 left-0 right-0 top-0 z-10 bg-[rgba(255,255,255,0.5)] flex justify-center items-end
                transition-all duration-300
                "
                  >
                    <button>
                      <MdOutlineModeEdit
                        size={21}
                        className="mr-2 text-green-900"
                      />
                    </button>
                    <button
                      onClick={() => {
                        setImages((prev) =>
                          prev.filter((img) => img !== image)
                        );
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
            <div className="main-right-btn">
              <button>ADD TO CART</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-3">
          <div className="md:col-span-2 flex justify-center items-center py-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 my-images">
              {images.map((image, index) => {
                return (
                  <div className="aspect-square relative group">
                    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 border-[rgba(0,0,0,0.3)] border-8 " />
                    <img
                      src={image.cropped || image.url}
                      className="object-cover w-full h-full my-images2"
                      id={`image-${index}`}
                    />
                    <div className="absolute top-0 right-0 left-0 bottom-0 z-20 flex justify-end items-end opacity-0 group-hover:opacity-100 transition-all duration-300 p-5">
                      <button
                        onClick={() => {
                          setImages((prev) =>
                            prev.filter((img) => img !== image)
                          );
                        }}
                        className="rounded-full p-2 bg-red-300"
                      >
                        <MdOutlineDeleteOutline
                          className="text-white"
                          size={21}
                        />
                      </button>
                      <button
                        onClick={() => {
                          setImage(image);
                          setCropModal(true);
                        }}
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
          <div className="md:col-span-1 flex justify-center items-center py-5">
            <button
              onClick={() => {
                downloadImages();
              }}
              className="rounded-full p-2 bg-red-600 ml-2 px-3 text-white"
            >
              Download All
            </button>

            <button
              onClick={() => {
                generatePdf();
              }}
              className="rounded-full p-2 bg-red-600 ml-2 px-3 text-white"
            >
              Download Pdf 2
            </button>
          </div>
        </div>
      )}

      <CropModal
        visible={cropModal}
        onClose={() => {
          setCropModal(false);
        }}
        image={image}
        setImages={setImages}
      />
    </>
  );
}
