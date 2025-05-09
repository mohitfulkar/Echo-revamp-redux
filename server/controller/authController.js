// controllers/userController.js

import authService from "../services/authService.js";

// Register a new user
export const userRegister = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password }, "user");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const panelistlogin = async (req, res) => {
  try {
    const { fullName, secretKey } = req.body;
    const result = await authService.login({ fullName, secretKey }, "panelist");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
