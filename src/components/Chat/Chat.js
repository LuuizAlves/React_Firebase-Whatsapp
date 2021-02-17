import React, {useState, useEffect} from 'react'
import {Avatar, IconButton} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFile from '@material-ui/icons/AttachFile';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import Mic from '@material-ui/icons/Mic';

import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../StateProvider';

import './Chat.css';

const Chat = () => {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState(""); 
    const [ roomName, setRoomName ] = useState("");
    const [ messages, setMessages ] = useState([]);

    const [ { user }, dispatch ] = useStateValue();
    const { roomId } = useParams();


    useEffect(() => {
        if(roomId){
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot( (snapshot) => {
                    setRoomName(snapshot.data().name);
                });

            db.collection("rooms")
                .doc(roomId)
                .collection("message")
                .orderBy("timestamp", "asc")
                .onSnapshot( snapshot => {
                    setMessages( snapshot.docs.map( doc => 
                        doc.data()
                    ))
                })
        }
    },[roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);

        db.collection("rooms")
            .doc(roomId)
            .collection("message")
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Visto por último {" "}
                        { new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
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
                {messages.map( message => (
                    <p class={`chat__message ${message.name === user.displayName  && "chat__reciever"}`}>
                        <span class="chat__name">
                            {message.name}
                        </span>
                            {message.message}
                        <span class="chat__timestamp">
                            { new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>   
                ))}
            </div>

            <div class="chat__footer">
                <InsertEmoticon />
                <form>
                    <input 
                        type="text"
                        placeholder="Escreva sua mensagem..."
                        value={input}
                        onChange={ e => setInput(e.target.value)}
                    />
                    <button onClick={sendMessage}>Enviar</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
