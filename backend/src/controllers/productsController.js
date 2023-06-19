const Product = require('../models/Product.js');

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

// Obtener un producto por su ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    return res.status(201).json({ message: 'Producto creado correctamente', product: newProduct });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// Actualizar un producto por su ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    return res.status(200).json({ message: 'Producto actualizado correctamente', product: updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// Eliminar un producto por su ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    return res.status(200).json({ message: 'Producto eliminado correctamente', product: deletedProduct });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
