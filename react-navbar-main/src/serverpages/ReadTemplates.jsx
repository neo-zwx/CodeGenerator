import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/readfeedback.css";
import "../css/readtemplates.css";
import { Link } from "react-router-dom";

const ReadTemplates = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // 假設每頁顯示5項

  const pageNumbers = [];
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageRangeDisplayed = 2; // 在當前頁碼左右各顯示2個頁碼

  let startPage = Math.max(1, currentPage - pageRangeDisplayed);
  let endPage = Math.min(totalPages, currentPage + pageRangeDisplayed);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/templates`);
        setData(response.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/deletetemplate/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // 計算當前頁面上的數據
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 更改頁面
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 前進到下一頁的函數
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 後退到上一頁的函數
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <h1>Templates List</h1>
      <button type="button" class="btn btn-success" className="addHome">
        <Link to="/AddTemplate" style={{ color: "inherit", textDecoration: "none" }}>
          Add new template
        </Link>
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Template_Name</th>
            <th scope="col">Template_Language</th>
            <th scope="col">Template_Type</th>
            <th scope="col">Template_data</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.template_name}</td>
              <td>{item.template_language}</td>
              <td>{item.template_type}</td>
              <td>
                <pre>{item.template_data}</pre>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-warning"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button type="button" class="btn btn-outline-info">
                  <Link
                    to={`/UpdateTemplates/${item.id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Update
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a onClick={prevPage} href="#!" className="page-link">
              上一頁
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
          <li className="page-item">
            <a onClick={nextPage} href="#!" className="page-link">
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ReadTemplates;
