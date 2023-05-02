import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../themes/theme';


const Auth = () => {
    return (
        <div>
            <form>
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
                        <Typography padding={2} textAlign="center">Login</Typography>
                        <TextField margin="normal" />
                        <TextField margin="normal" />
                        <TextField margin="normal" />
                        <Button variant="contained" sx={{ borderRadius: 2, mb: 1 }} color="neutral">
                            <Typography color="primary">Submit</Typography>
                        </Button>
                        <Button variant="contained" sx={{ borderRadius: 2 }} color="neutral">
                            <Typography color="primary">Change to Signup</Typography>
                        </Button>
                    </ThemeProvider>
                </Box>
            </form>
        </div>
    )
};

export default Auth;
