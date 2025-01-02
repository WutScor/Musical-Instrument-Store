
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
import AddProduct from './pages/Admin/add-product';
import EditProduct from './pages/Admin/edit-product';



function App() {

  const location = useLocation();
  return (
    <AuthProvider>
      <CartContextProvider>
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

            {/* Các route của Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductPage />} />
              <Route path="/admin/products/add" element={<AddProduct />} />
              <Route path="/admin/products/edit" element={<EditProduct />} />
              <Route path="categories" element={<CategoryPage />} />
              <Route path="accounts" element={<AccountPage />} />
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
