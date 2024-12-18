import React, { useState } from "react";
import axios from "axios";
import "../css/feedback.css";
import RatingItem from "../component/RatingItem";
const Feedback = () => {
  // 假設有三個評分項目，每個項目的初始評分為0
  const [ratings, setRatings] = useState([0, 0, 0]);
  const titles = ["Usability", "Practicality", "interface design"]; // 三個評分項目的題目

  const handleRatingChange = (index, value) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };
    const [feedback,setfeedback]=useState({
      name:"",
      email:"",
      template:"",
      comment:"",
    });
  
  const handleChange = (e) => {
    setfeedback((prev) => ({ ...prev,[e.target.name]:e.target.value}));
  }
  const [error,setError] = useState(false)
  const handleClick =async (e) =>{
    e.preventDefault();// 防止表單默認提交行為
    try{
      await axios.post(`http://localhost:3002/api/feedback`,feedback);
      alert("The form has been submitted successfully!")
      setfeedback({ // 清空表單欄位
        name: "",
        email: "",
        template: "",
        comment: "",
      });
    }
    catch(err){
      console.log(err);
      setError(true)
      alert("Submission failed. Please try again later.")
    }
  }



  return (
    <div className="feedback">
      <body>
        <div class="row" className="feedback-row">
          <div class="col-md-12">
            <h1>Feedback</h1>
          </div>
        </div>
        <div class="row" className="feedback-row">
          <div class="col-md-12">
            <div className="rating-form">
              <span>Please rate us</span>
              {ratings.map((rating, index) => (
                <RatingItem
                  key={index}
                  title={titles[index]} // 將標題傳遞給子組件
                  id={"star" + (index + 1)}
                  value={rating}
                  name={"rating" + index}
                  onChange={(e) =>
                    handleRatingChange(index, parseInt(e.target.value))
                  }
                />
              ))}
            </div>{" "}
          </div>
        </div>
        <div class="row" className="feedback-row">
          <div class="col-md-12" >
            <div class="contact-card">
              <span class="title">Leave a Comment</span>
              <form class="contact-form">
                <div class="group">
                  <input placeholder="‎" type="text" required="" onChange={handleChange} name="name" value={feedback.name}/>
                  <label for="name">Name</label>
                </div>
                <div class="group">
                  <input
                    placeholder="‎"
                    type="email"
                    id="email"
                    name="email"
                    required=""
                    onChange={handleChange}
                    value={feedback.email}
                  />
                  <label for="email">Email</label>
                </div>
                <div class="group">
                    <input placeholder="‎" type="text" required="" name="template" onChange={handleChange} value={feedback.template}/>
                    <label for="name">Template</label>
                  </div>

                <div class="group">
                  <textarea
                    placeholder="‎"
                    id="comment"
                    name="comment"
                    rows="5"
                    required=""
                    onChange={handleChange}
                    value={feedback.comment}
                  ></textarea>

                  <label for="comment">Comment</label>
                </div>
                <button type="submit" onClick={handleClick}>Submit</button>
                {error && "Something went wrong!"}
              </form>
            </div>
          </div>
        </div>
        <div class="row" className="feedback-row">
          <div class="col-md-12">
            <div className="infor-card">
              <span>Contact us</span>
              <div class="scard">
                <div class="sbackground"></div>
                <div class="slogo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    class="slogo-svg"
                    viewBox="0 0 16 16"
                    color="white"
                  >
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                  </svg>{" "}
                </div>
                <div class="sbox box1">
                  <span class="sicon">
                    <svg
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                      class="ssvg"
                    >
                      <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
                    </svg>
                  </span>
                </div>
                <div class="sbox box2">
                  {" "}
                  <span class="sicon">
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      class="ssvg"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                  </span>
                </div>
                <div class="sbox box3">
                  <span class="sicon">
                    <svg
                      viewBox="0 0 640 512"
                      xmlns="http://www.w3.org/2000/svg"
                      class="ssvg"
                    >
                      <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                    </svg>
                  </span>
                </div>
                <div class="sbox box4"></div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Feedback;
