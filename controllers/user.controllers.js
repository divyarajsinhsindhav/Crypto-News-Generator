const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const auth = require('../services/auth.services');
const DataStore = require('../models/content.models');

exports.showLogin = (req, res) => {
    res.render('login', { errors: [], userId: req.userId  });
};

exports.showRegister = (req, res) => {
    res.render('register', {userId: req.userId});
};

exports.register = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email
        
        // Check if user with provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: 'User with this email already exists!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Create a new user
        const result = await User.create({
            username: body.username,
            email: body.email,
            password: hashedPassword
        });
        console.log("User created: ", result);
        return res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { errors: [{ msg: 'User not found' }] });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render('login', { errors: [{ msg: 'Invalid password' }] });
        }

        // Generate and store access token
        const token = auth.createAccessToken(user._id);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/genrator');
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.profile = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.render('profile', { userData: user, userId });
    } catch (error) {
        console.error('Profile error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.history = async (req, res) => {
        const userId = req.userId;
        console.log(userId)
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const data = await DataStore.find({ userId });
        return res.render('history',{ data, userId });
};

exports.logout = (req, res) => {
    try {
        res.clearCookie('token').redirect('/login');
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
