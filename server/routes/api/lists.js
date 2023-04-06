const express = require("express");
const router = express.Router();

const knexService = require("../util/knexService");
const knexList = new knexService("lists");

router.get("/", async (req, res) => {
  try {
    const data = await knexList.getData();

    if (!data) return res.status(404).json({ message: "Data not found" });

    res.status(200).json({ lists: data });
  } catch (err) {
    res.status(500).json({ message: "There is a bad request" });
    console.error(`Error at Get Request --> ${err}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await knexList.insertData(req.body);

    if (!data) return res.status(404).json({ message: "Data not posted" });

    res.status(201).json({ id: data[0], message: "Sucessfully Posted" });
  } catch (err) {
    res.status(500).json({ message: "There is a bad request" });
    console.error(`Error at Post Request: ${err}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await knexList.updateData(req.params.id, req.body);
    const isUpdated = knexList.parseBool(data);

    if (!isUpdated) {
      return res.status(404).json({
        id: req.params.id,
        isUpdated,
        message: "Data not found",
      });
    }

    res
      .status(200)
      .json({ id: req.params.id, isUpdated, message: "Successfully Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There is a bad request" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const data = await knexList.deleteData(req.params.id);
    const isDeleted = knexList.parseBool(data);
    if (!isDeleted) {
      return res.status(404).json({
        id: req.params.id,
        isDeleted,
        message: "Data not found",
      });
    }

    res.status(200).json({
      isDeleted: isDeleted === 1 ? true : false,
      message: "Sucessfully Deleted",
    });
  } catch (err) {
    res.status(500).json({ message: "There is a bad request" });
  }
});

module.exports = router;
