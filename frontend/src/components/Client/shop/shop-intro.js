import React from 'react';

const ShopIntro = () => {
    return (
        <div>
            {/* Introduction Section */}
            <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: '316px',
                backgroundImage: 'url(https://kadence.in/wp-content/uploads/2024/02/1-72.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
            >
            <div style={{ position: 'absolute', textAlign: 'center', zIndex: '1' }}>
                <h1 style={{ color: 'white', fontSize: '3rem' }}>Shop</h1>
                <p style={{ fontSize: '1rem', color: 'white' }}><strong>Home &gt;</strong> Shop</p>
            </div>
            </div>
        </div>
    );
};

export default ShopIntro;
