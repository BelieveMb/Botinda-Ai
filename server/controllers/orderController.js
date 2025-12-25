import { createOrder, getMyOrders, getInfoOrder } from "../model/orderModel.js";

export const  createOrderController = async (req, res) => {
  try {
    const result = await createOrder(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyOrdersController = async (req, res) => {
  try {
    const result = await getMyOrders(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getInfoOrderController = async (req, res) => {
  try {
    const result = await getInfoOrder(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};