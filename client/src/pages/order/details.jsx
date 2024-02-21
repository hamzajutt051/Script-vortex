import { useNavigate, useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import ProductInfo from "../../components/order/productInfo";
import axios from "axios";
import CancelModal from "./modal";
import { currencyFormatterAED } from "../../utils/currencyFormatter";
import UpdateModal from "./updateAddress";
import useLoading from "../../hook/useLoading";

export default function OrderDetails() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState(false);

  const getTotal = (cart) => {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }

    return total;
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(`/order/order-details/${id}`)
      .then((res) => {
        setData(res.data.order);
        setCart(res.data.order.products);
      })
      .catch((e) => {
        console.log(e.message);
      });
    setLoading(false);
  };

  const updateStatus = async (status) => {
    setLoading(true);

    await axios
      .patch(`/order/cancel-order-buyer/${id}`)
      .then((res) => {
        getData();
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };

  return (
    <div className=" flex p-6 bg-slate-50 min-h-screen">
      <div className="border w-full mx-auto md:basis-5/6 border-gray-200 shadow p-8 bg-white">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col ">
            <span className="font-semibold uppercase">
              #{id.toString().substring(18, 24)}
            </span>
            <span className="my-3 bg-green-600 text-white uppercase text-sm font-semibold text-center py-2 rounded-md">
              {data.status}
            </span>
          </div>
          <div className="flex flex-col mt-3">
            <span className="text-xs font-semibold text-gray-400 uppercase">
              {new Date(data.createdAt).toLocaleString()}
            </span>
            <span className="my-3 text-xs font-semibold text-gray-500 uppercase">
              Payment Method :{" "}
              {data.paymentMethod === "stripe" ? "Card" : data.paymentMethod}
            </span>
          </div>
        </div>
        <hr className="my-3" />
        {/* Address Info */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-500 uppercase">
              Shipping Address
            </span>
            <span className="text-sm font-semibold text-gray-600 uppercase">
              {data.address}
            </span>
            <span className="text-sm font-semibold text-gray-600 uppercase">
              {data.area}
            </span>
            <div>
              <span className="text-sm font-semibold text-gray-600 uppercase">
                {data.city},{"  "}
              </span>
              <span className="text-sm font-semibold text-gray-600 uppercase">
                {data.country}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-600 uppercase">
              {data.zipcode}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-500 uppercase">
              User Info
            </span>
            <span className="text-sm font-semibold text-gray-600 uppercase">
              {data.name}
            </span>
            <span className="text-sm font-semibold text-gray-600 uppercase">
              {data.email}
            </span>
            <span className="text-sm font-semibold text-gray-600 uppercase">
              {data.phone}
            </span>
            <span className="text-sm font-semibold text-gray-600 uppercase">
              {data.contactMail}
            </span>
            <span className="text-sm font-semibold text-gray-600 uppercase">
              {data.contactPhone}
            </span>
          </div>
          {data.status === "pending" && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-500 uppercase">
                Actions
              </span>

              <button
                className="text-sm font-semibold uppercase
              bg-green-500 text-white py-1 px-3 rounded-md
            "
                onClick={() => setAddress(true)}
              >
                Update
              </button>
            </div>
          )}
        </div>

        <hr className="my-3" />
        <ProductInfo cart={cart} />
        <div className="flex flex-row justify-between">
          {data.status === "pending" ? (
            <div className="mr-3 ">
              <button
                onClick={() => setModal(true)}
                className="uppercase bg-gray-100 text-xs font-semibold py-3 px-6 my-2 ml-3 rounded-sm"
              >
                Cancel
              </button>
              <CancelModal
                open={modal}
                handleClose={() => setModal(false)}
                handleUpdate={() => updateStatus("cancelled")}
              />
            </div>
          ) : (
            <div className="mr-3 " />
          )}
          <div className="flex flex-row mt-2 justify-center">
            <div className="flex flex-col justify-between mr-16 ">
              <span className="uppercase text-xs font-medium text-gray-500 ">
                Sub Total
              </span>
              <span className="uppercase text-xs font-medium text-gray-500 ">
                Shipping
              </span>
              <span className="uppercase text-xs font-medium text-gray-500 ">
                Discount
              </span>

              <span className="uppercase text-xs font-medium text-gray-500 ">
                Total
              </span>
            </div>

            <div className="flex flex-col justify-between">
              <span className="uppercase text-xs font-medium text-gray-600 ">
                {currencyFormatterAED(data.subtotal)}
              </span>
              <span className="uppercase text-xs font-medium text-gray-600 ">
                -----
              </span>

              <span className="uppercase text-xs font-medium text-gray-600 ">
                {currencyFormatterAED(data.subtotal - data.total)}
              </span>

              <span className="uppercase text-xs font-medium text-gray-600 ">
                {currencyFormatterAED(data.total)}
              </span>
            </div>
          </div>
        </div>
        {/* {["delivered", "completed"].includes(data.status) && (
          <>
            {data.rating ? (
              <div className="flex flex-col mt-3">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  You have already rated this order
                </span>
              </div>
            ) : (
              <RateProduct
                products={cart}
                seller={data.seller}
                delievery={data.delievery}
                orderId={id}
                getData={getData}
              />
            )}
          </>
        )} */}
        <UpdateModal
          open={address}
          handleClose={() => setAddress(false)}
          address={{
            _id: data._id,
            address: data.address,
            city: data.city,
            country: data.country,
            zipcode: data.zipcode,
            name: data.name,
            email: data.email,
            phone: data.phone,
            contactMail: data.contactMail,
            area: data.area,
            contactPhone: data.contactPhone,
          }}
          getOrder={getData}
          // handleUpdate={() => updateStatus('cancelled')}
        />
      </div>
    </div>
  );
}
