import React from "react";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div
      style={{
        backgroundColor: "#1976d2",
        color: "white",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>ChatConnect 💬</h2>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>

        <span>Hi, {user?.name}</span>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 15px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;