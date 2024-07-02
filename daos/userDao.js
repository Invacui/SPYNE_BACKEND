const User = require('../models/User');

module.exports = {
  async createUser(userData) {
    try {
      const newUser = new User(userData);
      await newUser.save();
      return newUser; // Return the newly created user object
    } catch (err) {
      throw err; // Propagate the error to be caught in the service layer
    }
  }
  ,

  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  },

  async getUserById(userId) {
    const user = await User.findById(userId);
    return user;
  },

  async updateUser(userId, userData) {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  },

  async partialUpdateUser(userId, userData) {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
  },

  async deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  },

  async getAllUsers() {
    const users = await User.find();
    return users;
  },

  async findUsersByName(name) {
    const users = await User.find({ name: { $regex: name, $options: 'i' } });
    return users;
  },
};
