exports.quoteExit = async (req, res) => {
    try {
        const { plate } = req.body;
        const record = await Record.findOne({
            where: { plate, status: 'ACTIVE' },
            include: [{ model: VehicleType }]
        });

        if (!record) {
            return res.status(404).json({ message: 'Vehicle not found or not active' });
        }

        const exitTime = new Date();
        const tariff = await Tariff.findOne({
            where: {
                tipo_vehiculo_id: record.tipo_vehiculo_id,
                isActive: true
            }
        });

        if (!tariff) {
            return res.status(500).json({ message: 'No active tariff found' });
        }

        const { discountType, discountValue, isCourtesy } = req.body;
        const calculation = billingService.calculateCost(record.entryTime, exitTime, tariff, {
            discountType,
            discountValue,
            isCourtesy
        });

        res.json({ ...calculation, plate });

    } catch (error) {
        res.status(500).json({ message: 'Error calculating quote', error: error.message });
    }
};
