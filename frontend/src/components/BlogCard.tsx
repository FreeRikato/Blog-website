import { Avatar } from './Avatar';
import { Link } from 'react-router-dom';

interface BlogCardInput {
  title: string;
  content: string;
  publishedDate: string;
  authorName: string;
  blogId: string;
}

export const BlogCard = ({
  title,
  content,
  publishedDate,
  authorName,
  blogId,
}: BlogCardInput) => {
  const formattedDate = new Date(publishedDate).toLocaleDateString();

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
        <div className="text-xl font-bold mb-2">
          <Link to={blogId}>{title}</Link>
        </div>
        <div className="text-gray-700 mb-4">
          {content.substring(0, 100)} {'...'}
        </div>
        <div className="text-sm text-gray-500">
          {Math.round(content.length / 100)} {' min read'}
        </div>
      </div>
    </div>
  );
};
