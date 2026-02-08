const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password, roleId } = req.body;
        // Check if user exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ nombre: username, username, password: hashedPassword, rol_id: roleId });
        res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username }, include: Role });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        if (!user.isActive) return res.status(403).json({ message: 'User is inactive' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.Role.nombre },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, role: user.Role.nombre });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
