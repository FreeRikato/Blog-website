import { NavBar } from '../components/NavBar';
import { BlogCard } from '../components/BlogCard';
import { useBlogs } from '../hooks/useBlogs';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface blogType {
  title: string;
  content: string;
  createdAt: string;
  author?: { username: string };
  id: string;
}

export const Blog_Page = () => {
  const { loading, blogs } = useBlogs();
  const deleteBlog = async ({ blogId }: { blogId: string }) => {
    try {
      const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      };

      const response = await axios.delete(`${BACKEND_URL}/blog`, {
        headers,
        data: { id: blogId },
      });

      console.log(response);
      return response;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar authorName="Aravinthan" />
      <div className="container mx-auto py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: blogType, index) => (
              <div key={index}>
                <BlogCard
                  title={blog.title}
                  content={blog.content}
                  publishedDate={blog.createdAt}
                  authorName={blog.author?.username || 'Anonymous'}
                  blogId={blog.id}
                />
                <button onClick={() => deleteBlog({ blogId: blog.id })}>
                  {' '}
                  Delete{' '}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
