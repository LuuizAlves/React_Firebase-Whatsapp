import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';

import './App.css';

function App() {
    return (
        <div className="App">
            <div className="app_body">
                <Router>
                    <Sidebar />
                    <Switch>
                        <Route path="/rooms/:roomId" component={Chat} />
                        <Route path="/" component={Chat} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

//show messages based on room ✨
export default App;