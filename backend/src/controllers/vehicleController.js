const { Record, Space, VehicleType, Tariff, Ticket, sequelize } = require('../models');
const billingService = require('../services/billingService');
const { Op } = require('sequelize');

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

        const { amount, durationMinutes } = billingService.calculateCost(record.entryTime, exitTime, tariff);

        res.json({ amount, durationMinutes, plate });

    } catch (error) {
        res.status(500).json({ message: 'Error calculating quote', error: error.message });
    }
};

exports.findByPlate = async (req, res) => {
    try {
        const { plate } = req.params;
        const record = await Record.findOne({
            where: {
                plate: { [Op.like]: `%${plate}%` },
                status: 'ACTIVE'
            },
            include: [{ model: Space }, { model: VehicleType }]
        });

        if (!record) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.json(record);
    } catch (error) {
        res.status(500).json({ message: 'Error searching vehicle', error: error.message });
    }
};

exports.registerEntry = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { plate, vehicleTypeId, spaceId } = req.body;

        // 1. Check if vehicle type exists
        const vehicleType = await VehicleType.findByPk(vehicleTypeId);
        if (!vehicleType) {
            await t.rollback();
            return res.status(404).json({ message: 'Tipo de vehículo no encontrado' });
        }

        // 2. Check if already inside
        const activeRecord = await Record.findOne({ where: { plate, status: 'ACTIVE' } });
        if (activeRecord) {
            await t.rollback();
            return res.status(400).json({ message: 'El vehículo ya se encuentra en el parqueadero' });
        }

        // 3. Find/Validate space
        let space;
        if (spaceId) {
            space = await Space.findOne({
                where: { id: spaceId, isAvailable: true },
                lock: true,
                transaction: t
            });
        } else {
            // Fallback: find any available for this type
            space = await Space.findOne({
                where: { tipo_vehiculo_id: vehicleTypeId, isAvailable: true },
                lock: true,
                transaction: t
            });
        }

        if (!space) {
            await t.rollback();
            return res.status(400).json({ message: 'El espacio seleccionado no está disponible' });
        }

        // 4. Register entry
        const record = await Record.create({
            plate,
            tipo_vehiculo_id: vehicleTypeId,
            espacio_id: space.id,
            userId: req.userId,
            entryTime: new Date(),
            status: 'ACTIVE'
        }, { transaction: t });

        // 5. Update space status
        space.isAvailable = false;
        await space.save({ transaction: t });

        await t.commit();
        res.status(201).json({ message: 'Entry registered', record, spaceNumber: space.number });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error registering entry', error: error.message });
    }
};

exports.registerExit = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { plate } = req.body;

        // 1. Find active record
        const record = await Record.findOne({
            where: { plate, status: 'ACTIVE' },
            include: [{ model: VehicleType }],
            transaction: t
        });

        if (!record) {
            await t.rollback();
            return res.status(404).json({ message: 'Vehicle not found or not active' });
        }

        // Restriction: Only the user who registered entry (or an Admin) can mark exit
        if (req.userRole !== 'ADMIN' && record.userId !== req.userId) {
            await t.rollback();
            return res.status(403).json({ message: 'Solo el operador que registro la entrada puede marcar la salida' });
        }

        const exitTime = new Date();

        // 2. Find active tariff based on current date
        const today = new Date().toISOString().split('T')[0];
        const tariff = await Tariff.findOne({
            where: {
                tipo_vehiculo_id: record.tipo_vehiculo_id,
                isActive: true,
                startDate: { [Op.lte]: today },
                [Op.or]: [
                    { endDate: null },
                    { endDate: { [Op.gte]: today } }
                ]
            },
            transaction: t
        });

        if (!tariff) {
            await t.rollback();
            return res.status(500).json({ message: 'No active tariff found for this vehicle type' });
        }

        // 3. Calculate cost
        const { discountType, discountValue, isCourtesy } = req.body;
        const { total, durationMinutes } = billingService.calculateCost(record.entryTime, exitTime, tariff, {
            discountType,
            discountValue,
            isCourtesy
        });

        // 4. Create Ticket
        const ticketCode = `TICKET-${Date.now()}`;
        const ticket = await Ticket.create({
            registro_id: record.id,
            code: ticketCode,
            totalTimeMinutes: durationMinutes,
            amount: total
        }, { transaction: t });

        // 5. Update Record
        record.exitTime = exitTime;
        record.status = 'COMPLETED';
        await record.save({ transaction: t });

        // 6. Free up space
        await Space.update({ isAvailable: true }, { where: { id: record.espacio_id }, transaction: t });

        await t.commit();
        res.json({ message: 'Exit registered', ticket, record });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Error registering exit', error: error.message });
    }
};
