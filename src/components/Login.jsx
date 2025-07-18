import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import Button from "./Button";
import Input from "./Input";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 sm:p-10 border border-gray-200 transition-all">
        
        {/* Logo / Title */}
        <div className="flex justify-center mb-6">
          <span className="text-3xl font-bold tracking-tight text-indigo-600">
            BlogWrite
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Sign in to your account
        </h2>

        {/* Subtext */}
        <p className="mt-2 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline transition"
          >
            Sign Up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 text-sm text-center text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: true })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-medium py-2"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
