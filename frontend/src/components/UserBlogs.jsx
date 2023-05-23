import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blog from './Blog';

const UserBlogs = () => {
    const [user, setUser] = useState({});
    const id = localStorage.getItem("userId");

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/blog/user/${id}`);
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
            }
        }
        sendRequest();
    }, []);

    const sortedBlogs = user.blogs && user.blogs.length > 0 ? [...user.blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <div>
            {sortedBlogs && sortedBlogs.map((blog, index) => (
                <Blog
                    id={blog._id}
                    key={index}
                    isUser={true}
                    title={blog.title}
                    description={blog.description}
                    imageURL={blog.image}
                    userName={user.name} />
            ))}
        </div>
    )
};

export default UserBlogs;
