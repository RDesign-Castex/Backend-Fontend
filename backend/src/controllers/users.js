const User = require('../models/User.js');

// Verificar si ya existe un usuario con el mismo username antes de insertar
const checkDuplicateUsername = async (username) => {
  const existingUser = await User.findOne({ username });
  return !!existingUser;
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

// Obtener un usuario por su ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const isDuplicate = await checkDuplicateUsername(username);
    if (isDuplicate) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    const newUser = new User({ username, email });
    await newUser.save();

    return res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

// Actualizar un usuario por su ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};

// Eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json({ message: 'Usuario eliminado correctamente', user: deletedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
