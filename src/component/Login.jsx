import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/Usercontext';
import { toast } from 'sonner';
import Loader from "./Loader";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, login } = useUser();

  useEffect(() => {
    if (user) {
      toast("You are logged in");
      navigate('/'); // Navigate after the component has rendered
    }
  }, [user, navigate]);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email, password }, navigate);
    } catch (err) {
      if (err.message === "Email is unverified. please verify email.") {
        setTimeout(() => navigate('/verify-email'), 1500);
      } else if (err.message === "Failed to fetch") {
        setError('Check your Internet Connection');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <h2 className="mb-4 text-2xl font-semibold">Login</h2>
          <p className="mb-6 text-lg font-normal">Welcome back! Please enter your details</p>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <h6 className="mb-2 text-sm font-medium">Email</h6>
            <input
              type="text"
              placeholder="Enter your Email"
              className="loginInput w-full mb-5 border rounded-md px-4 py-3"
              value={email}
              onChange={handleChange(setEmail)}
              required
            />
            <h6 className="mb-2 text-sm font-medium">Password</h6>
            <input
              type="password"
              placeholder="Enter your password"
              className="loginInput w-full mb-6 border rounded-md px-4 py-3"
              value={password}
              onChange={handleChange(setPassword)}
              required
            />
            <button
              disabled={loading}
              className="bg-blue-800 w-full cursor-pointer flex items-center text-white rounded-md justify-center py-3 mb-6"
            >
              {loading ? <Loader/> : 'Login'}
            </button>
            <h5 className="text-center text-sm">
              Don't have an account?{' '}
              <span
                className="text-[#0179FE] cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </span>
            </h5>
            <h5 className="text-center text-sm">
              Forgot Password?{' '}
              <span
                className="text-[#0179FE] cursor-pointer"
                onClick={() => navigate('/reset-password')}
              >
                Reset now
              </span>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
