import React from 'react';
import axios from 'axios';

const Blogs = () => {
    const sendRequest = async () => {
        const res = axios.get("http://localhost:8000/api/blog")
    }
    useEffect(() => {

    }, [])


    return (
        <div></div>
    )
};

export default Blogs
