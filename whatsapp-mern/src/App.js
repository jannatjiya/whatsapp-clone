import React, { useEffect,useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import Pusher from "pusher-js"
import axios  from "./axios";
function App() {
  const [messages,setMessages] = useState([]);
  //fetching the data
  useEffect(()=>{
    axios.get('/messages/sync').then(
      response => {
        setMessages(response.data)
        
      });
  },[]
  )
  useEffect(()=>{
    axios.get('/messages/sync').then(response => {
      console.log(response.data)
    })
  },[])


  //useEffect is used when an app is loaded
  useEffect(()=>{
    const pusher = new Pusher('b93a84f988f4cb8f1d83', {
      cluster: 'ap2'});

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessage)=> {
      alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage]);
    });  
    //
  },[messages])
  console.log(messages);
  return (
    <div className="app">
      <div className='app_body'>
       
        {/*Sidebar */}
        <Sidebar/>
        {/*Chat component */}
        <Chat/>
      </div>
    </div>
  );
}

export default App;
