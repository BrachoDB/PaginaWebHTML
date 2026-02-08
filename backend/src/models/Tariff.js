const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tariff = sequelize.define('Tariff', {
    billingType: {
        type: DataTypes.ENUM('PER_MINUTE', 'PER_HOUR', 'PER_DAY', 'FRACTION'),
        allowNull: false,
        field: 'tipo_cobro'
    },
    cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'valor'
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'fecha_inicio'
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'fecha_fin'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'activo'
    },
    tipo_vehiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'TARIFAS',
    timestamps: false
});

module.exports = Tariff;
