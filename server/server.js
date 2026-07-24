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

  // User Setup
  socket.on("setup", (userData) => {
    // Prevent server crash if userData is null
    if (!userData || !userData._id) {
      console.log("Invalid userData:", userData);
      return;
    }

    socket.join(userData._id);

    console.log("--------------------------------");
    console.log("User Setup Complete");
    console.log("User:", userData.name);
    console.log("Room:", userData._id);
    console.log("--------------------------------");

    socket.emit("connected");
  });

  // Join Chat Room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("Joined Chat:", room);
  });

  // Receive New Message
  socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;

    if (!chat || !chat.users) return;

    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return;

      socket.to(user._id).emit("message received", newMessage);
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});