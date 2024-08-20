import React from 'react';

function Hero() {
  return (
    <section id="hero">
      <div className="container my-lg-5">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://i.ytimg.com/vi/-ZnCu99Nij8/maxresdefault.jpg"
                className="d-block w-100"
                alt="..."
              />
              <button
                className="btn position-absolute"
                style={{
                  position: 'relative',
                  top: '75%',
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                }}
                id="button"
              >
                FIND OUT
              </button>
            </div>
            <div className="carousel-item">
              <img
                src="https://colorlib.com/wp/wp-content/uploads/sites/2/flower-store-templates.jpg"
                className="d-block w-100"
                alt="..."
              />
              <button
                className="btn position-absolute"
                style={{
                  position: 'relative',
                  top: '75%',
                  left: '20%',
                  transform: 'translate(-50%, 50%)',
                }}
                id="button"
              >
                FIND OUT
              </button>
            </div>
            <div className="carousel-item">
              <img
                src="..." // Thay thế bằng URL hình ảnh thực tế
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
