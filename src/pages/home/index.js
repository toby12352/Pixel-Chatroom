import React, { useState, useEffect } from "react";
import {
    Helmet,
    HelmetProvider
} from "react-helmet-async";
import "./index.css"
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

export const Home = () => {
    const [ messages, setMessages ] = useState([]);
    const [ newMessage, setNewMessage ] = useState('');
    const [ username, setUsername ] = useState('');

    useEffect(() => {
        socket.on('set-username', (user) => {
            setUsername(user);
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    const sendMessage = () => {
        socket.emit('client-message', newMessage);
        setNewMessage('');
    };

    return(
        <HelmetProvider>
            <Helmet>
                <meta charset="utf-8" />
                <title>Home Page!</title>

            </Helmet>
            <h1>Home Page!</h1>
            <div className="chatroom d-inline">
                <div className="chatbox layout">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.username}</strong>: {msg.message}
                        </div>
                    ))}
                </div>
                <div className="user-input layout">
                    <input 
                        className="message-box" 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                        className="send-message"
                        onClick={sendMessage}    
                    >
                        Send
                    </button>
                </div>
            </div>
        </HelmetProvider>
    );
}