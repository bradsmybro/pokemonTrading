const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");
const users = require("./users.js");
const User = users.model;

const multer = require("multer");
const upload = multer({
  dest: "../public/images/",
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  user: String,
  poke: String,
  cp: String,
  type: Array,
  caught: String,
  path: String
});

// Create a model for items in the museum.
const Item = mongoose.model("Item", itemSchema);
router.use(express.static("public"));

// Get a list of all of the items in the museum.
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.get("/:user", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let items = await Item.find({ user: req.params.user });
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
//Dont think that i need this since images are hosted on the cloud
// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
//Will use eventually for profile pictures
router.post(
  "/photos",
  auth.verifyToken,
  User.verify,
  upload.single("photo"),
  async (req, res) => {
    // Just a safety check
    if (!req.file) {
      return res.sendStatus(400);
    }
    res.send({
      path: "/images/" + req.file.filename
    });
  }
);

router.put("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    let item = await Item.findOne({ _id: req.params.id });
    (item.cp = req.body.cp), (item.caught = req.body.caught), await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a new item in the museum: takes a title and a path to an image.
router.post("/trade", auth.verifyToken, User.verify, async (req, res) => {
  const item = new Item({
    poke: req.body.poke,
    user: req.body.user,
    cp: req.body.cp,
    type: req.body.type,
    caught: req.body.caught,
    path: req.body.path
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Item,
  routes: router
};
