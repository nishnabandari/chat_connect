const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({
        success: false,
        message: "Content and Chat ID are required",
      });
    }

    let message = await Message.create({
      sender: req.user._id,
      content,
      chat: chatId,
    });

    message = await message.populate("sender", "name email profilePic");
    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "name email profilePic",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    res.status(201).json({
      success: true,
      message,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Messages of a Chat
const allMessages = async (req, res) => {
  try {

    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate("sender", "name email profilePic")
      .populate("chat");

    res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  allMessages,
};