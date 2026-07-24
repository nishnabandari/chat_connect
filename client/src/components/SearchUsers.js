import { useState } from "react";
import API from "../services/api";

import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";

function SearchUsers({ setSelectedChat, fetchChats }) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    if (!search.trim()) return;

    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/users?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const createChat = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/chat",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedChat(res.data);

      await fetchChats();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#1E3A8A",
        }}
      >
        🔍 Search Users
      </h2>

      {/* Search Box */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "8px 12px",
          marginBottom: "15px",
          background: "#fafafa",
        }}
      >
        <SearchIcon style={{ color: "#666" }} />

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            flex: 1,
            marginLeft: "10px",
            background: "transparent",
            fontSize: "15px",
          }}
        />
      </div>

      {/* Search Button */}

      <button
        onClick={searchUsers}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "15px",
          transition: "0.3s",
        }}
      >
        Search
      </button>

      {/* Users */}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => createChat(user._id)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px",
              borderRadius: "12px",
              background: "#fff",
              border: "1px solid #E5E7EB",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#EFF6FF";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.transform = "translateY(0)";
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
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  background: "#2563EB",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PersonIcon />
              </div>

              <div>
                <div
                  style={{
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  {user.name}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#6B7280",
                  }}
                >
                  {user.email}
                </div>
              </div>
            </div>

            <ChatIcon
              style={{
                color: "#2563EB",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchUsers;