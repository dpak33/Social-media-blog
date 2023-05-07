import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, InputLabel, Typography, TextField } from '@mui/material';
import { theme } from '../themes/theme';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };

const BlogDetail = () => {

    const [blog, setBlog] = useState(null); // Add this line to initialize the state
    const { id } = useParams();
    console.log(id);

    const [inputs, setInputs] = useState({

    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const fetchDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/blog/${id}`);
            const data = res.data;
            setBlog(data.blog);
            setInputs({ title: data.blog.title, description: data.blog.description })
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);
    console.log(blog);
    const sendRequest = async () => {
        const res = await axios.put(`http://localhost:8000/api/blog/update/${id}`, {
            title: inputs.title,
            description: inputs.description
        }).catch(err => console.log(err));

        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(data => console.log(data));
    };

    return (
        <div>
            {inputs &&
                <form onSubmit={handleSubmit}>
                    <Box border={3} borderColor="grey" boxShadow={"15px 15px 30px #e53e3e"} borderRadius={8} padding={3} margin={"auto"} marginTop={3} display="flex" flexDirection={'column'} width={"80%"}>
                        <Typography fontWeight='bold' padding={3} color="black" variant="h4" textAlign={'center'}>Post your blog!</Typography>
                        <InputLabel sx={labelStyles} >Title</InputLabel>
                        <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant="outlined" />
                        <InputLabel sx={labelStyles}>Description</InputLabel>
                        <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant="outlined" />
                        <ThemeProvider theme={theme}>
                            <Button type="submit" variant="contained" sx={{ borderRadius: 2, mb: 1, mt: 2 }} color="neutral">
                                <Typography color="primary">Submit</Typography>
                            </Button>
                        </ThemeProvider>
                    </Box>
                </form>
            }</div>
    );
};

export default BlogDetail;
