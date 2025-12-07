import React, { use } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // send thr photo to imgbb and get the photo url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(image_API_URL, formData).then((res) => {
        const photoURL = res.data.data.url;

        // create a user object to store in mongodb database 
        const userInfo = {
          name: data.name,
          email: data.email,
          photoURL: photoURL,
          role: 'user'
        }
        axiosSecure.post('/users', userInfo)
        .then((res) => {
          if(res.data.insertedId){
            console.log('new user added to database', res.data);
            navigate(location?.state || '/' );
          }
        })
        
        // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile).then(() => {
            console.log("user profie updated");
            navigate(location?.state || '/' );
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { signInGoogle } = useAuth();
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Google login clicked");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create an Account
            </h2>
            <p className="text-gray-600">Register with goParcel</p>
          </div>

           {/* Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("text", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
            />
            {errors.text?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* photo */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input h-14 w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="Enter your photo"
            />
            {errors.text?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Photo is required</p>
            )}
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
                pattern:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{6,}$/,
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
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must have atlleast one uppercase, one number, one
                special characters.
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
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-emerald-600 hover:text-emerald-500 font-medium cursor-pointer transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 primary-btn shadow-md"
          >
            Register
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
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-gray-700"
          >
            <FcGoogle className="text-2xl" />
            Register with Google
          </button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
              state={location.state}
                to="/login"
                className="text-emerald-600 hover:text-emerald-500 font-semibold transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
