import React from "react";
import "../css/ratingitem.css";


const RatingItem = ({ title, id, value, name, onChange }) => {
  return (
    <div className="rating">
      <div className="rating-title">{title}</div> {/* 渲染題目 */}
      <div className="rating-stars"> {/* 星星容器 */}
      {[...Array(5)].map((_, i) => (

        <React.Fragment key={i}>
          <input
            value={5 - i}
            name={name}
            id={id + "star" + (5 - i)}
            type="radio"
            onChange={onChange}
            checked={value === 5 - i}
          />
          <label htmlFor={id + "star" + (5 - i)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
    </div>
  );
};export default RatingItem;
