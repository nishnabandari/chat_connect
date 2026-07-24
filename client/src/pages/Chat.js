import Navbar from "../components/Navbar";
import SearchUsers from "../components/SearchUsers";

function Chat() {

  return (

    <div>

      <Navbar />

      <div
        style={{
          display: "flex",
          padding: "20px",
        }}
      >

        <SearchUsers />

      </div>

    </div>

  );

}

export default Chat;