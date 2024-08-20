import React, { useState } from 'react';
import BigContent from '../component/BigContent';
import Hero from '../component/Hero';
import MiniContent from '../component/MiniContent';
import Footer from '../component/Footer';
import BookDialog from '../component/BookDialog';

// Dữ liệu sách
const data = [
  {
    "id": 1,
    "title": "Sách A",
    "description": "'Sách A' là một tác phẩm văn học đầy cảm xúc, mang đến một cái nhìn sâu sắc về cuộc sống và con người.",
    "src": "https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg"
  },
  {
    "id": 2,
    "title": "Sách B",
    "description": "'Sách B' là một hướng dẫn du lịch tuyệt vời, cung cấp những thông tin chi tiết về các điểm đến hấp dẫn trên toàn thế giới.",
    "src": "https://dulichkhanhson.vn/uploads/news/2017_07/tv1.jpg"
  },
  {
    "id": 3,
    "title": "Sách C",
    "description": "'Sách C' takes readers on an extraordinary voyage into the future, where science and imagination merge into one.",
    "src": "https://marketplace.canva.com/EAD47iMryaU/1/0/1024w/canva-%C4%91%C6%A1n-s%E1%BA%AFc-gi%E1%BA%ADt-g%C3%A2n-khu-r%E1%BB%ABng-b%C3%ACa-s%C3%A1ch-b%E1%BA%B1ng-%E1%BA%A3nh-A31uilHaB7k.jpg"
  },
  {
    "id": 4,
    "title": "Sách D",
    "description": "'Sách D' là một tác phẩm nghệ thuật đầy cảm hứng, mang đến cái nhìn sâu sắc về thế giới sáng tạo của nghệ thuật và thiết kế.",
    "src": "https://marketplace.canva.com/EAD5HAtO1ec/1/0/1003w/canva-v%C3%A0ng-n%C3%A2u-chim-h%C3%ACnh-minh-h%E1%BB%8Da-nh%E1%BB%8F-b%C3%A9-tr%E1%BA%BB-em-s%C3%A1ch-b%C3%ACa-cptvdrYhx3Y.jpg"
  },
  {
    "id": 5,
    "title": "Sách E",
    "description": "'Sách E' cung cấp những bí quyết và phương pháp hữu ích để cải thiện bản thân và cuộc sống hàng ngày.",
    "src": "https://inthienhang.com/wp-content/uploads/2020/03/mau-bia-sach-dep.jpg"
  },
  {
    "id": 6,
    "title": "Sách F",
    "description": "'Sách F' brings readers into a world of epic adventures where heroes rise to confront incredible challenges.",
    "src": "https://marketplace.canva.com/EAD46HNrYBs/1/0/1003w/canva-an-%E1%BB%A7i-l%C3%A3ng-m%E1%BA%A1n-s%C3%A1ch-b%C3%ACa-naZIEWMJArU.jpg"
  }
];

function Home() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="Home">
      {/* BigContent Component */}
      <BigContent bigcontent="Fahasa - Camp of the soul" position="text-center" />

      {/* Hero Component */}
      <Hero />

      {/* MiniContent Component */}
      <MiniContent />

      {/* Product Sections */}
      <div className="container d-flex flex-wrap justify-content-center p-3">
        {data.map((book) => (
          <div key={book.id} className="position-relative m-4">
            <img
              src={book.src}
              alt={book.title}
              style={{ width: "18rem", height: "30rem", objectFit: "cover" }}
              onClick={handleClickOpen}
            />
            <div className="overlay d-flex align-items-center justify-content-center text-white">
              <div className="text-center">
                <h5>{book.title}</h5>
                <p>{book.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Footer Component */}
      <Footer />

      {/* Book Dialog */}
      <BookDialog open={openDialog} onClose={handleClose} />
    </div>
  );
}

export default Home;
