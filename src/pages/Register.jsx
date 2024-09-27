import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../../constants";
import { toast } from "sonner";

const Register = () => {
  const [isLoading, setIsLoading] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      password,
    };

    setIsLoading(true);

    try {
      const response = await fetch(`${APIURL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.msg);
        navigate("/");
      } else {
        toast.error(data.msg);
      }

      console.log(data);
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
          disabled={isLoading}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
        >
          {isLoading ? "Please wait..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
