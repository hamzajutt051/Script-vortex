import { useContext } from "react";
import { CartContext } from "../context/cart";

const useCart = () => {
  const {
    cart,
    addToCart,
    updateQuantity,
    updateImages,
    clearCart,
    loading,
    incrementCart,
    decrementCart,
    removeFromCart,
    reviews,
  } = useContext(CartContext);

  return {
    cart,
    addToCart,
    updateQuantity,
    updateImages,
    clearCart,
    loading,
    incrementCart,
    decrementCart,
    removeFromCart,
    reviews,
  };
};

export default useCart;
