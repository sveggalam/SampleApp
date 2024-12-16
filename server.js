// Importing required modules
const express = require('express');
const app = express();

// Middleware to log each request
timeLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

app.use(timeLogger);

// Endpoint 1: Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Node.js Web App!</h1><p>Use the endpoints to interact with the app.</p>');
});

// Endpoint 2: Today's date
app.get('/date', (req, res) => {
    const today = new Date();
    res.json({
        message: "Today's Date",
        date: today.toDateString(),
        time: today.toTimeString()
    });
});

// Endpoint 3: Greeting with name (Query Parameter)
app.get('/greet', (req, res) => {
    const name = req.query.name || 'Guest';
    res.send(`<h1>Hello, ${name}!</h1>`);
});

// Endpoint 4: Calculate the sum of two numbers (Path Parameters)
app.get('/sum/:num1/:num2', (req, res) => {
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Both parameters must be numbers.' });
    }
    res.json({
        num1,
        num2,
        sum: num1 + num2
    });
});

// Endpoint 5: Random quote
const quotes = [
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs",
    "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt",
    "If you look at what you have in life, you’ll always have more. - Oprah Winfrey"
];

app.get('/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
