import React, { useState, useEffect, useRef } from "react";
import {
    Helmet,
    HelmetProvider
} from "react-helmet-async";
import "./index.css"
import io from 'socket.io-client';
import axios from 'axios';

// For AWS
// const socket = io('http://35.91.65.162:3001');

// For Local
const socket = io('http://localhost:8080');

export const Home = () => {
    const [ messages, setMessages ] = useState([]);
    const [ newMessage, setNewMessage ] = useState('');
    const [ username, setUsername ] = useState('');

    const scrollBar = useRef();

    useEffect(() => {
        scrollBar.current.scrollTop = scrollBar.current.scrollHeight - scrollBar.current.clientHeight; 
            
        socket.on('set-username', (user) => {
            setUsername(user);
        });

        socket.on('server-message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        axios.get('http://localhost:8080/chat-history')
            .then((response) => {
                console.log('Chat-history:', response.data)
                setMessages(response.data);
                setUsername(response.data.username);
            })
            .catch((error) => {
                console.error('Error retrieving chat history:', error);
            });

        // scrollBar.scrollTop = scrollBar.scrollHeight;

        return () => {
            socket.disconnect();
        }
    }, []);

    const sendMessage = () => { 
        socket.emit('client-message', newMessage);
        setNewMessage('');
        scrollBar.current.scrollTop = scrollBar.current.scrollHeight - scrollBar.current.clientHeight; 

    };

    return(
        <HelmetProvider>
            <Helmet>
                <meta charset="utf-8" />
                <title>ChatRoom Prototype!</title>
            </Helmet>
            <h1>ChatRoom Prototype!</h1>
            <div className="chatroom">
                <div ref={scrollBar} className="chatbox layout">
                    {messages.map((msg, index) => (
                        <div key={index} className="messages">
                            <strong>{msg.username}</strong>: {msg.message}
                        </div>
                    ))}
                </div>
                <div className="user-input">
                    <input 
                        className="message-input-box" 
                        type="text" 
                        value={newMessage}
                        placeholder="Enter Message..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                sendMessage();
                            }
                        }}
                    />
                    <button className="send-button" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </HelmetProvider>
    );
}