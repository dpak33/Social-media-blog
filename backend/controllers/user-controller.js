import User from "../model/User.js";

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: 'Users not found' });
    }
    return res.status(200).json({ users })
};