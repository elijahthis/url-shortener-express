require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const URLModel = require("./models/URLModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB()
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on port ${process.env.PORT}`);
		});
	})
	.catch((e) => {
		throw e;
	});

app.post("/generate", async (req, res) => {
	const urlCode = nanoid(6);
	let longURL;

	try {
		longURL = new URL(req.body.longURL).href;
	} catch (error) {
		res.status(401).json("Invalid URL");
	}

	const newURL = new URLModel({
		urlCode,
		longURL,
	});

	try {
		const insertedURL = await newURL.save();
		return res.status(200).json(insertedURL);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Error saving URL. Try Again.");
	}
});

app.get("/", async (req, res) => {
	try {
		const allURLS = await URLModel.find();
		return res.status(200).json(allURLS);
	} catch (error) {
		console.log(error);
		return res.status(500).json("Error fetching URLs. Try Again.");
	}
});

app.get("/fetch/:code", async (req, res) => {
	try {
		const urlCode = req.params.code;
		const selectedURL = await URLModel.find({ urlCode });
		console.log("selectedURL", selectedURL);
		if (selectedURL.length === 0) {
			return res.status(401).json("No URL found");
		} else {
			return res.status(200).json({ longURL: selectedURL[0].longURL });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json("Error fetching URL. Try Again.");
	}
});

app.delete("/delete", async (req, res) => {
	try {
		const urlCode = req.params.code;
		URLModel.collection.drop();
		return res.status(200).json({ success: true, message: "All URLs deleted" });
	} catch (error) {
		console.log(error);
		return res.status(500).json("Error deleting URL. Try Again.");
	}
});

app.delete("/delete/:code", async (req, res) => {
	try {
		const urlCode = req.params.code;
		const selectedURL = await URLModel.find({ urlCode });
		console.log("selectedURL", selectedURL);
		if (selectedURL.length === 0) {
			return res.status(401).json("No URL found");
		} else {
			const deleted = await URLModel.deleteMany({ urlCode });
			return res.status(200).json({ deleted, success: true, urlCode });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json("Error deleting URL. Try Again.");
	}
});
