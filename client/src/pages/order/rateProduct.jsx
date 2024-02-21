import { FaStar } from "react-icons/fa";
import axios from "axios";

import React, { useEffect, useState } from "react";

import useAuth from "../../hook/useAuth";

function RateProduct(props) {
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const initialRatings = props.products.reduce((acc, product) => {
    acc[product._id] = 5; // Set default rating to 5 for every product
    return acc;
  }, {});

  const [ratings, setRatings] = useState(initialRatings);

  const handleRatingChange = (productTitle, rating) => {
    setRatings({ ...ratings, [productTitle]: rating });
  };

  const handleSubmit = async () => {
    const rate =
      Object.values(ratings).reduce((a, b) => a + b, 0) /
      Object.values(ratings).length;

    if (setLoading) setLoading(true);
    await axios
      .post(`rating`, {
        rating: rate,
        comment: reviewText,
        userId: user.id,
        sellerId: props.seller,
        products: props.products.map((prod) => prod._id),
        orderId: props.orderId,
        ratings: ratings,
      })
      .then((res) => {
        props.getData();
      })
      .finally(() => {
        if (setLoading) setLoading(false);
      });
  };

  useEffect(() => {
    setRatings({ ...initialRatings, seller: 5, delievery: 5 });
  }, [props.products]);

  return (
    <div className="p-8 bg-white w-80">
      <h2 className="text-2xl mb-4">Rate Product</h2>
      <div className="flex items-center justify-between my-2">
        <span>Seller</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`mx-1 ${
                i < ratings.seller ? "text-yellow-300" : "text-gray-400"
              }`}
              onClick={() => handleRatingChange("seller", i + 1)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between my-2">
        <span>Delievery</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`mx-1 ${
                i < ratings.delievery ? "text-yellow-300" : "text-gray-400"
              }`}
              onClick={() => handleRatingChange("delievery", i + 1)}
            />
          ))}
        </div>
      </div>

      {props.products.map((product) => (
        <div
          key={product._id}
          className="flex items-center justify-between my-2"
        >
          <span>{product.title}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`mx-1 ${
                  i < ratings[product._id] ? "text-yellow-300" : "text-gray-400"
                }`}
                onClick={() => handleRatingChange(product._id, i + 1)}
              />
            ))}
          </div>
        </div>
      ))}
      <textarea
        className="mt-4 p-2 w-full border rounded"
        placeholder="Your Review"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      ></textarea>
      {loading ? (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          disabled
        >
          Submitting...
        </button>
      ) : (
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit Review
        </button>
      )}
    </div>
  );
}

export default RateProduct;
