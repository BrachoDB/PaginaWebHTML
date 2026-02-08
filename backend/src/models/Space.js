const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Space = sequelize.define('Space', {
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'codigo'
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'disponible'
    },
    tipo_vehiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'ESPACIOS',
    timestamps: false
});

module.exports = Space;
