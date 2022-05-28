const jwt = require('jsonwebtoken');
const User = require('./../Modals/userModal');

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const data = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById({ _id: data._id })
        if (!user) {
            res.json({
                "message": "User not found"
            });
        }
        req.profile = user;
        next();
    } catch (error) {
        res.json({
            error: "Not Authorized"
        })
    }
}



module.exports = auth;