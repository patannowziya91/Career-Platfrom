const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.skills = req.body.skills || user.skills;
            user.experience = req.body.experience || user.experience;
            user.education = req.body.education || user.education;
            user.resume = req.body.resume || user.resume;
            user.company = req.body.company || user.company;
            user.about = req.body.about || user.about;
            user.professionalRole = req.body.professionalRole || user.professionalRole;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                skills: updatedUser.skills,
                experience: updatedUser.experience,
                education: updatedUser.education,
                resume: updatedUser.resume,
                company: updatedUser.company,
                about: updatedUser.about,
                professionalRole: updatedUser.professionalRole,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile by ID
// @route   GET /api/auth/profile/:id
// @access  Public
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
