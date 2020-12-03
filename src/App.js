import React, { useState } from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from './Chat';
import Pusher from "pusher-js";
import { useEffect } from 'react';
import axios from './axios';
import firebase from "./firebase"
import { BrowserRouter as Router, Link, Switch, Route, } from 'react-router-dom';
import Login from './login';
import { useStateValue } from "./StateProvider"


function App() {

  const [{ user }, dispatch] = useStateValue();
 /*  const [user, setUser] = useState(null); */
  const [messages, setMessages]  = useState([]);

  //used to fetch all initial information
  useEffect(() => {
    axios.get('/messages/sync').then(response => {
        setMessages(response.data);
      });
  }, []);


  useEffect(() => {
    const pusher = new Pusher('d8eebec5a6ff1078fce5', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
    //  alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    //clean up
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  console.log(messages);


  return (
    <div className="app">
      {!user ? (
       // <h1> LOGIN NOW</h1>
        <Login />
      ) : (
      <div className="app__body">
        <Router>
          <Switch>
           <Sidebar />
          
            
            {/* <Chat messages = {messages} /> */}  
            <Route path="/rooms/:roomId">
              <Chat messages = {messages}/>
            </Route>

            <Route path="/">
              <Chat /> 
            </Route>
          </Switch> 
        </Router>
      </div>
    )}
    </div>
  );
}

export default App;
