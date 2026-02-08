const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ticket = sequelize.define('Ticket', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'codigo_unico'
    },
    totalTimeMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'minutos'
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'valor'
    },
    registro_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'fecha_emision'
    }
}, {
    tableName: 'TICKETS',
    timestamps: false
});

module.exports = Ticket;
