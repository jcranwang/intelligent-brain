const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "e76a8e930e804979ab2d0de0bbfb598a"
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data=>{
      res.json(data);
  }).catch(err => res.status(400).json("Cannot use API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json("Error updating entries"));
};

module.exports = {
  handleImage,
  handleApiCall
};
