const express = require("express");
const auth = require("../middleware/user_jwt");

const Notes = require("../models/Notes");

const router = express.Router();

router.post("/", auth, async (req, res, next) => {
  try {
    const notes = await Notes.create({
      path: req.body.path,
      text: req.body.text,
      user: req.user.id,
    });
    if (!notes) {
      return res.status(400).json({
        success: false,
        msg: "Something went wrong",
      });
    }
    res.status(200).json({
      success: true,
      notes: notes,
      msg: "Successfully created",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
