import { Avatar } from '@mui/material'
import React from 'react'
import "./SidebarChat.css"

function SidebarChat() {
  return (
    <div className='sidebarChat'>
        <Avatar/>
        <div className='sidebarChat_info'>
        <h2>Room name</h2>
        <span> <p>This is the last message</p></span>
        </div>
    </div>
  );
}


export default SidebarChat