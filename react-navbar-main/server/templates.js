import axios from "axios";
import React, { useState ,useEffect } from "react";

const getTemplates = async () => {
  const response = await axios.get("http://localhost:3001/templates");
  return response.data;
};

const Templates= () => {
  const [templates, setTemplates] = useState([]);

  const getTemplatesData = async () => {
    const templates = await getTemplates();
    setTemplates(templates);
  };

  useEffect(() => {
    getTemplatesData();
  }, []);

  return (
    <div>
      {templates && (
        <ul>
          {templates.map((template) => (
            <li key={template.id}>{template.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Templates;
