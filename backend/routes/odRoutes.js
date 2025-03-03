const express = require("express");
const { requestOD, getODRequests } = require("../controllers/odController");

const router = express.Router();

router.post("/request", requestOD);
router.get("/", getODRequests);

module.exports = router;
