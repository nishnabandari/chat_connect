import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import socket from "../services/socket";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { IconButton } from "@mui/material";

function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const bottomRef = useRef(null);

  // Socket Setup
  useEffect(() => {
    socket.emit("setup", currentUser);

    socket.on("connected", () => {
      console.log("✅ Socket Connected");
    });

    return () => {
      socket.off("connected");
    };
  }, []);

  // Fetch Messages whenever chat changes
  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("message received", (message) => {
      if (selectedChat && message.chat._id === selectedChat._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [selectedChat]);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/message/${selectedChat._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(res.data.messages);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/message",
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [...prev, res.data.message]);
      socket.emit("new message", res.data.message);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const otherUser = selectedChat?.users?.find((u) => u._id !== currentUser._id);

  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8fafc",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
      }}
    >
      {!selectedChat ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#94a3b8",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Select a chat to start messaging
        </div>
      ) : (
        <>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              background: "#ffffff",
              borderBottom: "1px solid #f1f5f9",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {otherUser?.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#0f172a",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  {otherUser?.name}
                </h2>

                <p
                  style={{
                    margin: "2px 0 0",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                </p>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((message) => {
              const isMe = message.sender._id === currentUser._id;
              return (
                <div
                  key={message._id}
                  style={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      background: isMe ? "#2563eb" : "#ffffff",
                      color: isMe ? "#ffffff" : "#1e293b",
                      padding: "8px 14px",
                      borderRadius: isMe
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                      maxWidth: "65%",
                      fontSize: "14px",
                      lineHeight: "1.4",
                      wordBreak: "break-word",
                      boxShadow: isMe
                        ? "0 2px 4px rgba(37, 99, 235, 0.2)"
                        : "0 1px 2px rgba(0,0,0,0.05)",
                      border: isMe ? "none" : "1px solid #f1f5f9",
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}

            <div ref={bottomRef} />
          </div>

          {/* Message Input Container */}
          <div
            style={{
              padding: "12px 16px",
              background: "#ffffff",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#f8fafc",
                padding: "6px 12px",
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
              }}
            >
              <IconButton size="small">
                <EmojiEmotionsOutlinedIcon
                  sx={{
                    color: "#f59e0b",
                    fontSize: "20px",
                  }}
                />
              </IconButton>

              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  background: "transparent",
                  color: "#1e293b",
                }}
              />

              <IconButton
                onClick={sendMessage}
                sx={{
                  background: "#2563eb",
                  color: "white",
                  width: "36px",
                  height: "36px",
                  padding: "6px",
                  "&:hover": {
                    background: "#1d4ed8",
                  },
                }}
              >
                <SendRoundedIcon sx={{ fontSize: "18px" }} />
              </IconButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatWindow;