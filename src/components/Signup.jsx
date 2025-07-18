import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import authService from "../appwrite/auth";
import { login } from "../store/authSlice";

import Button from "./Button";
import Input from "./Input";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const createAccount = async (data) => {
    setError("");
    try {
      const newUser = await authService.createAccount(data);
      if (newUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-indigo-600">BlogWrite</h1>
          <p className="text-gray-600 text-sm mt-2">
            Join us to start writing amazing stories ✍️
          </p>
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">
          Create your account
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(createAccount)} className="space-y-5">
          <Input
            {...register("name", { required: true })}
            label="Full Name"
            placeholder="John Doe"
          />
          <Input
            {...register("email", { required: true })}
            label="Email"
            type="email"
            placeholder="john@example.com"
          />
          <Input
            {...register("password", { required: true })}
            label="Password"
            type="password"
            placeholder="••••••••"
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
