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
      <div className="flex flex-col justify-center">
        <textarea
          id="title part"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="content part"
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex flex-row">
          <button onClick={() => setPreview(!preview)}>Preview</button>
          <button onClick={() => publish()}>Submit</button>
        </div>
        {preview ? (
          <div></div>
        ) : (
          <div>
            <h1 className="text-2xl">{title}</h1>
            <div className="prose max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
