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

//NOt on HEROKU
router.get("/search", async (request, response) => {
  try {
    // let notes = await Notes.find().populate("user");
    let result = await Notes.aggregate([
      {
        $search: {
          autocomplete: {
            query: `${request.body.query}`,
            path: "text",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      // { $match: { user: "5fec9284835ce80017ad05e9" } },
    ]);
    response.json(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

router.get("/get/:id", async (request, response) => {
  try {
    let result = await Notes.findOne({ _id: ObjectID(request.params.id) });
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

module.exports = router;
