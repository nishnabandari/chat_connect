import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

function Navbar() {
  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const userName = user?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        color: "#0f172a",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row", // Force horizontal row
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: { xs: 2, sm: 3 },
          minHeight: "64px",
        }}
      >
        {/* Left Section: Logo + Text side-by-side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
              flexShrink: 0,
            }}
          >
            <ForumRoundedIcon sx={{ fontSize: 20 }} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.15rem",
              letterSpacing: "-0.02em",
              color: "#0f172a",
              whiteSpace: "nowrap",
            }}
          >
            ChatConnect
          </Typography>
        </Box>

        {/* Right Section: Avatar + Name + Logout button side-by-side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "#eff6ff",
              color: "#2563eb",
              fontWeight: 600,
              fontSize: "0.875rem",
              border: "1px solid #bfdbfe",
            }}
          >
            {userInitial}
          </Avatar>

          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#334155",
              whiteSpace: "nowrap",
            }}
          >
            {userName}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon sx={{ fontSize: "16px !important" }} />}
            onClick={handleLogout}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.85rem",
              color: "#64748b",
              borderColor: "#e2e8f0",
              padding: "5px 12px",
              whiteSpace: "nowrap",
              "&:hover": {
                borderColor: "#ef4444",
                color: "#ef4444",
                backgroundColor: "#fef2f2",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;