const { Space, Record, Ticket, VehicleType } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardStats = async (req, res) => {
    try {
        // Total de espacios
        const totalSpaces = await Space.count();

        // Espacios ocupados
        const occupiedSpaces = await Space.count({ where: { isAvailable: false } });

        // Espacios disponibles
        const availableSpaces = totalSpaces - occupiedSpaces;

        // Vehículos activos (registros sin salida)
        const activeVehicles = await Record.count({ where: { exitTime: null } });

        // Ingresos del día
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayTickets = await Ticket.findAll({
            where: {
                createdAt: {
                    [Op.gte]: today,
                    [Op.lt]: tomorrow
                }
            }
        });

        const todayRevenue = todayTickets.reduce((sum, ticket) => sum + parseFloat(ticket.amount), 0);

        // Actividad reciente (últimos 10 registros)
        const recentActivity = await Record.findAll({
            limit: 10,
            order: [['entryTime', 'DESC']],
            include: [
                { model: VehicleType },
                { model: Ticket }
            ]
        });

        res.json({
            totalSpaces,
            occupiedSpaces,
            availableSpaces,
            activeVehicles,
            todayRevenue: todayRevenue.toFixed(2),
            recentActivity
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const { startDate, endDate, tipo_vehiculo_id } = req.query;

        const whereClause = {};

        if (startDate && endDate) {
            whereClause.entryTime = {
                [Op.gte]: new Date(startDate),
                [Op.lte]: new Date(endDate)
            };
        }

        if (tipo_vehiculo_id) {
            whereClause.tipo_vehiculo_id = tipo_vehiculo_id;
        }

        const records = await Record.findAll({
            where: whereClause,
            include: [
                { model: VehicleType },
                { model: Ticket }
            ],
            order: [['entryTime', 'DESC']]
        });

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error: error.message });
    }
};
