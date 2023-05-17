import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../themes/theme';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/index';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
    const [signupInputs, setSignupInputs] = useState({ name: "", email: "", password: "" });

    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        if (isSignup) {
            setSignupInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        } else {
            setLoginInputs((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    };

    const sendRequest = async (type = "login") => {
        const inputs = type === "login" ? loginInputs : signupInputs;
        const res = await axios.post(`http://localhost:8000/api/user/${type}`, inputs).catch(err => console.log(err));

        const data = await res.data;
        console.log(data);
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isSignup ? signupInputs : loginInputs);
        if (isSignup) {
            sendRequest("signup")
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/blogs"));
        } else {
            sendRequest()
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/blogs"));
        }
    };

    const inputs = isSignup ? signupInputs : loginInputs;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{ background: 'linear-gradient(90deg, rgba(38,198,230,1) 71%, rgba(153,210,167,0.3463979341736695) 98%)' }}
                    maxWidth={400}
                    display="flex"
                    flexDirection={'column'}
                    alignItems="center"
                    justifyContent={'center'}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin="auto"
                    marginTop={5}
                    borderRadius={5}
                >
                    <ThemeProvider theme={theme}>
                        <Typography variant="h3" padding={2} textAlign="center">{isSignup ? "Signup" : "Login"}</Typography>
                        {isSignup && <TextField name="name" onChange={handleChange} value={inputs.name} placeholder="Name" margin="normal" />} {" "}
                        <TextField name="email" onChange={handleChange} value={inputs.email} type={'email'} placeholder="Email" margin="normal" />
                        <TextField name="password" onChange={handleChange} value={inputs.password} type={'password'} placeholder="Password" margin="normal" />
                        <Button type="submit" variant="contained" sx={{ borderRadius: 2, mb: 1 }} color="neutral">
                            <Typography color="primary">Submit</Typography>
                        </Button>
                        <Button onClick={() => setIsSignup(!isSignup)} variant="contained" sx={{ borderRadius: 2 }} color="neutral">
                            <Typography color="primary">Change to {isSignup ? "Login" : "Signup"}</Typography>
                        </Button>
                    </ThemeProvider>
                </Box>
            </form>
        </div>
    )
};

export default Auth;
