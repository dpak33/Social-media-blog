import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Tab, Tabs } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});


const Header = () => {
    const [value, setValue] = useState();

    return (
        <AppBar
            position="sticky"
            sx={{ background: 'linear-gradient(90deg, rgba(226,236,238,1) 4%, rgba(2,0,36,1) 98%)' }}>
            <Toolbar>
                <Typography variant="h2" color="black" fontFamily={"Helvetica Neue"}>
                    Blog App
                </Typography>
                <Box display="flex" marginLeft={'auto'} marginRight={'auto'}>
                    <Tabs value={value} onChange={(e, val) => setValue(val)}>
                        <Tab label="All blogs" />
                        <Tab label="My blogs" />
                    </Tabs>
                </Box>
                <Box marginLeft="auto">
                    <ThemeProvider theme={theme}>
                        <Button color="neutral" variant="contained" sx={{ mr: 1 }}>
                            <Typography color="black">Login</Typography>
                        </Button>
                        <Button color="neutral" variant="contained" sx={{ mr: 1 }}>
                            <Typography color="black">Signup</Typography>
                        </Button>
                        <Button color="neutral" variant="contained">
                            <Typography color="black">Logout</Typography>
                        </Button>
                    </ThemeProvider>
                </Box>
            </Toolbar>

        </AppBar>
    );
};

export default Header