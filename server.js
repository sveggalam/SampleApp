const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // For parsing application/json
app.use('/api/users', userRoutes); // User routes

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Allow for graceful shutdown during tests or in case of any error
module.exports = { app, server };
