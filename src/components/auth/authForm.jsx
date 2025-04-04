import React from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useAuthForm from "../../hooks/usehookForm";

const AuthForm = () => {
  const { formData, handleChange, handleSignup, handleLogin, loading } = useAuthForm();
  const [isLogin, setIsLogin] = React.useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await handleLogin();
        navigate("/"); // Navigate to home after login
      } else {
        await handleSignup();
        navigate("/login"); // Navigate to login after signup
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-orange-500">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mt-2"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded mt-2"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 mt-4 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="text-center mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button className="text-orange-500 ml-1" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AuthForm;
