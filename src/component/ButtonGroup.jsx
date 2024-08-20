// ButtonGroup.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ButtonGroup.css'; // Import CSS

const ButtonGroup = () => {
  const [activeButton, setActiveButton] = useState(null);
  const history = useHistory();

  const handleClick = (page, buttonId) => {
    setActiveButton(buttonId);
    history.push(page); // Chuyển trang
  };

  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button
        type="button"
        className={`btn btn-primary ${activeButton === 1 ? 'btn-active' : ''}`}
        onClick={() => handleClick('/page1', 1)}
      >
        Left
      </button>
      <button
        type="button"
        className={`btn btn-primary ${activeButton === 2 ? 'btn-active' : ''}`}
        onClick={() => handleClick('/page2', 2)}
      >
        Middle
      </button>
      <button
        type="button"
        className={`btn btn-primary ${activeButton === 3 ? 'btn-active' : ''}`}
        onClick={() => handleClick('/page3', 3)}
      >
        Right
      </button>
    </div>
  );
};

export default ButtonGroup;
