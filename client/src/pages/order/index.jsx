import axios from "axios";

import React, { useEffect, useState } from "react";

import OrderCard from "./orderCard";
import useLoading from "../../hook/useLoading";
import useAuth from "../../hook/useAuth";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState([]);

  const { setLoading } = useLoading();
  const [status, setStatus] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getOrder = async () => {
      setLoading(true);

      await axios
        .get(
          `/order/get-orders?user=${user?.id}&status=active,pending,completed,cancelled`
        )
        .then((res) => {
          setFilterOrders(res.data.orders);
          setOrders(res.data.orders);
        })
        .catch((err) => console.log(err));

      setLoading(false);
    };

    getOrder();
  }, []);

  useEffect(() => {
    if (status === "") {
      setOrders(filterOrders);
    } else {
      setOrders(filterOrders.filter((order) => order.status === status));
    }
  }, [status]);

  return (
    <div className=" min-h-screen md:flex p-6 bg-slate-50">
      <div className=" md:w-60 flex md:flex-col justify-evenly md:justify-center items-center">
        <button
          onClick={() => setStatus("")}
          className="mb-3 text-sm uppercase text-gray-600 font-semibold "
        >
          All Orders
        </button>
        <button
          onClick={() => setStatus("delivered")}
          className="mb-3 md:mt-3 text-sm uppercase text-gray-600 font-semibold  "
        >
          Delivered
        </button>
        <button
          onClick={() => setStatus("pending")}
          className="mb-3 md:mt-3 text-sm uppercase text-gray-600 font-semibold "
        >
          In Progress
        </button>
        <button
          onClick={() => setStatus("cancelled")}
          className="mb-3 md:mt-3 text-sm uppercase text-gray-600 font-semibold "
        >
          Cancelled
        </button>
      </div>
      <div className="border border-gray-200 shadow p-8 w-full bg-white">
        {orders.map((order, index) => {
          return (
            <div key={index}>
              <OrderCard order={order} />
              <hr className="my-3" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
