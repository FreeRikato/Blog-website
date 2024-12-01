import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from './Avatar';

export const NavBar = ({ authorName }: { authorName: String }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };
  return (
    <div className="flex justify-between items-center bg-gray-900 p-4 shadow-lg">
      <div className="text-white text-xl font-bold">
        <Link to="/blog">Blogger</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/blog/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Publish
        </button>
        <button
          onClick={() => logout()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
        <Avatar Name={authorName} />
      </div>
    </div>
  );
};
