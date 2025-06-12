import authService from "../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import Button from "./Button"
import Input from './Input'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { login as authLogin } from "../store/authSlice"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin({ userData }))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gradient-to-b-100 from-gray-100 to-white">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl shadow-xl p-6 sm:p-10 border border-gray-200">

        <div className="mb-4 flex justify-center">
          <span className="inline-block text-2xl font-bold text-gray-700">BlogWrite</span>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline transition"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p className="text-red-600 mt-6 text-center text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6 sm:mt-8">
          <div className="space-y-4 sm:space-y-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", { required: true })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
