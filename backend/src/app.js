const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false
}));
app.use(morgan('dev'));

const authRoutes = require('./routes/authRoutes');
const tariffRoutes = require('./routes/tariffRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const userRoutes = require('./routes/userRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const roleRoutes = require('./routes/roleRoutes');
const vehicleTypeRoutes = require('./routes/vehicleTypeRoutes');
const statsRoutes = require('./routes/statsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tariffs', tariffRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/spaces', spaceRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/vehicle-types', vehicleTypeRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Parking Lot API' });
});

module.exports = app;
