import React from 'react';

function BigContent({ bigcontent, smallcontent, position }) {
    return (
        <div className="container my-lg-4">
            <h1 className={`card-text ${position}`}>{bigcontent}</h1>
            <p className={`card-text ${position}`}>{smallcontent}</p>
        </div>
    );
}

export default BigContent;
