const app = require('../src/app');
// Note: In a real serverless env, you might need to handle DB connection re-use explicitly or use a connection fool.
// For Vercel, this exports the Express app as a serverless function.
module.exports = app;
