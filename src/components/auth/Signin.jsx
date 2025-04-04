import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthForm from "../../hooks/usehookForm";
import { useAuthStore } from "../../store/useAuthStore";

const Signin = () => {
  const { register, handleLogin, handleSubmit, errors, loading } = useAuthForm();
  const { isAuthenticated } = useAuthStore();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => setShouldRedirect(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (shouldRedirect) navigate("/");
  }, [shouldRedirect, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-orange-500">Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-4 space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-2 border border-gray-300 focus:outline-orange-300 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 focus:outline-orange-300 rounded"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white py-2 mt-4 rounded" disabled={loading}>
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Signin;
