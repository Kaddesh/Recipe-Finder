import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { ToastContainer } from "react-toastify";
import useAuthForm from "../../hooks/usehookForm";

const Signin = () => {
  const { formData, handleChange, handleLogin, loading } = useAuthForm();
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-40">
      <h2 className="text-2xl font-semibold text-center text-orange-500">Login</h2>

      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="mt-4">
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mt-2" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded mt-2" value={formData.password} onChange={handleChange} required />

        <button type="submit" className="w-full bg-orange-500 text-white py-2 mt-4 rounded" disabled={loading}>
          {loading ? "Processing..." : "Login"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signin;
