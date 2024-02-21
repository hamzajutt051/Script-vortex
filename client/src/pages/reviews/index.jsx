import React from "react";
import useCart from "../../hook/useCart";
import Rating from "react-rating";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import "../home/home.css";
import "./reviews.css";

export default function ReviewsPage() {
  const { reviews } = useCart();

  return (
    <div>
      <div className="container">
        <div className="parent-Reviews">
          <h1>Reviews</h1>
          <div className="ag-courses_box">
            <div className="fll">
              {reviews.map((obj, index) => (
                <Review
                  key={index}
                  user={obj.user}
                  rating={obj.rating}
                  review={obj.review}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Review = ({ user, rating, review, index }) => {
  const [seeMore, setSeeMore] = React.useState(false);
  return (
    <div>
      <div className="reviewpage">
        <div class="ag-courses_item">
          <a class="ag-courses-item_link">
            <div className={`ag-courses-item_bg color-${index % 4}`}></div>

            <div class="ag-courses-item_title">{user}</div>
            <div class="ag-courses-item_date-box">
              Rating:
              <span class="ag-courses-item_date">
                {" "}
                <Rating
                  initialRating={rating}
                  readonly
                  emptySymbol={
                    <MdOutlineStarOutline className="text-yellow-500" />
                  }
                  fullSymbol={
                    <MdOutlineStarPurple500 className="text-yellow-500" />
                  }
                />
              </span>
            </div>
            <p className="md:max-w-[300px] min-h-[70px]">
              {seeMore ? review : review.substring(0, 100)}
              {review.length > 100 && !seeMore ? "..." : ""}{" "}
              {review.length > 100 && (
                <button
                  onClick={() => setSeeMore(!seeMore)}
                  className={`ag-courses-item_button font-${index % 4}`}
                >
                  {seeMore ? "See Less" : "See More"}
                </button>
              )}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
