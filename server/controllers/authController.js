import { login, register } from "../model/authModel.js";

export const loginController = async (req, res) => {
  try {
    const result = await login(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const result = await register(req, res);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
