import { createContext, useState } from 'react';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItemQtty, setCartItemQtty] = useState(0);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const plusCartItemQtty = () => setCartItemQtty(cartItemQtty + 1);
  const minusCartItemQtty = () => cartItemQtty > 0 && setCartItemQtty(cartItemQtty - 1);
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
