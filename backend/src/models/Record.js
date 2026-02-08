const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Record = sequelize.define('Record', {
    plate: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'placa'
    },
    entryTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'entrada'
    },
    exitTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'salida'
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'COMPLETED'),
        defaultValue: 'ACTIVE',
        field: 'estado'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tipo_vehiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    espacio_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'REGISTROS',
    timestamps: false
});

module.exports = Record;
