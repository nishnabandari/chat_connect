const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;