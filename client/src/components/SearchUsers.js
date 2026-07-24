import { useState } from "react";
import API from "../services/api";

function SearchUsers() {

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {

    if (!search.trim()) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        `/users?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", res.data);

      setUsers(res.data.users);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div
      style={{
        width: "300px",
        border: "1px solid lightgray",
        padding: "15px",
      }}
    >

      <h2>Search Users</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
        }}
      />

      <button
        onClick={searchUsers}
        style={{
          width: "100%",
          marginTop: "10px",
        }}
      >
        Search
      </button>

      <div
        style={{
          marginTop: "20px",
        }}
      >

        {users.map((user) => (

          <div
            key={user._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >

            <h4>{user.name}</h4>

            <p>{user.email}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SearchUsers;