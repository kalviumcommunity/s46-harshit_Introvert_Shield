const express = require("express");
const router = express.Router();

router.post("/places", (req, res) => {
  res.status(201).send("posted places");
});

router.get("/places", (req, res) => {
  res.status(200).send({ place: "nightclub" });
});

router.put("/places/:id", (req, res) => {
  res.status(201).send("Updated Places");
});

router.delete("/places/:id", (req, res) => {
  res.status(200).send("Deleted Places");
});

module.exports = router;