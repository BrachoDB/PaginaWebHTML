const app = require('./app');
const sequelize = require('./config/db'); // db config
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
        // await sequelize.sync(); // Using migrations is better, but sync is okay for start
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();
