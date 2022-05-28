const mongoose = require('mongoose');
mongoose.set('debug', true)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'client',
        enum: ['admin', 'client']
    }
})

userSchema.pre('save', async function (req, res, next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

userSchema.methods.genAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id, userId: user.userId, email: user.email }, process.env.JWT_TOKEN);
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error("Invalid Credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }
    else {
        return user;
    }
}
const User = mongoose.model("userSchema", userSchema);
module.exports = User;