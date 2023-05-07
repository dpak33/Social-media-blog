import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
    const [blog, setBlog] = useState(null); // Add this line to initialize the state
    const { id } = useParams();
    console.log(id);

    const fetchDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/blog/${id}`);
            const data = res.data;
            setBlog(data.blog);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [id]);
    console.log(blog);

    return (
        <div>
            {blog ? (
                <div>
                    {/* Render blog details here */}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default BlogDetail;
