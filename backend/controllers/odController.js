const ODRequest = require("../models/ODRequest");

const requestOD = async (req, res) => {
  try {
    const { studentId, reason } = req.body;
    const odRequest = new ODRequest({ studentId, reason });
    await odRequest.save();
    res.json({ message: "OD request submitted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getODRequests = async (req, res) => {
  try {
    const odRequests = await ODRequest.find();
    res.json(odRequests);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { requestOD, getODRequests };
