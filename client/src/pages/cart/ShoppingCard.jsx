import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

import React, { useEffect, useState } from "react";

import { currencyFormatterAED } from "../../utils/currencyFormatter";
import useCart from "../../hook/useCart";
import { getImageUrl } from "../../utils/getImageUrl";

function ShoppingCard() {
  const navigate = useNavigate();
  const { cart, incrementCart, decrementCart, removeFromCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [tot, setTot] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    navigate("/checkout");
  };

  useEffect(() => {
    let subTotal = total;
    let delivery = 0;

    let tot = subTotal + delivery;

    setTot(tot - (tot * discount) / 100);
  }, [total, discount]);

  return (
    <div className="bg-white m-5">
      <div className="py-5  items-center flex flex-row justify-between px-10 ">
        <p className="font-semibold ">Shopping Cart</p>
        <p className="font-semibold pr-16">{cart.length} Items</p>
      </div>
      <div className="py-5 flex-wrap md:grid-cols-10 sm:grid-cols-12 gap-4 px-5  items-center">
        {/* change the componenet */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-400 uppercase ">
            <tr className="hidden md:table-row">
              <th scope="col" className="px-6 py-3">
                Product Detail
              </th>
              <th scope="col" className="px-6 py-3">
                Quanity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {cart.map((prod) => {
              return (
                <>
                  <tr className="bg-white border hidden md:table-row	">
                    <td className="px-6 py-4">
                      <div className="flex flex-row ">
                        <div>
                          {prod.images && prod.images.length > 0 ? (
                            <img
                              className="w-20 h-20"
                              src={getImageUrl(prod.images[0])}
                            />
                          ) : (
                            <img
                              className="w-20 h-20"
                              src="https://via.placeholder.com/150"
                            />
                          )}
                        </div>
                        <div className="ml-4 py-2">
                          <p className="pb-2  text-gray-700 font-semibold text-sm">
                            {prod.frame} Magnet Frame x {prod.quantity}
                          </p>
                          <button
                            onClick={() => removeFromCart(prod?.id)}
                            className="pb-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <nav aria-label="Page  navigation example">
                        <ul className="inline-flex -space-x-px">
                          <button
                            onClick={() => decrementCart(prod?.id)}
                            className="px-3 py-2 ml-0 leading-tight text-gray-800 font-bold bg-white border border-gray-300 rounded-l-lg"
                          >
                            -
                          </button>
                          <div>
                            <p
                              href="#"
                              className="px-3 py-2 ml-0 leading-tight text-gray-500  bg-white border border-gray-300 "
                            >
                              {prod.quantity}
                            </p>
                          </div>

                          <button
                            onClick={() => incrementCart(prod?.id)}
                            className="px-3 py-2 ml-0 leading-tight text-gray-800 font-bold bg-white border border-gray-300 rounded-r-lg"
                          >
                            +
                          </button>
                        </ul>
                      </nav>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm font-semibold">
                      {currencyFormatterAED(prod.price)}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm font-semibold">
                      {currencyFormatterAED(prod.price * prod.quantity)}
                    </td>
                  </tr>
                  <div className="flex flex-row md:hidden items-center py-2">
                    {prod.images && prod.images.length > 0 ? (
                      <img
                        className="w-20 h-20"
                        src={getImageUrl(prod.images[0])}
                      />
                    ) : (
                      <img
                        className="w-20 h-20"
                        src="https://via.placeholder.com/150"
                      />
                    )}
                    <div className="ml-4 py-2 flex-1">
                      <p className="pb-2  text-gray-700 font-semibold text-sm">
                        {prod.frame} Magnet Frame x {prod.quantity}
                      </p>

                      <p className="pb-2  text-gray-700 font-semibold text-sm">
                        {currencyFormatterAED(prod.price * prod.quantity)}
                      </p>

                      <button
                        onClick={() => removeFromCart(prod?.id)}
                        className="pb-2"
                      >
                        Remove
                      </button>
                    </div>
                    <nav aria-label="Page  navigation example">
                      <ul className="inline-flex flex-col -space-x-px">
                        <button
                          onClick={() => decrementCart(prod?.id)}
                          className="px-3 py-2 ml-0 leading-tight text-gray-800 font-bold bg-white border border-gray-300 rounded-t-lg"
                        >
                          -
                        </button>
                        <div>
                          <p
                            href="#"
                            className="px-3 py-2 ml-0 leading-tight text-gray-500  bg-white border border-gray-300 "
                          >
                            {prod.quantity}
                          </p>
                        </div>

                        <button
                          onClick={() => incrementCart(prod?.id)}
                          className="px-3 py-2 ml-0 leading-tight text-gray-800 font-bold bg-white border border-gray-300 rounded-b-lg"
                        >
                          +
                        </button>
                      </ul>
                    </nav>
                  </div>
                </>
              );
            })}
          </tbody>
        </table>

        {cart.length > 0 ? (
          <div className="flex flex-row justify-between px-10 border-b border-t py-5 mb-2 ">
            <p className="font-semibold ">Subtotal</p>
            <p className="font-semibold pr-16">{currencyFormatterAED(total)}</p>
          </div>
        ) : (
          <div className="flex flex-row justify-center px-10 border-b border-t py-5 mb-2 ">
            <p className="font-semibold ">No Items in Cart</p>
          </div>
        )}
        <div className="flex items-center justify-between ">
          <div className="text-blue-900 pl-5 my-2 text-sm flex flex-row ">
            <BsArrowLeft className="pt-2" />
            <Link to="/" className="">
              Continue Shopping
            </Link>
          </div>
          {cart.length > 0 && (
            <div className="flex flex-row justify-between px-10 ">
              <button
                onClick={handleCheckout}
                className="uppercase bg-blue-400 text-center text-white font-thin px-5 py-3 mb-3"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCard;
