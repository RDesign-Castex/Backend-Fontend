require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users.js');
const usersController = require('./controllers/users.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB database connection established successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    // Manejo del error de conexión
  }
};

connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());

// definir rutas aquí
app.use('/users', usersRouter);
app.post('/users', usersController.createUser);
// Rutas de productos
app.use('/products', productRoutes);
// Rutas de pedidos
app.use('/orders', orderRoutes);

app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port: ${process.env.PORT || 5000}`));
