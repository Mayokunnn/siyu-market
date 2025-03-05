import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/store/:id" element={<StoreDetailPage />}/>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-change" element={<PasswordChange />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/vendors" element={<AllStores />} />
            <Route path="/products" element={<Productpage />} />
            <Route path="/product/:id" element={<ProductDetail />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
