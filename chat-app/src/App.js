import io from 'socket.io-client';
import './App.css';
import {useState} from "react"
import Chat from './Chat';
const socket=io.connect('http://localhost:3001');

function App() {
  const [userName, setUserName]=useState("");
  const [room, setRoom] = useState("");

  const joinRoom=()=>{
    if(userName!==""&&room!==""){
        socket.emit("join_room", room);
    }
  }
  return (
    <div className="App">
     <h3>Join a chat</h3>
     <input type="text" placeHolder="Eileen" onChange={(e) =>{setUserName(e.target.value)}}/>
     <input type="text" placeHolder="Room Id" onChange={(e) =>{setRoom(e.target.value)}}/>
     <button onClick={joinRoom}>Join a room</button>
    
    <Chat socket={socket} userName={userName} room={room}/>
    </div>
  );
}

export default App;
