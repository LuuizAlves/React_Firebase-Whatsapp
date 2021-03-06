import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from '../SidebarChat/SidebarChat';
import Switch from 'react-switch';
import db from '../../firebase';
import './Sidebar.css';

import { useStateValue } from '../../StateProvider';

function Sidebar({toggleTheme, darkMode}){
   const [ rooms, setRooms ] = useState([]);
   const [ { user }, dispatch ] = useStateValue();

   useEffect(() => {
      db.collection("rooms").onSnapshot( (snapshot) => {
         setRooms(
            snapshot.docs.map( doc => ({
               id: doc.id,
               data: doc.data()
            }))
         )
      })
   }, []);

   return(
      <div className="sidebar">
         <div className="sidebar_header">
            <Avatar src={user?.photoURL} />
      
            <div className="sidebar_headerRight">
               <IconButton>
                  <DonutLargeIcon />
               </IconButton>

               <IconButton>
                  <ChatIcon />
               </IconButton>

               <IconButton>
                  <MoreVertIcon />
               </IconButton>

               <Switch
                  onChange={toggleTheme}
                  checked={darkMode}
                  checkedIcon={false}
                  uncheckedIcon={false}
               />
            </div>
         </div>

         <div className="sidebar_search">
            <div className="sidebar_searchContainer">
               <SearchOutlined />
               <input type="text" placeholder="Procure aqui"/>
            </div>
         </div>

         <div className="sidebar_chats">
            <SidebarChat AddNewChat />
            {rooms.map( room => (
               <SidebarChat
                  key={room.id} 
                  id={room.id}
                  name={room.data.name}
               />
            ))}
         </div>
      </div>
   )
}

export default Sidebar;