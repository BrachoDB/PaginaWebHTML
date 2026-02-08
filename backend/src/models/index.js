const sequelize = require('../config/db');
const Role = require('./Role');
const User = require('./User');
const VehicleType = require('./VehicleType');
const Space = require('./Space');
const Tariff = require('./Tariff');
const Record = require('./Record');
const Ticket = require('./Ticket');

// Associations
Role.hasMany(User, { foreignKey: 'rol_id' });
User.belongsTo(Role, { foreignKey: 'rol_id' });

User.hasMany(Record, { foreignKey: 'userId' }); // userId stays as userId in JS but maps to nothing specific in schema.sql (I added it).
Record.belongsTo(User, { foreignKey: 'userId' });

VehicleType.hasMany(Space, { foreignKey: 'tipo_vehiculo_id' });
Space.belongsTo(VehicleType, { foreignKey: 'tipo_vehiculo_id' });

VehicleType.hasMany(Tariff, { foreignKey: 'tipo_vehiculo_id' });
Tariff.belongsTo(VehicleType, { foreignKey: 'tipo_vehiculo_id' });

VehicleType.hasMany(Record, { foreignKey: 'tipo_vehiculo_id' });
Record.belongsTo(VehicleType, { foreignKey: 'tipo_vehiculo_id' });

Space.hasMany(Record, { foreignKey: 'espacio_id' });
Record.belongsTo(Space, { foreignKey: 'espacio_id' });

Record.hasOne(Ticket, { foreignKey: 'registro_id' });
Ticket.belongsTo(Record, { foreignKey: 'registro_id' });

module.exports = {
    sequelize,
    Role,
    User,
    VehicleType,
    Space,
    Tariff,
    Record,
    Ticket
};
