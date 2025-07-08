const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const errorMiddleware = require('./middleware/error');
const setupSwagger = require('./swagger/swagger');

dotenv.config();
const app = express();

app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Student Management API! Visit /api-docs for API documentation.' });
});

setupSwagger(app);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
