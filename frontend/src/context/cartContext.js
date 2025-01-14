import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItemQtty, setCartItemQtty] = useState(() => {
    // Khởi tạo từ session storage hoặc 0 nếu không tồn tại
    const savedQtty = sessionStorage.getItem('cartItemQtty');
    return savedQtty ? parseInt(savedQtty, 10) : 0;
  });

  const [isOpenCart, setIsOpenCart] = useState(false);

  // Cập nhật session storage khi cartItemQtty thay đổi
  useEffect(() => {
    sessionStorage.setItem('cartItemQtty', cartItemQtty);
  }, [cartItemQtty]);

  const plusCartItemQtty = () => setCartItemQtty(cartItemQtty + 1);

  const minusCartItemQtty = () => {
    if (cartItemQtty > 0) {
      setCartItemQtty(cartItemQtty - 1);
    }
  };

  const updateCartItemQtty = (total) => {
    setCartItemQtty(total);
  };

  return (
    <CartContext.Provider
      value={{
        cartItemQtty,
        setCartItemQtty,
        plusCartItemQtty,
        minusCartItemQtty,
        isOpenCart,
        setIsOpenCart,
        updateCartItemQtty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
