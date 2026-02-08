const { Tariff, VehicleType } = require('../models');

exports.createTariff = async (req, res) => {
    try {
        const { tipo_vehiculo_id, billingType, cost, startDate, endDate } = req.body;
        const tariff = await Tariff.create({ tipo_vehiculo_id, billingType, cost, startDate, endDate });
        res.status(201).json(tariff);
    } catch (error) {
        res.status(500).json({ message: 'Error creating tariff', error: error.message });
    }
};

exports.getTariffs = async (req, res) => {
    try {
        const tariffs = await Tariff.findAll({ include: VehicleType });
        res.json(tariffs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tariffs', error: error.message });
    }
};

exports.updateTariff = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Tariff.update(req.body, { where: { id } });
        if (updated) {
            const updatedTariff = await Tariff.findByPk(id);
            res.json(updatedTariff);
        } else {
            res.status(404).json({ message: 'Tariff not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating tariff', error: error.message });
    }
};

exports.deleteTariff = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Tariff.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Tariff not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tariff', error: error.message });
    }
};
