const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Obtener todos los pedidos
router.get('/', orderController.getOrders);

// Obtener un pedido por su ID
router.get('/:id', orderController.getOrderById);

// Crear un nuevo pedido
router.post('/', orderController.createOrder);

// Actualizar un pedido por su ID
router.put('/:id', orderController.updateOrder);

// Eliminar un pedido por su ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
