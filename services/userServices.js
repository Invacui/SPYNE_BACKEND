const userDao = require('../daos/userDao');
const userDto = require('../dtos/userDto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const env = require("dotenv");
env.config({path:"../../Private.env"})

module.exports = {
  async registerUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
      const existingUser = await userDao.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }
      const newUser = await userDao.createUser(userData);
      return new userDto(newUser); // Return the newly created user wrapped in a DTO
    } catch (err) {
      throw err; // Propagate the error to be caught in the controller
    }
  }
  ,

  async loginUser(email, password) {
    const user = await userDao.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, process.env.PRIVATE_TOKEN_KEY, { expiresIn: '1h' });
    return token;
  },

  async updateUser(userId, userData) {
    const updatedUser = await userDao.updateUser(userId, userData);
    return new userDto(updatedUser);
  },

  async deleteUser(userId) {
    await userDao.deleteUser(userId);
  },

  async getUserList() {
    const users = await userDao.getAllUsers();
    return users.map(user => new userDto(user));
  },

  async searchUserByName(name) {
    const users = await userDao.findUsersByName(name);
    return users.map(user => new userDto(user));
  },
};