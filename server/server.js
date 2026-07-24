const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

dotenv.config();

connectDB();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ChatConnect Backend 🚀");
});

// Create HTTP Server
const server = http.createServer(app);

// Create Socket.IO Server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Socket Connection
io.on("connection", (socket) => {

    console.log("New Socket Connected:", socket.id);

    // Setup Event
    socket.on("setup", (userData) => {

        socket.join(userData._id);

        console.log("--------------------------------");
        console.log("User Setup Complete");
        console.log("User:", userData.name);
        console.log("Room:", userData._id);
        console.log("--------------------------------");

        socket.emit("connected");

    });

    socket.on("disconnect", () => {

        console.log("Socket Disconnected:", socket.id);

    });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});