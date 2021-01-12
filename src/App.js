import React, { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  // const [user, setuser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          {/* <h1>im header</h1> */}
          <Router>
            <Sidebar />
            <Switch>
              {/* show the chat wen roomid exists if not never show chat */}
              {/* :roomid is to retrieve rooms id to pull messages */}
              <Route path="/rooms/:roomId">
                <Chat messages={messages} />
              </Route>
              <Route path="/">
                {/* <h1>home screen</h1> */}
                <Chat messages={messages} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
