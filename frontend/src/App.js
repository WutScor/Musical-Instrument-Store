import './App.css';

import { Routes, Route, } from 'react-router-dom'
import Header from './components/header/header';
import Footer from './components/footer/footer';
import HomePage from './pages/Client/home';
import ShopPage from './pages/Client/shop';
import AboutPage from './pages/Client/about';
import ContactPage from './pages/Client/contact';
import UserPage from './pages/Client/user';
import FavoritePage from './pages/Client/favorite';
import CartPage from './pages/Client/cart';


function App() {
  return (
    <>
      <Header/>
      <Routes>
          <Route path="/" exact={true} element={<HomePage/>} />
          <Route path='/shop' exact={true} element={<ShopPage/>} />
          <Route path='/about' exact={true} element={<AboutPage/>} />
          <Route path='/contact' exact={true} element={<ContactPage/>} />
          <Route path='/user' exact={true} element={<UserPage/>} />
          <Route path='/favorite' exact={true} element={<FavoritePage/>} />
          <Route path='/cart' exact={true} element={<CartPage/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
