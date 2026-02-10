const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "nombre"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        field: 'email'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'activo'
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'USUARIOS',
    createdAt: 'fecha_creacion',
    updatedAt: false
});

module.exports = User;
