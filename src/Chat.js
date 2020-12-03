import React, { useState, useEffect } from 'react'
import "./Chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
import { useParams } from "react-router-dom";
import db from './firebase';

function Chat({ messages }) {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
                    setRoomName(snapshot.data().name));
        }
    }, [roomId]);
    // any time you use a variable inside a useeffect() you need to include it as a dependency inside []


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        //prevents refresh and gets the message directly 
        //console.log('you typed >>', input);
    
        //await
            axios.post('/messages/new', {
            message : input,
            name : "DEMO",
            timestamp : "just now",
            received : false
        });

        setInput("");
        //this clears the input box after hitting enter key
    };

    return (
        <div className = "Chat">
            <div className = "chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}/>

                <div className = "chat__headerInfo">
                    <h3> {roomName} </h3>
                    <p>Last seen at...</p>
                </div>

                <div className = "chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>

                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            
            </div>
                        
            <div className="chat__body">
                {/* {props &&  */}
                {messages.map( (message) => (
                    <p className = {`chat__message ${message.received && "chat__receiver"}`}>
                        {/* add authentication  */}
                        <span className = "chat__name">
                            {message.name}
                        </span>
                       
                            {message.message}
                       
                        <span className = "chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

                    
                {/* <p className = "chat__message chat__receiver">
                    <span className = "chat__name">
                        Supriya
                    </span>
                        This is a message
                    <span className = "chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p>

                <p className = "chat__message">
                    <span className = "chat__name">
                        Ashwin
                    </span>
                        This is a message
                    <span className = "chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p> */}
            

            <div className = "chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder = "Type a message" 
                        type ="text" />

                    <button onClick = {sendMessage} type= "submit"> Send a message</button>

                </form>
                <MicIcon />
            </div>
        </div>
    );
}

export default Chat;
