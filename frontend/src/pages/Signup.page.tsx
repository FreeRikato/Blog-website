import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { SignupType } from '@freerikato/blog-website-common';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signup_Page = () => {
  const navigate = useNavigate();
  const [Signup_userInput, setSignup_userInput] = useState<SignupType>({
    email: '',
    username: '',
    password: '',
  });

  const handleClick = async () => {
    const response = await axios.post(`${BACKEND_URL}/user/signup`, {
      email: Signup_userInput.email,
      username: Signup_userInput.username,
      password: Signup_userInput.password,
    });
    setSignup_userInput({
      email: '',
      username: '',
      password: '',
    });
    localStorage.setItem('token', response.data.token);
    navigate('/blog');
  };

  return (
    <div className="min-h-screen flex bg-black text-gray-100 font-sans">
      <div className="w-1/2 flex flex-col justify-center p-12">
        <h1 className="text-5xl font-extrabold mb-8 flex items-center leading-tight">
          Create an Account{' '}
          <ChevronRight className="ml-4 text-blue-500" size={32} />
        </h1>
        <p className="mb-10 text-lg">
          Already have an account?{' '}
          <Link to={'/signin'} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        <div className="space-y-6">
          <input
            id="username"
            name="username"
            type="text"
            value={Signup_userInput.username}
            placeholder="Username"
            onChange={(e) =>
              setSignup_userInput({
                ...Signup_userInput,
                username: e.target.value,
              })
            }
            className="w-full px-6 py-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <input
            id="email"
            name="email"
            type="email"
            value={Signup_userInput.email}
            placeholder="Email"
            onChange={(e) =>
              setSignup_userInput({
                ...Signup_userInput,
                email: e.target.value,
              })
            }
            className="w-full px-6 py-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <input
            id="password"
            name="password"
            type="password"
            value={Signup_userInput.password}
            placeholder="Password"
            onChange={(e) =>
              setSignup_userInput({
                ...Signup_userInput,
                password: e.target.value,
              })
            }
            className="w-full px-6 py-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
            onClick={handleClick}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="w-px bg-gray-700"></div>
      <div className="w-1/2 flex items-center justify-center p-12">
        <blockquote className="text-2xl italic font-light leading-relaxed text-gray-400">
          "If you set your goals ridiculously high and it's a failure, you will
          fail above everyone else's success."
          <span className="block mt-4 text-right">— James Cameron</span>
        </blockquote>
      </div>
    </div>
  );
};
