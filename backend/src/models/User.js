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
        allowNull: false,
        references: {
            model: 'ROLES', // Nombre de la tabla de roles (coincide con Role.js)
            key: 'id'
        }

    
    }
}, {
    tableName: 'USUARIOS',
    createdAt: 'fecha_creacion',
    updatedAt: false
});

module.exports = User;
