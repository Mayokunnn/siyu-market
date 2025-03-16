import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/Usercontext';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useUser();
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }

    const hasUppercase = /[A-Z]/.test(password);
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter';
    }

    const hasLowercase = /[a-z]/.test(password);
    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter';
    }

    const hasNumber = /[0-9]/.test(password);
    if (!hasNumber) {
      return 'Password must contain at least one number';
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const passwordValidation = validatePassword(password);
    if (passwordValidation !== true) {
      setError(passwordValidation);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          telephone,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
      }

      localStorage.setItem("email", email)
      const data = await response.json();
      console.log('data:', data);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/verify-email'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    navigate('/');
    return;
  }

  return (
    <div className="max-w-full mx-auto px-4">
      <div className="w-full py-0 flex items-center justify-center">
        <div className="pt-[30px] flex items-center justify-center">
          <div className="w-full sm:max-w-[600px] px-4">
            <h2 className="mb-[12px] text-[24px] sm:text-[36px] font-semibold">Sign up</h2>
            <p className="mb-[32px] text-[14px] sm:text-[16px] font-normal">Please enter your details</p>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="w-full sm:w-[48%] mb-4 sm:mb-0">
                  <h6 className="mb-[6px] text-[14px] font-medium">First Name</h6>
                  <input
                    type="text"
                    placeholder="ex: John"
                    className="border rounded-[8px] px-[14px] py-[10px] w-full"
                    value={firstName}
                    onChange={handleChange(setFirstName)}
                    required
                  />
                </div>
                <div className="w-full sm:w-[48%]">
                  <h6 className="mb-[6px] text-[14px] font-medium">Last Name</h6>
                  <input
                    type="text"
                    placeholder="ex: Doe"
                    className="border rounded-[8px] px-[14px] py-[10px] w-full"
                    value={lastName}
                    onChange={handleChange(setLastName)}
                    required
                  />
                </div>
              </div>
              <div className="w-full mb-4">
                <h6 className="mb-[6px] text-[14px] font-medium">Telegram Number</h6>
                <input
                  type="text"
                  placeholder="ex: 080xxxxxxxx"
                  className="border rounded-[8px] px-[14px] py-[10px] w-full"
                  value={telephone}
                  onChange={handleChange(setTelephone)}
                  required
                />
              </div>
              <div className="w-full mb-4">
                <h6 className="mb-[6px] text-[14px] font-medium">Email</h6>
                <input
                  type="text"
                  placeholder="Enter your Email"
                  className="border rounded-[8px] px-[14px] py-[10px] w-full"
                  value={email}
                  onChange={handleChange(setEmail)}
                  required
                />
              </div>
              <div className="w-full mb-4">
                <h6 className="mb-[6px] text-[14px] font-medium">Password</h6>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="border rounded-[8px] px-[14px] py-[10px] w-full"
                  value={password}
                  onChange={handleChange(setPassword)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-800 w-full cursor-pointer flex items-center text-white rounded-[8px] justify-center py-[10px] mb-[32px]"
              >
                {loading ? '...Signing Up' : 'Sign up'}
              </button>
              <h5 className="text-center mb-[20px] text-[14px] sm:text-[16px]">
                Already have an account?{' '}
                <span className="text-[#0179FE] cursor-pointer" onClick={() => navigate('/login')}>
                  Login
                </span>
              </h5>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
