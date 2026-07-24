const Chat = require("../models/Chat");
const User = require("../models/User");

// Create or Access One-to-One Chat
const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "UserId is required",
      });
    }

    let chat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    if (chat.length > 0) {
      return res.status(200).json(chat[0]);
    }

    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await Chat.create(chatData);

    const fullChat = await Chat.findById(createdChat._id).populate(
      "users",
      "-password"
    );

    res.status(201).json(fullChat);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Chats
const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  accessChat,
  fetchChats,
};