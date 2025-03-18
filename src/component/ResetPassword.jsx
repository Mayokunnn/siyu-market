import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${apiUrl}/users/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password.");
      }

      const data = await response.json();
      toast.success("Password Reset Successfully");

      setSuccessMessage("A reset password link has been sent to your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <h2 className="mb-4 text-2xl font-semibold">Password Reset</h2>
          <p className="mb-6 text-lg font-normal">
            Enter your email to reset your password
          </p>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-600 mb-4">{successMessage}</p>
          )}
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
            <button
              disabled={loading}
              className="bg-blue-800 w-full flex items-center text-white rounded-md justify-center py-3 mb-6"
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
            <h5 className="text-center text-sm">
              Don't have an account?{" "}
              <span
                className="text-[#0179FE] cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </h5>
            <h5 className="text-center text-sm">
              Back to{" "}
              <span
                className="text-[#0179FE] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </h5>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
