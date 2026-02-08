const { Role } = require('../models');

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching roles', error: error.message });
    }
};
