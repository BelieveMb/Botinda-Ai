










import { getDailyReport } from "../model/reportsModel.js";

export const  getDailyReportController = async (req, res) => {
  try {
    const result = await getDailyReport(req, res);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
