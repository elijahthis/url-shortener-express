const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
	urlCode: { type: String, required: true },
	longURL: { type: String, required: true },
});

const URLModel = mongoose.model("URLModel", URLSchema);

module.exports = URLModel;
