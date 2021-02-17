import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';

import { useStateValue } from './StateProvider';
import './App.css';

function App() {
    const [ { user }, dispatch ] = useStateValue();
    
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

//feat: Show and Send messages based on room from Firebase ✨
//feat: Add Google Authentication ✨
//feat: Show Sidebar and Header Room last message from database ✨
export default App;