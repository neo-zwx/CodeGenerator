import React from "react";
import "../css/tablerow.css"



const TableRow = ({ label, value, onChange }) => (
  <div class="form__group field">
      <input type="input" class="form__field" placeholder={label} required="" value={value} onChange={e => onChange(e.target.value)} />
    <label class="form__label">{label}:</label>
  
  </div>
);

export default TableRow;