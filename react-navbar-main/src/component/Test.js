import React, { useState } from 'react';

function DropdownMenu() {
  // 使用狀態來追蹤下拉菜單的顯示狀態
  const [isOpen, setIsOpen] = useState(false);

  // 點擊下拉菜單時切換菜單的顯示狀態
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      {/* 點擊按鈕觸發切換菜單顯示狀態的函式 */}
      <button className="dropdown-toggle" onClick={toggleMenu}>
        點擊這裡
      </button>
      {/* 根據 isOpen 狀態來決定是否顯示下拉菜單 */}
      {isOpen && (
        <ul className="dropdown-menu">
          <li>選項一</li>
          <li>選項二</li>
          <li>選項三</li>
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
