import React from 'react';
import { Avatar, Card, CardContent, CardMedia, Typography, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';

const Blog = ({ title, description, imageURL, userName }) => {
    return (
        <div>
            {""}
            <Card sx={{
                width: "40%", margin: 'auto', mt: 2, padding: 2, boxShadow: "5px 5px 10px", ":hoover:":
                    { boxShadow: "10px 10px 20px" }
            }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {userName}
                        </Avatar>
                    }

                    title={title}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imageURL}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>

            </Card></div>
    )
};

export default Blog;