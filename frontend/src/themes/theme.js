import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#1a1a1a', // Updated to a dark, blackish color
            darker: '#000000',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});