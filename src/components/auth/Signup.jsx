import React from "react";
import useAuthForm from "../../hooks/usehookForm";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { ToastContainer } from "react-toastify";


const Signup = () => {
  const { formData, handleChange, handleSignup, loading } = useAuthForm();
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to="/" />; // Redirect if logged in

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-40">
      <h2 className="text-2xl font-semibold text-center text-orange-500">Sign Up</h2>

      <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className="mt-4">
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mt-2" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded mt-2" value={formData.password} onChange={handleChange} required />

        <button type="submit" className="w-full bg-orange-500 text-white py-2 mt-4 rounded" disabled={loading}>
          {loading ? "Processing..." : "Sign Up"}
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
