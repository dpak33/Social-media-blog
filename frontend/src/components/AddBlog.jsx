import React, { useState } from 'react';
import { Box, Button, InputLabel, Typography, TextField } from '@mui/material';
import { theme } from '../themes/theme';
import { ThemeProvider } from '@mui/material/styles';

const AddBlog = () => {
    const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' };
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
        console.log(inputs);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box border={3} borderColor="grey" boxShadow={"15px 15px 30px #e53e3e"} borderRadius={8} padding={3} margin={"auto"} marginTop={3} display="flex" flexDirection={'column'} width={"80%"}>
                    <Typography fontWeight='bold' padding={3} color="black" variant="h4" textAlign={'center'}>Post your blog!</Typography>
                    <InputLabel sx={labelStyles} >Title</InputLabel>
                    <TextField name="title" onChange={handleChange} value={inputs.title} margin='auto' variant="outlined" />
                    <InputLabel sx={labelStyles}>Description</InputLabel>
                    <TextField name="description" onChange={handleChange} value={inputs.description} margin='auto' variant="outlined" />
                    <InputLabel sx={labelStyles}>ImageURL</InputLabel>
                    <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin='auto' variant="outlined" />
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
