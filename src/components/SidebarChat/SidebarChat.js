import React, {useState, useEffect} from 'react';
import {Avatar} from '@material-ui/core';

import './SidebarChat.css';
import db from '../../firebase';
import { Link } from 'react-router-dom';
import { DnsTwoTone } from '@material-ui/icons';

const SidebarChat = ({AddNewChat, id, name}) => {
    const [seed, setSeed] = useState("");
    const [ message, setMessage ] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    useEffect(() => {
        if(id){
            db.collection("rooms")
                .doc(id)
                .collection("message")
                .orderBy("timestamp", "desc")
                .onSnapshot(onsnapchot => {
                    setMessage( onsnapchot.docs.map( doc => doc.data()))
                })
        }
    },[id])

    const createChat = () => {
        const roomName = prompt("Adicione o nome para o chat ...")

        if(roomName){
            db.collection("rooms").add({
                name: roomName
            });
        };
    };

    return !AddNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{message[0]?.message}</p>
                </div>
            </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2>Criar uma nova sala</h2>
        </div>
    )
}

export default SidebarChat;