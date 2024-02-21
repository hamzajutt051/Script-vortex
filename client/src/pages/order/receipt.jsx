import React, { useContext, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../context/loadingContext";
import axios from "axios";
import { currencyFormatterAED } from "../../utils/currencyFormatter";

const Receipt = () => {
  const [active, setActive] = useState(false);
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const { setIsLoading } = useContext(LoadingContext);

  const handleDownloadPDF = () => {
    const element = document.getElementById("receipt-container");
    html2pdf()
      .set({
        margin: 0.5,
        filename: "receipt.pdf",
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  useEffect(() => {
    if (!active) return;
    handleDownloadPDF();
    setActive(false);
  }, [active]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await axios
        .get(`/order/id/${id}`)
        .then((res) => {
          setOrder(res.data?.order);
        })
        .catch((e) => {
          console.log(e.message);
        });
      setIsLoading(false);
    };

    getData();
  }, [id]);

  const getSubTotal = (cart = []) => {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }

    return total;
  };

  return (
    <div
      id="receipt-container"
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Receipt</h2>
        <p className="text-gray-500">
          Order{" "}
          <span className="uppercase font-semibold">#{order?.orderId}</span>
        </p>
      </div>
      <div className="border-t border-gray-200 pb-4 mb-4">
        {order?.cart?.map((item, index) => (
          <div key={index}>
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-lg capitalize">{item?.title}</p>
                <p className="text-gray-500">
                  {item?.quantity} x {currencyFormatterAED(item?.price)}
                </p>
              </div>
              <p className="text-gray-500">
                {currencyFormatterAED(item?.price * item?.quantity)}
              </p>
            </div>
            <hr className="my-3" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-md font-semibold">Sub Total:</p>
        <p className="text-md">
          {currencyFormatterAED(getSubTotal(order?.cart))}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-md font-semibold">Shipping:</p>
        <p className="text-md">{currencyFormatterAED(150)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-md font-semibold">Discount:</p>
        <p className="text-md">{currencyFormatterAED(order?.discount)}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-md font-semibold">Total:</p>
        <p className="text-md">{currencyFormatterAED(order?.total)}</p>
      </div>
      {!active && (
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => setActive(true)}
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default Receipt;
