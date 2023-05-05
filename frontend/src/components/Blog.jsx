import React, { useState, useEffect } from 'react';
import { Avatar, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';

const Blog = ({ title, description, imageURL, userName }) => {
    const [loadedImage, setLoadedImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch("http://localhost:8080/" + imageURL, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                console.log(response);
                const blob = await response.blob();
                console.log(blob);

                // Convert the blob to text and log it
                const text = await blob.text();
                console.log('Fetched content:', text);

                const objectURL = URL.createObjectURL(blob);
                setLoadedImage(objectURL);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchImage();
    }, [imageURL]);

    return (
        <div>
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
                {loadedImage && (
                    <img
                        style={{ height: '194px', width: '100%', objectFit: 'cover' }}
                        src={loadedImage}
                        alt="Paella dish"
                    />
                )}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Blog;