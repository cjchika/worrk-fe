import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add your register logic here (e.g., API call)
    console.log({ email, password });
    navigate("/"); // Redirect to home after registration
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
