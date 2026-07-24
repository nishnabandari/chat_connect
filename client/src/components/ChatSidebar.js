import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

function ChatSidebar({
  chats,
  selectedChat,
  setSelectedChat,
}) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#1E3A8A",
        }}
      >
        💬 My Chats
      </h2>

      {chats.map((chat) => {
        const otherUser = chat.users.find(
          (u) => u._id !== currentUser._id
        );

        if (!otherUser) return null;

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "14px",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              background:
                selectedChat?._id === chat._id
                  ? "#DBEAFE"
                  : "#ffffff",
              border:
                selectedChat?._id === chat._id
                  ? "2px solid #2563EB"
                  : "1px solid #E5E7EB",
            }}
            onMouseEnter={(e) => {
              if (selectedChat?._id !== chat._id) {
                e.currentTarget.style.background = "#F8FAFC";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedChat?._id !== chat._id) {
                e.currentTarget.style.background = "#ffffff";
              }
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                background: "#2563EB",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <PersonIcon />
            </div>

            {/* User Info */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#111827",
                  marginBottom: "5px",
                }}
              >
                {otherUser.name}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "13px",
                  color: "#6B7280",
                }}
              >
                <EmailIcon sx={{ fontSize: 16 }} />
                {otherUser.email}
              </div>

              {/* Placeholder until we add latest messages */}
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "13px",
                  color: "#9CA3AF",
                }}
              >
                Tap to start chatting...
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatSidebar;