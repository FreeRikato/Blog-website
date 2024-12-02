import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { NavBar } from '../components/NavBar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export const PublishBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  const publish = async () => {
    console.log('Published');
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const data = {
      title: title,
      content: content,
    };
    const response = await axios.post(`${BACKEND_URL}/blog`, data, { headers });
    navigate(`/blog/${response.data.bdDetails.id}`);
  };

  return (
    <>
      <NavBar authorName="Aravinthan" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl px-4 py-8">
          <textarea
            id="title part"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 mb-4 text-2xl font-bold border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            id="content part"
            value={content}
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 mb-4 h-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              onClick={() => setPreview(!preview)}
              className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={publish}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Publish
            </button>
          </div>
          {preview && (
            <div className="mt-8">
              <h2 className="mb-4 text-3xl font-bold">{title}</h2>
              <ReactMarkdown className="prose">{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
