import React from 'react';

function MiniContent() {
  return (
    <div className="container my-lg-5 d-flex">
      <div className="container p-0">
        <img 
          src="https://i.ytimg.com/vi/6JNuZRoYBsE/maxresdefault.jpg" 
          className="d-block w-100" 
          
        />
      </div>
      <div className="container ml-4 p-5" style={{ backgroundColor: 'bisque',textAlign: 'left' }}>
        <h1 className="card-text">A book a day  </h1>
        <p className="card-text ">
        Reading more books is a powerful way to gain knowledge and expand your horizons. Each book opens a new door to unexplored worlds, broadening your understanding and perspective. 
        </p>
        <button 
          className="btn  " 
          style={{ position: 'relative', top: '10%', left: '15%', transform: 'translate(-50%, 50%)' }} 
          id="button"
        >
          READ
        </button>
      </div>
    </div>
  );
}

export default MiniContent  ;
