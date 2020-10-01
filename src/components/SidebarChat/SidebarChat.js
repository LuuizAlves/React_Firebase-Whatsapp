import React, {useState, useEffect} from 'react';
import {Avatar} from '@material-ui/core';

import './SidebarChat.css';

const SidebarChat = ({AddNewChat}) => {
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    const createChat = () => {
        const userName = prompt("Adicione o nome para o chat ...")

        if(userName){

        }
    };

    return !AddNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat_info">
                <h2>Name user</h2>
                <p>Last message...</p>
            </div>
        </div>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat;