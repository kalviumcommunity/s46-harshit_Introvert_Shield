const express = require('express');
const router = express.Router();
const { Introvert, User } = require('./schema');

router.use(express.json());

// Read all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Read all Introverts
router.get('/introverts', async (req, res) => {
    try {
        const introverts = await Introvert.find();
        res.json(introverts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create a new Introvert
router.post('/introverts', async (req, res) => {
    const introvert = new Introvert({
        Place_Type: req.body.Place_Type,
        Crowd_Density: req.body.Crowd_Density,
        Seating_Comfort: req.body.Seating_Comfort,
        Wifi_Availability: req.body.Wifi_Availability,
        Image_Link: req.body.Image_Link
    });

    try {
        const newIntrovert = await introvert.save();
        res.status(201).json(newIntrovert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a user
router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a Introvert
router.patch('/introverts/:id', async (req, res) => {
    try {
        const introvert = await Introvert.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!introvert) {
            return res.status(404).json({ message: 'Introvert not found' });
        }
        res.json(introvert);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get Users by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get introvert by ID
router.get('/introverts/:id', async (req, res) => {
    try {
        const introvert = await Introvert.findById(req.params.id);
        if (!introvert) {
            return res.status(404).json({ message: 'Introvert not found' });
        }
        res.json(introvert);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a Introvert
router.delete('/introverts/:id', async (req, res) => {
    try {
        const deletedIntrovert = await Introvert.findByIdAndDelete(req.params.id);
        if (!deletedIntrovert) {
            return res.status(404).json({ message: 'Introvert not found' });
        }
        res.json({ message: 'Introvert deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
