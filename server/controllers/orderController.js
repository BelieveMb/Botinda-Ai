import { createOrder } from "../model/orderModel.js";

export const  createOrderController = async (req, res) => {
  try {
    const result = await createOrder(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
