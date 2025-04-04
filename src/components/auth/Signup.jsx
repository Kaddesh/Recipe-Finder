import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuthForm from "../../hooks/usehookForm";
import { useAuthStore } from "../../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const {
    register,
    handleSubmit,
    handleSignup,
    errors,
    loading,
    watch,
  } = useAuthForm();

  const password = watch("password") || "";

  const isLongEnough = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => setShouldRedirect(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (shouldRedirect) navigate("/completeprofile");
  }, [shouldRedirect, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-orange-500">Sign Up</h2>

        <form onSubmit={handleSubmit(handleSignup)} className="mt-4 space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-orange-300"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-orange-300"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}

            {/* Live password condition feedback */}
            <AnimatePresence>
  {password && (
    <motion.ul
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="text-sm mt-2 space-y-1 overflow-hidden"
    >
      {[
        {
          label: "At least 6 characters",
          condition: isLongEnough,
        },
        {
          label: "One uppercase letter",
          condition: hasUpperCase,
        },
        {
          label: "One lowercase letter",
          condition: hasLowerCase,
        },
        {
          label: "One number",
          condition: hasNumber,
        },
        {
          label: "One special character",
          condition: hasSpecialChar,
        },
      ].map(({ label, condition }, index) => (
        <motion.li
          key={index}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className={condition ? "text-green-600" : "text-red-500"}
        >
          {condition ? "✅" : "❌"} {label}
        </motion.li>
      ))}
    </motion.ul>
  )}
</AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded mt-4"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Signup;
