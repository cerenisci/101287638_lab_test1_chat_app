const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ username, password: hashedPassword, firstname, lastname });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

module.exports = router;