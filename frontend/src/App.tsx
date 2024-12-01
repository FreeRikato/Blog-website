import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Signup_Page } from './pages/Signup.page';
import { Signin_Page } from './pages/Signin.page';
import { Blog_Page } from './pages/Blog.page';
import { DisplayBlog } from './pages/DisplayBlog.page';
import { PublishBlog } from './pages/PublishBlog.page';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Home Page</>} />
        <Route path="/signup" element={<Signup_Page />} />
        <Route path="/signin" element={<Signin_Page />} />
        <Route path="/blog" element={<Blog_Page />} />
        <Route path="/blog/:id" element={<DisplayBlog />} />
        <Route path="/blog/new" element={<PublishBlog />} />
      </Routes>
    </>
  );
}

export default App;
