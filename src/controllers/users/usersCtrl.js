const expressAsyncHandler = require("express-async-handler");

const User = require("../../model/User");


// Register
const registerUser = expressAsyncHandler(
    async (req, res) => {
        const {username, firstname, lastname, password } = req?.body;
        //check if user exists
        const userExists = await User.findOne({ username: req.body.username });
        if (userExists) { throw new Error('User already Exists'); }
        try {
            const user = await User.create({username, firstname, lastname, password});
            res.status(200).json(user);
        } catch (error) {
            res.json(error);
        }
    }
);

//fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});

module.exports = {registerUser, fetchUsersCtrl};