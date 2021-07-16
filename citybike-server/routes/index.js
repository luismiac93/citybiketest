const express = require("express");
const { getCityBikeDataApi } = require("../controller/citybike");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.get("/citybike", getCityBikeDataApi);

module.exports = router;
