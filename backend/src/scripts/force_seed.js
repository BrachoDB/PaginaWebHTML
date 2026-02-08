const { sequelize, Role, User, VehicleType, Space, Tariff } = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ force: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Database synced!');

        // Roles
        const adminRole = await Role.create({ nombre: 'ADMIN' });
        const operatorRole = await Role.create({ nombre: 'OPERATOR' });

        // Admin User
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            nombre: 'Administrador',
            username: 'admin',
            password: hashedPassword,
            rol_id: adminRole.id
        });
        console.log('Admin user created');

        // Vehicle Types
        const sedan = await VehicleType.create({ nombre: 'Sedan' });
        const pickup = await VehicleType.create({ nombre: 'Pickup' });
        const motorcycle = await VehicleType.create({ nombre: 'Motorcycle' });

        // Spaces
        const spaces = [];
        for (let i = 1; i <= 15; i++) {
            spaces.push({ number: 'A-' + i, tipo_vehiculo_id: sedan.id });
        }
        for (let i = 16; i <= 30; i++) {
            spaces.push({ number: 'B-' + (i - 15), tipo_vehiculo_id: pickup.id });
        }
        for (let i = 31; i <= 45; i++) {
            spaces.push({ number: 'M-' + (i - 30), tipo_vehiculo_id: motorcycle.id });
        }
        await Space.bulkCreate(spaces);
        console.log('Spaces created');

        // Default Tariffs
        await Tariff.create({
            tipo_vehiculo_id: sedan.id,
            billingType: 'PER_HOUR',
            cost: 10.00,
            startDate: new Date()
        });
        await Tariff.create({
            tipo_vehiculo_id: pickup.id,
            billingType: 'PER_HOUR',
            cost: 12.00,
            startDate: new Date()
        });
        await Tariff.create({
            tipo_vehiculo_id: motorcycle.id,
            billingType: 'PER_HOUR',
            cost: 5.00,
            startDate: new Date()
        });

        console.log('Seed completed successfully');
        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
}

seed();
