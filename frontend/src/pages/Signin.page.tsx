import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { SigninType } from '@freerikato/blog-website-common';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export const Signin_Page = () => {
  const navigate = useNavigate();
  const [Signin_userInput, setSignin_userInput] = useState<SigninType>({
    username: '',
    password: '',
  });

  const handleClick = async () => {
    const response = await axios.post(`${BACKEND_URL}/user/signin`, {
      username: Signin_userInput.username,
      password: Signin_userInput.password,
    });
    setSignin_userInput({
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
          Login to your Account{' '}
          <ChevronRight className="ml-4 text-blue-500" size={32} />
        </h1>
        <p className="mb-10 text-lg">
          Don't have an Account?{' '}
          <Link to={'/signup'} className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
        <div className="space-y-6">
          <input
            id="username"
            name="username"
            value={Signin_userInput.username}
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setSignin_userInput({
                ...Signin_userInput,
                username: e.target.value,
              });
            }}
            className="w-full px-6 py-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <input
            id="password"
            name="password"
            value={Signin_userInput.password}
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setSignin_userInput({
                ...Signin_userInput,
                password: e.target.value,
              });
            }}
            className="w-full px-6 py-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />
          <button
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
            onClick={handleClick}
          >
            Login
          </button>
        </div>
      </div>
      <div className="w-px bg-gray-700"></div>
      <div className="w-1/2 flex items-center justify-center p-12">
        <blockquote className="text-2xl italic font-light leading-relaxed text-gray-400">
          " It is during our darkest moments that we must focus to see the
          light."
          <span className="block mt-4 text-right">— Aristotle</span>
        </blockquote>
      </div>
    </div>
  );
};
