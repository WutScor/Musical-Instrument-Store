import './App.css';

import { Routes, Route, } from 'react-router-dom'
import Header from './components/Client/header/header';
import Footer from './components/Client/footer/footer';
import HomePage from './pages/Client/home';
import ShopPage from './pages/Client/shop';
import AboutPage from './pages/Client/about';
import ContactPage from './pages/Client/contact';
import UserPage from './pages/Client/user';
import FavoritePage from './pages/Client/favorite';
import SignInPage from './pages/Client/signin';
import SignUpPage from './pages/Client/signup';
import { createContext, useState } from 'react';
import CartPage from './pages/Client/cart/cart';
import CartDialog from './pages/Client/cart/cart-dialog';
import ProductDetail from './pages/Client/product';
import Checkout from './pages/Client/checkout';

const MyContext = createContext();


function App() {
 
  const[cartItemQtty, setCartItemQtty] = useState(0);
  const[isOpenCart, setIsOpenCart] = useState(false);

  const plusCartItemQtty = () => {
    setCartItemQtty(cartItemQtty + 1);
  }

  const minusCartItemQtty = () => {
    if(!cartItemQtty < 1) {
      setCartItemQtty(cartItemQtty - 1);
    }
  }

  const values = {
    cartItemQtty,
    setCartItemQtty,
    plusCartItemQtty,
    minusCartItemQtty,
    isOpenCart,
    setIsOpenCart,
  }

  return (
    <>
      <MyContext.Provider value={values}>
        <Header/>
        <Routes>
            <Route path="/" exact={true} element={<HomePage/>} />
            <Route path='/shop' exact={true} element={<ShopPage/>} />
            <Route path='/about' exact={true} element={<AboutPage/>} />
            <Route path='/contact' exact={true} element={<ContactPage/>} />
            <Route path='/user' exact={true} element={<UserPage/>} />
            <Route path='/favorite' exact={true} element={<FavoritePage/>} />
            <Route path='/cart' exact={true} element={<CartPage/>} />
            <Route path='/signin' exact={true} element={<SignInPage/>} />
            <Route path='/signup' exact={true} element={<SignUpPage/>} />
            <Route path='/product' exact={true} element={<ProductDetail/>} />
            <Route path='/checkout' exact={true} element={<Checkout/>} />
        </Routes>
        <Footer/>

        {
          isOpenCart === true && <CartDialog/>
        }

      </MyContext.Provider>
    </>
  );
}

export default App;

export {MyContext};
