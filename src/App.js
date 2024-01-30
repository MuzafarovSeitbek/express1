import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/submit", { firstName, lastName });
      console.log("data success submit");
    } catch (error) {
      console.error("Data error submit", error.response.data.error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          placeholder="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="last-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
