import React, {useState}from "react";
import "./Star.css";

function Star() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars, setTotalStars] = useState(5);
  {
    [...Array(totalStars)].map((star, index) => {
      const currentRating = index + 1;

      return (
        <>
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => setRating(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>

          <label style={{ fontWeight: 400 }}>
            Number of stars:
            <input
              style={{ marginLeft: "12px", maxWidth: "50px" }}
            //   onChange={handleChange}
              value={totalStars}
              type="number"
              min={1}
            />
          </label>
        </>
      );
    });
  }
}

export default Star;
