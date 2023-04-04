const mongoose = require("mongoose");
const bcrytjs = require("bcryptjs");



//schema
const userSchema = mongoose.Schema({
    firstname: {
        required: [true, 'first name is required'],
        type: String,
    },
    lastname: {
        required: [true, 'Last name is required'],
        type: String,
    },
    username: {
        required: [true, 'username is required'],
        type: String,
    },
    password: {
        required: [true, 'password name is required'],
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
{
    timestamp: true,  
});

//Hashing password
userSchema.pre('save', async function(next){
    if (this.isModified(['password'])) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Compile schema into model
const User = mongoose.model("User", userSchema);
module.exports = User;