const Order = require('../models/Order');

// Obtener todos los pedidos
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los pedidos', error: error.message });
  }
};

// Obtener un pedido por su ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el pedido', error: error.message });
  }
};

// Crear un nuevo pedido
const createOrder = async (req, res) => {
  const { customerName, products } = req.body;

  try {
    const newOrder = new Order({ customerName, products });
    await newOrder.save();
    return res.status(201).json({ message: 'Pedido creado correctamente', order: newOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el pedido', error: error.message });
  }
};

// Actualizar un pedido por su ID
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customerName, products } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { customerName, products },
      { new: true, runValidators: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    return res.status(200).json({ message: 'Pedido actualizado correctamente', order: updatedOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el pedido', error: error.message });
  }
};

// Eliminar un pedido por su ID
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    return res.status(200).json({ message: 'Pedido eliminado correctamente', order: deletedOrder });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el pedido', error: error.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
