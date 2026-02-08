const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VehicleType = sequelize.define('VehicleType', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'TIPOS_VEHICULO',
    timestamps: false
});

module.exports = VehicleType;
