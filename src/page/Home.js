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
    "author": "Tác Giả A",
    "publisher": "Nhà Xuất Bản A",
    "publishedDate": "2023-01-15",
    "isbn": "978-1-23-456789-0",
    "category": "Literature",
    "pageSize": 320,
    "src": "https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_05_08/bia-sach2-9886.jpg",
    "description": "'Sách A' là một tác phẩm văn học đầy cảm xúc, mang đến một cái nhìn sâu sắc về cuộc sống và con người. Cuốn sách này khám phá những chủ đề về tình yêu, sự hy sinh và những giá trị nhân văn cơ bản.",
    "quantity": 15,
    "available": 10
  },
  {
    "id": 2,
    "title": "Sách B",
    "author": "Tác Giả B",
    "publisher": "Nhà Xuất Bản B",
    "publishedDate": "2022-07-20",
    "isbn": "978-1-23-456788-3",
    "category": "Travel",
    "pageSize": 250,
    "src": "https://dulichkhanhson.vn/uploads/news/2017_07/tv1.jpg",
    "description": "'Sách B' là một hướng dẫn du lịch tuyệt vời, cung cấp những thông tin chi tiết về các điểm đến hấp dẫn trên toàn thế giới. Cuốn sách này là bạn đồng hành lý tưởng cho những ai yêu thích khám phá và phiêu lưu.",
    "quantity": 20,
    "available": 15
  },
  {
    "id": 3,
    "title": "Sách C",
    "author": "Tác Giả C",
    "publisher": "Nhà Xuất Bản C",
    "publishedDate": "2020-09-10",
    "isbn": "978-0-19-852663-6",
    "category": "Science Fiction",
    "pageSize": 280,
    "src": "https://marketplace.canva.com/EAD47iMryaU/1/0/1024w/canva-%C4%91%C6%A1n-s%E1%BA%AFc-gi%E1%BA%ADt-g%C3%A2n-khu-r%E1%BB%ABng-b%C3%ACa-s%C3%A1ch-b%E1%BA%B1ng-%E1%BA%A3nh-A31uilHaB7k.jpg",
    "description": "'Sách C' takes readers on an extraordinary voyage into the future, where science and imagination merge into one. This futuristic novel explores the boundaries of technology, the human condition, and the consequences of progress. It's a visionary piece that challenges the reader to consider the ethical implications of scientific advancements.",
    "quantity": 12,
    "available": 7
  },
  {
    "id": 4,
    "title": "Sách D",
    "author": "Tác Giả D",
    "publisher": "Nhà Xuất Bản D",
    "publishedDate": "2021-12-05",
    "isbn": "978-1-23-456787-6",
    "category": "Art",
    "pageSize": 180,
    "src": "https://marketplace.canva.com/EAD5HAtO1ec/1/0/1003w/canva-v%C3%A0ng-n%C3%A2u-chim-h%C3%ACnh-minh-h%E1%BB%8Da-nh%E1%BB%8F-b%C3%A9-tr%E1%BA%BB-em-s%C3%A1ch-b%C3%ACa-cptvdrYhx3Y.jpg",
    "description": "'Sách D' là một tác phẩm nghệ thuật đầy cảm hứng, mang đến cái nhìn sâu sắc về thế giới sáng tạo của nghệ thuật và thiết kế. Cuốn sách này phù hợp cho những ai yêu thích cái đẹp và sự sáng tạo.",
    "quantity": 10,
    "available": 8
  },
  {
    "id": 5,
    "title": "Sách E",
    "author": "Tác Giả E",
    "publisher": "Nhà Xuất Bản E",
    "publishedDate": "2019-11-22",
    "isbn": "978-1-23-456786-3",
    "category": "Self-Help",
    "pageSize": 230,
    "src": "https://inthienhang.com/wp-content/uploads/2020/03/mau-bia-sach-dep.jpg",
    "description": "'Sách E' cung cấp những bí quyết và phương pháp hữu ích để cải thiện bản thân và cuộc sống hàng ngày. Cuốn sách này là người bạn đồng hành lý tưởng cho những ai muốn đạt được mục tiêu và sống một cuộc sống hạnh phúc hơn.",
    "quantity": 18,
    "available": 12
  },
  
    {
      "id": 6,
      "title": "Sách F",
      "author": "Tác Giả F",
      "publisher": "Nhà Xuất Bản F",
      "publishedDate": "2022-11-30",
      "isbn": "978-1-23-456789-5",
      "category": "Adventure",
      "pageSize": 300,
      "src": "https://marketplace.canva.com/EAD46HNrYBs/1/0/1003w/canva-an-%E1%BB%A7i-l%C3%A3ng-m%E1%BA%A1n-s%C3%A1ch-b%C3%ACa-naZIEWMJArU.jpg",
      "description": "'Sách F' brings readers into a world of epic adventures where heroes rise to confront incredible challenges. This novel combines gripping narratives with vivid world-building, offering a captivating experience for fans of adventure stories.",
      "quantity": 8,
      "available": 5
    }
];

function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleClickOpen = (book) => {
    setSelectedBook(book); // Lưu thông tin sách đã chọn
    setOpenDialog(true); // Mở dialog
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedBook(null); // Reset lại sách khi đóng dialog
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
              onClick={() => handleClickOpen(book)} // Sửa lại để không gọi hàm ngay lập tức
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

     

      {/* Book Dialog */}
      {selectedBook && (
        <BookDialog open={openDialog} onClose={handleClose} book={selectedBook} />
      )}
    </div>
  );
}

export default Home;
