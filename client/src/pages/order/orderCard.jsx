import React from "react";
import { currencyFormatterAED } from "../../utils/currencyFormatter";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";

function EditCard({ order }) {
  const navigation = useNavigate();

  const { products = [] } = order;

  const p1 = products.length > 0 ? products[0] : { images: [] };
  const p2 = products.length > 1 ? products[1] : { images: [] };
  const p3 = products.length > 2 ? products[2] : { images: [] };

  const p1Image = p1?.images?.length > 0 ? p1.images[0] : "";
  const p2Image = p2?.images?.length > 0 ? p2.images[0] : "";
  const p3Image = p3?.images?.length > 0 ? p3.images[0] : "";

  return (
    <div onClick={() => navigation("/order/" + order._id)}>
      <p className="uppercase font-semibold text-xl ">
        #{order._id.toString().substring(18, 24)}
      </p>
      <div div className="py-3 flex flex-row justify-between flex-wrap">
        <div className="flex flex-row relative">
          <div className="flex flex-row relative">
            {products.length > 1 && (
              <div className="shadow-white shadow-lg z-0 w-16 h-20  bg-white flex items-center ">
                <img
                  src={
                    products.length == 2
                      ? getImageUrl(p1Image)
                      : getImageUrl(p2Image)
                  }
                  className=" rounded-sm absolute left-[20px] border rotate-[-20deg] w-16 h-20 object-contain"
                />
              </div>
            )}
            {products.length >= 1 && products.length != 2 ? (
              <div className=" shadow-white shadow-lg border-white border z-10 w-16 h-20  bg-white flex items-center ">
                <img
                  src={getImageUrl(p1Image)}
                  className="rounded-sm border bg-white object-contain w-16 h-20"
                />
              </div>
            ) : (
              <div className="h-20 w-5" />
            )}
            {products.length > 1 && (
              <div className="shadow-white shadow-lg z-0 w-16 h-20  bg-white flex items-center justify-center ">
                <img
                  src={
                    products.length == 2
                      ? getImageUrl(p2Image)
                      : getImageUrl(p3Image)
                  }
                  className=" rounded-sm absolute right-[20px] rotate-[20deg] object-contain w-16 h-20 border bg-white "
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center ml-4">
            {products.map((item, index) => {
              return (
                <div key={index} className="flex flex-row justify-between">
                  <span className="text-xs font-semibold capitalize ">
                    {item.title} x {item.quantity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-row mt-2 justify-center">
          <div className="flex flex-col justify-between mr-16 ">
            <span className="uppercase text-xs font-medium text-gray-500">
              Total
            </span>
            <span className="uppercase text-xs font-medium text-gray-500">
              Status
            </span>
            <span className="uppercase text-xs font-medium text-gray-500">
              Payment
            </span>
          </div>

          <div className="flex flex-col justify-between">
            <span className="uppercase text-xs font-medium text-gray-600">
              {currencyFormatterAED(order.total)}
            </span>
            <span className="uppercase text-xs font-medium text-gray-600">
              {order.status}
            </span>
            <span className="uppercase text-xs font-medium text-gray-600">
              {order.paymentMethod === "stripe" ? "Card" : order.paymentMethod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCard;
