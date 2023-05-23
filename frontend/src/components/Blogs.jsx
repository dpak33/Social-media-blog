import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './Blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/blog");
                setBlogs(res.data.blogs);
            } catch (err) {
                console.log(err);
            }
        }
        sendRequest();
    }, []);

    const sortedBlogs = blogs.length > 0 ? [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <div>
            {sortedBlogs.map((blog, index) => (
                <Blog
                    id={blog._id}
                    isUser={localStorage.getItem("userId") === blog.user._id}
                    title={blog.title}
                    description={blog.description}
                    imageURL={blog.image}
                    userName={blog.user.name}
                />
            ))}
        </div>
    )
};

export default Blogs;
