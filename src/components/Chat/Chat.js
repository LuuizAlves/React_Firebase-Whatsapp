import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import Search from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import Mic from '@material-ui/icons/Mic';

import { useParams } from 'react-router-dom';
import db from '../../firebase';

import './Chat.css';

const Chat = () => {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
     
    const [ roomName, setRoomName ] = useState("");
    const { roomId } = useParams();

    useEffect(() => {
        if(roomId){
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot( (snapshot) => {
                    setRoomName(snapshot.data().name);
                });
        }
    },[roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <Search />
                    </IconButton>

                    <IconButton>
                        <AttachFile />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                <p class={`chat__message ${true && "chat__reciever"}`}>
                    <span class="chat__name">
                        User Name
                    </span>
                    Hey Guys...
                    <span class="chat__timestamp">
                        3:59pm
                    </span>
                    
                </p>
                <p class={`chat__message ${false && "chat__reciever"}`}>
                    <span class="chat__name">
                        User Name
                    </span>
                    Hey Guys...
                    <span class="chat__timestamp">
                        3:59pm
                    </span>
                    
                </p>
            </div>

            <div class="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                        type="text"
                        placeholder="Escreva sua mensagem..."
                        value={input}
                        onChange={ e => setInput(e.target.value)}
                        onClick={sendMessage}
                    />
                    <button>Enviar</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
