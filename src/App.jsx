import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import AllStores from './pages/AllStores';
import Productpage from './pages/Productpage';
import ProductDetail from './component/ProductDetail';
import Login from './component/Login';
import SignUp from './component/Signup';
import Cart from './pages/Cart';
import VerifyEmail from './component/VerifyEmail';
import ResetPassword from './component/ResetPassword';
import PasswordChange from './component/PasswordChange';
import Footer from './component/Footer';
import StoreDetailPage from './component/StoreDetailPage';
import Checkout from './pages/Checkout';

function ProtectedCheckout() {
  const location = useLocation();
  const fromCart = sessionStorage.getItem("fromCart");

  if (!fromCart) {
    return <Navigate to="/cart" replace />;
  }

  return <Checkout />;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/store/:id" element={<StoreDetailPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-change" element={<PasswordChange />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/vendors" element={<AllStores />} />
            <Route path="/products" element={<Productpage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<ProtectedCheckout />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          closeButton={true}
          toastOptions={{
            style: {
              background: 'white',
              border: "2px solid blue",
            },
          }}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
