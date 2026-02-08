const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'ROLES',
    timestamps: false
});

module.exports = Role;
