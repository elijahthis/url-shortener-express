const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
	try {
		mongoose.set("strictQuery", false);
		const conn = await mongoose.connect(process.env.MONGODB_URI, {});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (e) {
		console.error(e);
	}
};

module.exports = connectDB;
