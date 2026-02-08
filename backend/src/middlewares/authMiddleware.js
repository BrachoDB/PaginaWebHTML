const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    const bearer = token.split(' ');
    const tokenValue = bearer[1];

    if (!tokenValue) return res.status(403).json({ message: 'Malformed token' });

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.userRole !== 'ADMIN') return res.status(403).json({ message: 'Require Admin Role' });
    next();
};

exports.isOperator = (req, res, next) => {
    if (req.userRole !== 'OPERATOR' && req.userRole !== 'ADMIN') return res.status(403).json({ message: 'Require Operator Role' });
    next();
};
