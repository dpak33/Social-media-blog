import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Tab, Tabs } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { theme } from '../themes/theme';


const Header = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const [value, setValue] = useState();

    return (
        <AppBar
            position="sticky"
            sx={{ background: 'linear-gradient(90deg, rgba(226,236,238,1) 4%, rgba(2,0,36,1) 98%)' }}>
            <Toolbar>
                <Typography variant="h2" color="black" fontFamily={"Helvetica Neue"}>
                    Blog App
                </Typography>

                {isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
                    <Tabs value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={Link} to="/blogs" label="All blogs" />
                        <Tab LinkComponent={Link} to="/myBlogs" label="My blogs" />
                    </Tabs>
                </Box>}


                <Box marginLeft="auto">
                    <ThemeProvider theme={theme}>
                        {!isLoggedIn && <>
                            <Button LinkComponent={Link} to="/auth" color="neutral" variant="contained" sx={{ mr: 1 }}>
                                <Typography color="black">Login</Typography>
                            </Button>
                            <Button LinkComponent={Link} to="/auth" color="neutral" variant="contained" sx={{ mr: 1 }}>
                                <Typography color="black">Signup</Typography>
                            </Button> </>}

                        {isLoggedIn &&
                            <Button LinkComponent={Link} to="/auth" color="neutral" variant="contained">
                                <Typography color="black">Logout</Typography>
                            </Button>}

                    </ThemeProvider>
                </Box>
            </Toolbar>

        </AppBar>
    );
};

export default Header