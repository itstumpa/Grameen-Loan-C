import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation  } from "react-router";
import { useNavigate } from "react-router";


const Login = () => {
const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log(data);

    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || '/' );
      })
      .catch((error) => {
        console.log(error);
      });
  };
const {signInGoogle} = useAuth();
  const handleGoogleLogin = () => {
    signInGoogle()
    .then(result =>{
      console.log(result.user)
    })
    .catch(error => {
      console.log(error)
    })
    // Add your Google login logic here
    console.log("Google login clicked");
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
        <fieldset className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue to your account</p>
          </div>

         
          
          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be 6 characters or longer.
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>
             <Link to='/forgot-password' className="text-sm text-emerald-600 hover:text-emerald-500 font-medium cursor-pointer transition-colors duration-200">
                          Forgot password?
                        </Link>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full py-3 px-4 primary-btn shadow-md"
          >
            Login
          </button>

           {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>


           {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700"
          >
            <FcGoogle className="text-2xl" />
            Login with Google
          </button>

         
          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-emerald-600 hover:text-emerald-500 font-semibold transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;