import React, { useState } from 'react';

function ProductCounter() {
  const [count, setCount] = useState(1);
  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }   
  };
  return (
    <div className="product-counter d-flex align-items-center gap-4">
        <button className="counter-btn" onClick={decrement}>-</button>
        <div className="counter-num">{count}</div>
        <button className="counter-btn" onClick={increment}>+</button>
    </div>
  )
}

export default ProductCounter;