import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config';
import axios from 'axios';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = 'Bearer ' + localStorage.getItem('token') || '';
      const headers = {
        Authorization: token,
      };
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/bulk`, {
          headers,
        });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { blogs, loading };
};
