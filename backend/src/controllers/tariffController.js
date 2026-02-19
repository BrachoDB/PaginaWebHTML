const { Tariff, VehicleType } = require('../models');

exports.createTariff = async (req, res) => {
    try {
        const { tipo_vehiculo_id, billingType, cost } = req.body;
        // Forzamos que la nueva tarifa inicie hoy y esté activa
        const tariff = await Tariff.create({
            tipo_vehiculo_id,
            billingType,
            cost,
            startDate: new Date(),
            isActive: true,
            endDate: null
        });
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
        const { tipo_vehiculo_id, billingType, cost, isActive } = req.body;
        
        const tariff = await Tariff.findByPk(id);
        if (!tariff) {
            return res.status(404).json({ message: 'Tariff not found' });
        }

        tariff.tipo_vehiculo_id = tipo_vehiculo_id;
        tariff.billingType = billingType;
        tariff.cost = cost;
        
        // Si cambia el estado activo, ajustamos la fecha fin
        if (isActive !== undefined) tariff.isActive = isActive;
        if (!tariff.isActive && !tariff.endDate) tariff.endDate = new Date();
        if (tariff.isActive) tariff.endDate = null;

        await tariff.save();
        res.json(tariff);
    } catch (error) {
        res.status(500).json({ message: 'Error updating tariff', error: error.message });
    }
};

exports.deleteTariff = async (req, res) => {
    try {
        const { id } = req.params;
        const tariff = await Tariff.findByPk(id);

        if (!tariff) {
            return res.status(404).json({ message: 'Tariff not found' });
        }

        // Borrado lógico: Desactivar y poner fecha fin
        tariff.isActive = false;
        tariff.endDate = new Date();
        await tariff.save();

        // IMPORTANTE: Devolver JSON para evitar "failed on json response"
        res.json({ message: 'Tarifa eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tariff', error: error.message });
    }
};
