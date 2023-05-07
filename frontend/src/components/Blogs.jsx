import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './Blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState();
    const sendRequest = async () => {
        const res = await axios.get("http://localhost:8000/api/blog").catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    useEffect(() => {
        sendRequest().then(data => setBlogs(data.blogs));
    }, []);
    console.log(blogs);

    return (
        <div>
            {blogs && blogs.map((blog, index) => (
                <Blog
                    /*Below we check that the user Id in local storage matches the id associated with the blog. When we console.log it returns true
                            See how we are taking the Blog object and its five props and then setting their values for each blog through which we map
                            here. We set as permanently true in Userblogs for obvious reasons. */
                    id={blog._id}
                    isUser={localStorage.getItem("userId") === blog.user._id}
                    title={blog.title}
                    description={blog.description}
                    imageURL={blog.image}
                    userName={blog.user.name} />
            ))}
        </div>
    )
};

export default Blogs
