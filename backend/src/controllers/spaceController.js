const { Space, VehicleType, Record } = require('../models');

exports.getAllSpaces = async (req, res) => {
    try {
        const spaces = await Space.findAll({
            include: [
                { model: VehicleType },
                {
                    model: Record,
                    where: { status: 'ACTIVE' },
                    required: false // Left join to get space info even if empty
                }
            ],
            order: [['id', 'ASC']]
        });
        res.json(spaces);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching spaces', error: error.message });
    }
};
