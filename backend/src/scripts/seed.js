const { sequelize, Role, User, VehicleType, Space, Tariff } = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        await sequelize.sync({ force: true }); // Reset DB
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
        // 20 Sedan (A-1 to A-20)
        for (let i = 1; i <= 20; i++) {
            spaces.push({ number: 'A-' + i, tipo_vehiculo_id: sedan.id });
        }
        // 10 Pickup (B-1 to B-10)
        for (let i = 21; i <= 30; i++) {
            spaces.push({ number: 'B-' + (i - 20), tipo_vehiculo_id: pickup.id });
        }
        // 15 Motorcycles (M-1 to M-15)
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

        console.log('Seed completed');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
