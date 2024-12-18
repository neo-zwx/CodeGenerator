import { React, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/addtemplate.css";
const UpdateTemplates = () => {
  const [template, setTemlpate] = useState({
    template_name: "",
    template_language: "",
    template_type: "",
    template_data: "",
  });
  const handleChange = (e) => {
    setTemlpate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const location = useLocation();

  const templateId = location.pathname.split("/")[2];

  const [error, setError] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault(); // 防止表單默認提交行為
    try {
      await axios.put(`http://localhost:3002/api/updatetemplate/${templateId}`, template);
      alert("已成功修改!");
    } catch (err) {
      console.log(err);
      setError(true);
      alert("修改失敗，請稍後再試。");
    }
  };

  return (
    <div className="addtemplate">
      <h1>Update Template</h1>
      <form className="addtemplate-form">
      <div class="form-group">
        <label class="form-label" for="name">template_name:</label>
        <input
          type="text"
          required=""
          class="form-input"
          onChange={handleChange}
          name="template_name"
          value={template.template_name}
        ></input>
      </div>
      <div class="form-group">
        <label ass="form-label" for="language">language:</label>
        <input
          type="text"
          required=""
          class="form-input"
          onChange={handleChange}
          name="template_language"
          value={template.template_language}
        ></input>
      </div>
      <div class="form-group">
        <label class="form-label" for="type">type:</label>
        <input
          type="text"
          required=""
          class="form-input"
          onChange={handleChange}
          name="template_type"
          value={template.template_type}
        ></input>
      </div>
      <div class="form-group">
        <label class="form-label" for="data">data:</label>
        <textarea
          required=""
          class="form-input"
          onChange={handleChange}
          name="template_data"
          value={template.template_data}
        ></textarea>
      </div>
      <div>
        <button class="form-button" type="submit" onClick={handleClick}>
          Submit
        </button>
        {error && "Something went wrong!"}
      </div>
      </form>
    </div>
    
  );
};
export default UpdateTemplates;
