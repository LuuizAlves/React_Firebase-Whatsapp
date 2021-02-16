import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';

import { useStateValue } from './StateProvider';
import './App.css';

function App() {
    const [ { user }, dispatch ] = useStateValue();
    console.log(user);

    
    return (
        <div className="App">

        {!user ? (
            <Login />
        ):(
            <div className="app_body">
                <Router>
                    <Sidebar />
                    <Switch>
                        <Route path="/rooms/:roomId" component={Chat} />
                        <Route path="/" component={Chat} />
                    </Switch>
                </Router>
            </div>
        )}
        </div>
    );
}

//feat: show messages based on room ✨
//feat: Add Google Authentication ✨
export default App;