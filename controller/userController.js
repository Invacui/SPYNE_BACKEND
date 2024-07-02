const UserService = require('../services/userServices');

module.exports = {
  async registerUser(req, res, next) {
    try {
      const newUser = await UserService.registerUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      if (err.message === "Email already exists") {
        res.status(400).json({ message: "Email already exists" });
      } else {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Failed to register user" });
      }
    }
  },
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await UserService.loginUser(email, password);
      res.status(201).json({ message: "Logged In Successfully", token });
    } catch (err) {
      console.error("Error logging in user:", err);
      res.status(500).json({ message: "Failed to login user" });
    }
  },

  async updateUser(req, res, next) {
    try {
      const updatedUser = await UserService.updateUser(req.params.userId, req.body);
      res.json(updatedUser);
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ message: "Failed to update user" });
    }
  },

  async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.userId);
      res.status(201).json({message:"Deleted User Successfully"});
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ message: "Failed to delete user" });
    }
  },

  async getUserList(req, res, next) {
    try {
      const userList = await UserService.getUserList();
      res.json(userList);
    } catch (err) {
      console.error("Error fetching user list:", err);
      res.status(500).json({ message: "Failed to fetch user list" });
    }
  },

  async searchUserByName(req, res, next) {
    try {
      const { name } = req.query;
      const userList = await UserService.searchUserByName(name);
      res.json(userList);
    } catch (err) {
      console.error("Error searching user by name:", err);
      res.status(500).json({ message: "Failed to search user by name" });
    }
  },
};
