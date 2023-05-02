import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h4">
                    Blog App
                </Typography>
            </Toolbar>

        </AppBar>
    );
};

export default Header