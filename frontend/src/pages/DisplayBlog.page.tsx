import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Avatar } from '../components/Avatar';
import { NavBar } from '../components/NavBar';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { BACKEND_URL } from '../config';

interface blogDisplayType {
  author?: { username: string };
  title: string;
  content: string;
  createdAt: string;
}

export const DisplayBlog = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<blogDisplayType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = 'Bearer ' + localStorage.getItem('token');
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/${blogId}`, {
          headers: { Authorization: token },
        });
        setBlog(response.data.blog);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [blogId]);

  return (
    <>
      <NavBar authorName="Aravinthan" />
      {loading ? (
        <div>Loading...</div>
      ) : blog ? (
        <div>
          <BlogPage
            authorName={blog.author?.username || 'Anonymous'}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.createdAt}
          />
        </div>
      ) : (
        <div>Blog not found</div>
      )}
    </>
  );
};

interface BlogPageInput {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogPage = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogPageInput) => {
  const formattedDate = !isNaN(new Date(publishedDate).getTime())
    ? new Date(publishedDate).toLocaleDateString()
    : 'Invalid date';

  return (
    <div className="max-w-sm mx-auto bg-white text-gray-900 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex items-center">
        <Avatar Name={authorName} />
        <div className="ml-4">
          <div className="text-lg font-semibold">{authorName}</div>
          <div className="text-sm text-gray-500">{formattedDate}</div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xl font-bold mb-2">{title}</div>
        <div className="text-gray-700 mb-4">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className="text-sm text-gray-500">
          {Math.round(content.length / 100)} {' min read'}
        </div>
      </div>
    </div>
  );
};
