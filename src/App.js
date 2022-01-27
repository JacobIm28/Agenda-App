import "./styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Agenda from "./Agenda";
import io from "socket.io-client";

const socket = io();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login socket={socket} />} />
          <Route path="/agenda" element={<Agenda socket={socket} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
