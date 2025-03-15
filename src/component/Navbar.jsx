
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../assets/Component 2.png';
import CartIcon from '../assets/Cart1.png';
import User from '../assets/user.png';
import { useUser } from '../context/Usercontext';
import Logo from '../assets/siyulogo.svg';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout, cart } = useUser();
  const [count, setCount] = useState(0);

  
  useEffect(() => {
    setCount(cart.length); 
  }, [cart]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="w-full flex items-center justify-between mt-8 px-6 py-4 sticky top-0 bg-white z-10 ">
      <div
        className="flex items-end justify-center cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={Logo} className="h-[46px] w-[60px]" alt="Siyu Market" />
        <h2 className="text-3xl font-semibold">Siyu Market</h2>
      </div>

      <div className='flex gap-5 items-center'>
      <span className="lg:block hidden relative cursor-pointer" onClick={() => navigate("/cart")}>
        <img className="hidden md:block hover:scale-110 transition-transform duration-200" src={CartIcon} alt="Cart" />
        { cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs font-bold">
          {cart.length}
        </span>
       )}</span>
        <div
          className="custom:hidden cursor-pointer z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-1 bg-black mb-1"></div>
          <div className="w-6 h-1 bg-black mb-1"></div>
          <div className="w-6 h-1 bg-black"></div>
        </div>
      </div>

      
      <div
        className={`fixed top-0 right-0 h-full bg-white flex-col justify-between flex transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } w-[50%] md:w-[35%] sm:w-[50%] shadow-lg z-40`}
      >
        <div className="flex flex-col items-center mt-16 space-y-6">
          <div
            className="text-lg cursor-pointer mt-[30px] hover:text-blue-800 font-semibold"
            onClick={() => {
              setMenuOpen(false);
              navigate('/');
            }}
          >
            Home
          </div>
          <div
            className="text-lg cursor-pointer hover:text-blue-800 font-semibold"
            onClick={() => {
              setMenuOpen(false);
              navigate('/vendors');
            }}
          >
            Vendors
          </div>
          <div
            className="text-lg cursor-pointer hover:text-blue-800 font-semibold"
            onClick={() => {
              setMenuOpen(false);
              navigate('/products');
            }}
          >
            Products
          </div>
          <div
            className="text-lg cursor-pointer hover:text-blue-800 font-semibold"
            onClick={() => {
              setMenuOpen(false);
              navigate('/cart');
            }}
          >
            Cart
          </div>
          {!user ? (
            <div
              className="text-lg cursor-pointer hover:text-blue-800 font-semibold"
              onClick={() => {
                setMenuOpen(false);
                navigate('/login');
              }}
            >
              Login
            </div>
          ) : (
            <>
              <div
                className="text-lg cursor-pointer hover:text-blue-800 font-semibold "
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/password-change');
                }}
              >
                Change Password
              </div>
              <div
                className="text-lg cursor-pointer hover:text-blue-800 font-semibold"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/order-history');
                }}
              >
                Order History
              </div>
            </>
          )}
          <div
            className="text-lg cursor-pointer hover:text-blue-800 font-semibold"
            onClick={() => {
              setMenuOpen(false);
              navigate('/');
            }}
          >
            About Us
          </div>
        </div>
        <div className="flex justify-center items-center">
          {user && (
            <div
              className="text-lg cursor-pointer bg-blue-800 w-[80%] flex items-center text-white rounded-[8px] justify-center py-[10px] mb-[32px]"
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
            >
              Logout
            </div>
          )}
        </div>
      </div>

      <div className="hidden custom:flex items-center">
        <div
          className="text-normal mr-[24px] cursor-pointer"
          onClick={() => navigate('/')}
        >
          Home
        </div>
        <div
          className="text-normal mr-[24px] cursor-pointer"
          onClick={() => navigate('/vendors')}
        >
          Vendors
        </div>
        <div
          className="text-normal mr-[24px] cursor-pointer"
          onClick={() => navigate('/products')}
        >
          Products
        </div>
        <div
          className="text-normal mr-[24px] cursor-pointer"
          onClick={() => navigate('/')}
        >
          About Us
        </div>
      </div>

      <div className="hidden custom:flex items-center justify-center">
        <div className="flex justify-between items-center">
          <div onClick={() => navigate('/cart')} className="relative">
            <img
              src={CartIcon}
              alt="Cart Icon"
              className="my-[7px] mr-[16px] cursor-pointer"
            />
            <div className="w-[15px] h-[15px] rounded-full bg-red-600 text-white absolute top-2 right-4 flex items-center justify-center text-[10px]">
              {count}
            </div>
          </div>
          <div className="relative">
            <img
              src={User}
              alt="User Icon"
              className="my-[7px] cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-4 w-48">
                {!user ? (
                  <div
                    className="cursor-pointer py-2 hover:bg-gray-100"
                    onClick={() => {
                      navigate('/login');
                      setDropdownOpen(false);
                    }}
                  >
                    Login
                  </div>
                ) : (
                  <>
                    <div
                      className="cursor-pointer py-2 hover:bg-gray-100"
                      onClick={() => {
                        navigate('/password-change');
                        setDropdownOpen(false);
                      }}
                    >
                      Change Password
                    </div>
                    <div
                      className="cursor-pointer py-2 hover:bg-gray-100"
                      onClick={() => {
                        navigate('/order-history');
                        setDropdownOpen(false);
                      }}
                    >
                      Order History
                    </div>
                    <div
                      className="cursor-pointer py-2 hover:bg-gray-100"
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                    >
                      Logout
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
