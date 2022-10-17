import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
//import { Date } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import "./Chat.css";
import MoreVert from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
function Chat(mess){
    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p> last seen at...</p>
                </div>
            
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                <p className="chat_message">
                <span className="chat_name">Victoria</span>                 
                    this is a message
                    <span className="chat_timestamp">
                        {new Date().toLocaleString ()}
                    </span>
                </p>
            </div>

            <div className="chat_body">
                <p className="chat_message chat_receiver">
                <span className="chat_name">Prince</span>                 
                    this is a message
                    <span className="chat_timestamp">
                        {new Date().toLocaleString ()}
                    </span>
                </p>
            </div>

            <div className="chat_body">
                <p className="chat_message">
                <span className="chat_name">Victoria</span>                 
                    this is a message
                    <span className="chat_timestamp">
                        {new Date().toLocaleString ()}
                    </span>
                </p>
            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input placeholder="Type a message" type="text"/>
                    <button type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>

            
        </div>
    );
}

export default Chat;