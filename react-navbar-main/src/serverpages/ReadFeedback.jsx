import { React, useState, useEffect } from "react";
import axios from "axios";
import "../css/readfeedback.css"

const ReadFeedback = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/readfeedback`);
        setData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }




  
  return (
    <div>
      <h1>User FeedBack List</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Template</th>
            <th scope="col">Comment</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.Name}</td>
            <td>{item.Email}</td>
            <td>{item.Template}</td>
            <td>{item.Comment}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
export default ReadFeedback;
