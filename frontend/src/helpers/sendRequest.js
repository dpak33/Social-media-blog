import axios from 'axios';

export const sendRequest = async (inputs) => {
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    if (isValidUrl(inputs.imageURL)) {
        try {
            const res = await axios.post("http://localhost:8000/api/blog/add", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.imageURL,
                user: localStorage.getItem("userId"),
            });
            return res.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    } else {
        throw new Error("Invalid image URL");
    }
};