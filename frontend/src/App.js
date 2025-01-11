
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
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
import CartPage from './pages/Client/cart/cart';
import CartDialog from './pages/Client/cart/cart-dialog';
import ProductDetail from './pages/Client/product';
import GoogleCallback from './pages/Client/googleCallback';

import { AuthProvider } from './context/authContext';
import { CartContextProvider } from './context/cartContext';
import Checkout from './pages/Client/checkout';


// Import các trang Admin
import AdminLayout from './components/Admin/admin-layout';
import Dashboard from './pages/Admin/dashboard';
import ProductPage from './pages/Admin/products';
import CategoryPage from './pages/Admin/categories';
import AccountPage from './pages/Admin/accounts';
import { useEffect } from 'react';
import AddProduct from './pages/Admin/add-product';
import EditProduct from './pages/Admin/edit-product';
import AddAccount from './pages/Admin/add-account';
import EditAccount from './pages/Admin/edit-account';
import OrdersPage from './pages/Client/orders';
import AddCategory from './pages/Admin/add-category';
import EditCategory from './pages/Admin/edit-category';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi URL thay đổi
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.tagName === "A" && event.target.getAttribute("href") === window.location.pathname) {
        window.scrollTo(0, 0); // Cuộn lên đầu nếu nhấn liên kết dẫn đến chính trang hiện tại
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick); // Dọn dẹp sự kiện
  }, []);

  return null;
};

function App() {

  const location = useLocation();
  return (
    <AuthProvider>
      <CartContextProvider>
        <ScrollToTop />
        {!(location.pathname.startsWith('/admin') || location.pathname.startsWith('/auth')) && <Header />}
        <Routes>
            <Route path="/" exact={true} element={<HomePage/>} />
            <Route path='/shop' exact={true} element={<ShopPage/>} />
            <Route path='/about' exact={true} element={<AboutPage/>} />
            <Route path='/contact' exact={true} element={<ContactPage/>} />
            <Route path='/user' exact={true} element={<UserPage/>} />
            <Route path='/favorite' exact={true} element={<FavoritePage/>} />
            <Route path='/cart' exact={true} element={<CartPage/>} />
            <Route path='/auth/signin' exact={true} element={<SignInPage/>} />
            <Route path='/auth/signup' exact={true} element={<SignUpPage/>} />
            <Route path='/product/:id' exact={true} element={<ProductDetail/>} />
            <Route path='/checkout' exact={true} element={<Checkout/>} />
            <Route path='/orders' exact={true} element={<OrdersPage/>} />

            {/* Các route của Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductPage />} />
              <Route path="/admin/products/add" element={<AddProduct />} />
              <Route path="/admin/products/edit" element={<EditProduct />} />
              <Route path="categories" element={<CategoryPage />} />
              <Route path="/admin/categories/add" element={<AddCategory />}></Route>
              <Route path="/admin/categories/edit" element={<EditCategory />} />
              <Route path="accounts" element={<AccountPage />} />
              <Route path="/admin/accounts/add" element={<AddAccount />} />
              <Route path="/admin/accounts/edit" element={<EditAccount />} />
              {/* Thêm các route Admin khác */}
            </Route>
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
        </Routes>
        {!(location.pathname.startsWith('/admin') || location.pathname.startsWith('/auth')) && <Footer />}
        <CartDialog />
      </CartContextProvider>
    </AuthProvider>
  );
}

export default App;
