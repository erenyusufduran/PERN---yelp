import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  const bgCard = (review) => {
    if (review.rating < 3) {
      return "bg-danger";
    } else if (review.rating === 3) {
      return "bg-primary";
    } else {
      return "bg-success";
    }
  };
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className={`card text-white mb-3 mr-4 ${bgCard(review)}`}
            style={{ maxWidth: "30%" }}
          >
            <div className="card-header d-flex justify-content-between">
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
