import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const HomePage = () => {
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch('/TODO.md'); // Path to your Markdown file in the `public` folder
        const text = await response.text();
        setMarkdown(text);
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Post your Blogs</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/signin')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Signin
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-3 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Signup
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
};
