import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


function VerifyEmail() {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handlenewOTP = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${apiUrl}/users/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resend OTP.');
      }
  
      const data = await response.json();
      toast.success("OTP resent to your mail")
      setError('A new OTP has been sent to your email.');
    } catch (err) {
      console.error('Error resending OTP:', err.message);
      setError(err.message || 'Failed to resend OTP. Please try again.');
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/users/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to verify email.');
      }

      const data = await response.json();
      toast.success("Email verified");
      
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4">
      <div className="py-0 flex items-center justify-center w-[90vw]">
        <div className="h-[90vh] flex items-center justify-center">
          <div className="w-[400px]">
            <h2 className="mb-[12px] text-[36px] font-semibold">Email Verification</h2>
            <p className="mb-[20px] text-[16px] font-normal">Please verify your email (Check spam if not in primary)</p>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <h6 className="mb-[6px] text-[14px] font-medium">OTP</h6>
              <input
                type="text"
                placeholder="Enter the OTP sent to your email"
                className="loginInput w-full mb-[20px] border rounded-[8px] px-[14px] py-[10px]"
                value={otp}
                onChange={handleChange(setOtp)}
                required
              />
              <button
                disabled={loading}
                className="bg-blue-800 w-full cursor-pointer flex items-center text-white rounded-[8px] justify-center py-[10px] mb-[32px]"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
              <h5 className="text-center">
                Don't have an account?{' '}
                <span className="text-[#0179FE] cursor-pointer" onClick={() => navigate('/signup')}>
                  Sign up
                </span>
              </h5>
              <h5 className="text-center">
                <span className="text-[#0179FE] cursor-pointer" onClick={handlenewOTP}>
                  Resend OTP
                </span>
              </h5>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
