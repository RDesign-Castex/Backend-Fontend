const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
    res.json(user);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
};
