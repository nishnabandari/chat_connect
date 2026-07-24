import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchUsers from "../components/SearchUsers";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import API from "../services/api";

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setChats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#f4f7fc",
    }}
  >
    <Navbar />

    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "25px",
        height: "calc(100vh - 90px)",
        boxSizing: "border-box",
      }}
    >
      {/* Search Users */}
      <div
        style={{
          width: "300px",
          background: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <SearchUsers
          setSelectedChat={setSelectedChat}
          fetchChats={fetchChats}
        />
      </div>

      {/* Chat Sidebar */}
      <div
        style={{
          width: "300px",
          background: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <ChatSidebar
          chats={chats}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />
      </div>

      {/* Chat Window */}
      <div
        style={{
          flex: 1,
          background: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </div>
  </div>
  );
}

export default Chat;