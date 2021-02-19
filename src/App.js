import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';

import { ThemeProvider } from 'styled-components';

import { lightTheme, darkTheme } from './Themes/themes';

import { useStateValue } from './StateProvider';
import './App.css';

function App() {
    const [ { user }, dispatch ] = useStateValue();

    const [ theme, setTheme ] = useState('light');
    const [ darkMode, setDarkMode ] = useState(false);

    const toggleTheme = () => {
        if(theme === "light"){
            setTheme("dark");
            setDarkMode(true);
        }else{
            setTheme("light");
            setDarkMode(false)
        }
    };
    
    return (
        <ThemeProvider theme={lightTheme}>
            <div className="App"  style={{backgroundColor: darkMode ? "#333" : "#dadbd3"}}>
                {!user ? (
                    <Login />
                ):(
                    <div className="app_body">
                        <Router>
                            <Sidebar toggleTheme={toggleTheme} darkMode={darkMode} />
                            <Switch>
                                <Route path="/rooms/:roomId" component={Chat} />
                                <Route path="/" component={Chat} />
                            </Switch>
                        </Router>
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
}

//feat: Show and Send messages based on room from Firebase ✨
//feat: Add Google Authentication ✨
//feat: Show Sidebar and Header Room last message from database ✨
export default App;