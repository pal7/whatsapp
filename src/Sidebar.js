import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SidebarChat from './SidebarChat';
import { SearchOutlined, AttachFile, MoreVert, Unsubscribe } from '@material-ui/icons';
import db from "./firebase";

 function Sidebar() {
   const [rooms, setRooms] = useState([]);
//on snapshot -> any new changes in db , new snapshot is taken
    useEffect(() => {
        const unsubs = db.collection('rooms').onSnapshot((snapshot) =>
            setRooms(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })))
        );

        return () => {
            Unsubscribe();
        }
    }, []);


    return (
        <div className='Sidebar'>
            <div className="sidebar__header">

                <Avatar src="https://avatars2.githubusercontent.com/u/31986844?s=400&u=8e62d5a7e7374a5bd3d16a3ed0d0dfbf28044501&v=4" />

                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" />
                </div>

            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {
                    rooms.map(room => (
                        <SidebarChat
                            key={room.id}
                            id={room.id}
                            name={room.data.name} />
                    ))
                }
{/*                 <SidebarChat />
                <SidebarChat />
                <SidebarChat /> */}
            </div>
        </div>
    );
}

export default Sidebar;
