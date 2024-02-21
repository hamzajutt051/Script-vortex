import React, { createContext, useCallback, useEffect, useState } from "react";
import { prices } from "../utils/prices";

import axios from "axios";
import useApi from "../hook/useApi";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { uploadImages } = useApi();
  const addToCart = useCallback(
    (images, frame = 9) => {
      const price = prices.find((p) => p.frame === frame);
      const randomId = Math.random().toString(36).substr(2, 9);
      const newCart = [
        ...cart,
        { id: randomId, images, quantity: 1, temp: true, ...price },
      ];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));

      return randomId;
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (id) => {
      const newCart = cart.filter((item) => item.id !== id);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    [cart]
  );

  const incrementCart = useCallback(
    (id) => {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          item.quantity += 1;
        }
        return item;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    [cart]
  );

  const decrementCart = useCallback(
    (id) => {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          if (item.quantity === 1) {
            return item;
          }
          item.quantity -= 1;
        }
        return item;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    [cart]
  );

  const updateImages = async (images, id) => {
    setLoading(true);

    const res = await uploadImages(images);

    if (res.status !== 200) {
      setLoading(false);
      removeFromCart(id);
      return;
    }

    let cart = localStorage.getItem("cart");

    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    console.log("cart", res);

    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.images = res.images;
        item.temp = false;
      }
      return item;
    });

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setLoading(false);
    console.log("images updated");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");

    if (cart) {
      const newCart = JSON.parse(cart);
      if (newCart?.length > 0) {
        const filteredCart = newCart.filter((item) => !item.temp);
        setCart(filteredCart);
        localStorage.setItem("cart", JSON.stringify(filteredCart));
      }
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (loading) {
        const message = "Changes you made may not be saved.";
        event.returnValue = message; // Standard for most browsers
        return message; // For some browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup the event listener when the component unmounts or the loading state changes
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loading]);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    setLoading(true);
    console.log("revieews");
    await axios
      .get("/review")
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateImages,
        loading,
        clearCart,
        incrementCart,
        decrementCart,
        reviews,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
