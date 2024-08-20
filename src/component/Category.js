import React from 'react';

function Category() {
    return (
        <div className="container my-5 d-flex gap-5" style={{ maxWidth: '1400px' }} >
            <div className="card" style={{ width: '18rem' }}>
                <img 
                    src="https://kenh14cdn.com/Images/Uploaded/Share/2010/12/10/64.jpg" 
                    className="card-img-top" 
                    alt="Card image cap" 
                />
                <div className="card-body">
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
                <img 
                    src="https://i.pinimg.com/564x/3c/1c/5d/3c1c5d1e432cfd7dd2b38747c7e7f400.jpg" 
                    className="card-img-top" 
                    alt="Card image cap" 
                />
                <div className="card-body">
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
                <img 
                    src="https://i.pinimg.com/564x/68/8b/75/688b75d8acd3d7761c8b3fc648f30631.jpg" 
                    className="card-img-top" 
                    alt="Card image cap" 
                />
                <div className="card-body">
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>
            </div>
            <div className="card" style={{ width: '18rem' }}>
                <img 
                    src="https://i.pinimg.com/564x/f1/cf/e0/f1cfe0bc486d0b93abd55c7e747a3e2a.jpg" 
                    className="card-img-top" 
                    alt="Card image cap" 
                />
                <div className="card-body">
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Category;
