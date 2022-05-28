const User = require('./../Modals/userModal');

exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findByCredentials(email, password);
        const token = await user.genAuthToken();
        res.status(200).send({ user: user, token: token });
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
}

exports.signup = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.genAuthToken();
        res.status(200).send({ user: user, token: token })
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const user = await User.find({ userId: userId });
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.body.userId;
        await User.findOneAndUpdate({ userId: userId }, update);
        const user = await User.find({ userId: userId })
        res.status(200).json({
            data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        await User.findOneAndDelete({ userId: userId });
        res.status(200).json({
            status: 'success',
            message: 'User has been deleted'
        });
    } catch (error) {
        next(error)
    }
}
