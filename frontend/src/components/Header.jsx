import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Tab, Tabs } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { theme } from '../themes/theme';
import { authActions } from '../store/index';


const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();

    return (
        <AppBar
            position="sticky"
            sx={{ background: 'linear-gradient(90deg, rgba(226,236,238,1) 4%, rgba(2,0,36,1) 98%)' }}>
            <Toolbar>
                <Typography variant="h2" color="black" fontFamily={"Helvetica Neue"} data-testid="app-title">
                    Blog App
                </Typography>

                {isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
                    <Tabs value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/blogs" label="All blogs" data-testid="all-blogs-tab" />
                        <Tab LinkComponent={Link} to="/myBlogs" label="My blogs" data-testid="my-blogs-tab" />
                        <Tab LinkComponent={Link} to="/blogs/add" label="Add blog" data-testid="add-blog-tab" />
                    </Tabs>
                </Box>}


                <Box marginLeft="auto">
                    <ThemeProvider theme={theme}>
                        {!isLoggedIn && <>
                            <Button LinkComponent={Link} to="/auth" color="neutral" variant="contained" sx={{ mr: 1 }} data-testid="login-button">
                                <Typography color="black">Login</Typography>
                            </Button>
                            <Button LinkComponent={Link} to="/auth" color="neutral" variant="contained" sx={{ mr: 1 }} data-testid="signup-button">
                                <Typography color="black">Signup</Typography>
                            </Button> </>}

                        {isLoggedIn &&
                            <Button onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to="/auth" color="neutral" variant="contained" data-testid="logout-button">
                                <Typography color="black">Logout</Typography>
                            </Button>}

                    </ThemeProvider>
                </Box>
            </Toolbar>

        </AppBar>
    );
};

export default Header