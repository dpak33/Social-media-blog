import React, { useState } from 'react';
import { Box, Button, InputLabel, Typography, TextField } from '@mui/material';
import { theme } from '../themes/theme';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../helpers/sendRequest';

const AddBlog = () => {
    const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "", description: "", imageURL: ""
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest(inputs).then((data) => console.log(data)).then(() => navigate("/blogs")).catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box border={3} borderColor="grey" boxShadow={"15px 15px 30px #e53e3e"} borderRadius={8} padding={3} margin={"auto"} marginTop={3} display="flex" flexDirection={'column'} width={"80%"}>
                    <Typography fontWeight='bold' padding={3} color="black" variant="h4" textAlign={'center'}>Post your blog!</Typography>
                    <InputLabel sx={labelStyles} htmlFor="title">Title</InputLabel>
                    <TextField id="title" name="title" onChange={handleChange} value={inputs.title} margin='auto' variant="outlined" />
                    <InputLabel sx={labelStyles} htmlFor="description">Description</InputLabel>
                    <TextField id="description" name="description" onChange={handleChange} value={inputs.description} margin='auto' variant="outlined" />
                    <InputLabel sx={labelStyles} htmlFor="imageURL">ImageURL</InputLabel>
                    <TextField id="imageURL" name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='auto' variant="outlined" />
                    <ThemeProvider theme={theme}>
                        <Button type="submit" variant="contained" sx={{ borderRadius: 2, mb: 1, mt: 2 }} color="neutral">
                            <Typography color="primary">Submit</Typography>
                        </Button>
                    </ThemeProvider>
                </Box>
            </form>
        </div>
    )
};

export default AddBlog
