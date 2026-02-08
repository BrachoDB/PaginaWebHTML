const { VehicleType } = require('../models');

exports.getVehicleTypes = async (req, res) => {
    try {
        const vehicleTypes = await VehicleType.findAll();
        res.json(vehicleTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle types', error: error.message });
    }
};
