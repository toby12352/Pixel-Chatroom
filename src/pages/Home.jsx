import Button from "../components/Button";
import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';

// For AWS
const socket = io('http://52.34.201.95:8080');

// For Local
// const socket = io('http://localhost:8080');

const Home = () => {
    const [ messages, setMessages ] = useState([]);
    const [ newMessage, setNewMessage ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ activeUsersCount, setactiveUsersCount ] = useState(0);
    const [ activeUsers, setActiveUsers ] = useState([]);

    const scrollBar = useRef();

    useEffect(() => {
        socket.on('set-username', (user) => {
            setUsername(user);
        });

        socket.on('activeUser-list', (users) => {
            setActiveUsers(users);
        })

        socket.on('activeUser-count', (count) => {
            setactiveUsersCount(count);
        })

        socket.on('server-message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('set-username');
            socket.off('activeUser-count');
            socket.disconnect();
        }
    }, []);

    const sendMessage = () => {
        scrollBar.current.scrollTop = scrollBar.current.scrollHeight;
        socket.emit('client-message', newMessage);
        setNewMessage('');
    };

    return (
        <section className="w-full h-screen ring-1 bg-custom-image bg-cover">
    
            <h1 className="flex justify-center text-white text-4xl md:text-7xl font-bold p-3">Pixel Chat</h1>
    
            <div className="flex flex-col md:flex-row gap-3 h-auto md:h-[70rem] mt-5 p-2">
    
                <div className="w-full md:w-[20%] p-2 max-h-screen bg-pink-100/40 text-lg md:text-[1.5rem]">
                    <span className="font-semibold">Present Users:</span> {activeUsersCount}
                    <ul className="">
                        {activeUsers.map((user, index) => (
                            <li key={index}>{user}</li>
                        ))}
                    </ul>
                </div>
                
                <div className="w-full md:w-[80%] ring-slate-950">
    
                    <div 
                        ref={scrollBar} 
                        className="flex flex-col p-2 ring-1 bg-pink-100/40 text-base md:text-lg h-[60vh] md:h-[80vh] w-full overflow-y-auto gap-4 rounded-lg scrollbar-track scrollbar-thumb">
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className="ring-1 flex flex-col gap-2 bg-slate-200/80 rounded-md p-2 text-lg md:text-[1.5rem] border-b-gray-100 break-words">
                                <strong>{msg.username === 'System' ? '' : `${msg.username}: `}</strong>
                                <span className="whitespace-normal">{msg.message}</span>
                            </div>
                        ))}
                    </div>
    
                    <div className="flex flex-col md:flex-row gap-5 justify-center">
    
                        <input
                            className="font-pixel h-12 text-xl md:text-2xl bg-purple-300 rounded-2xl w-full mt-3 pl-3"
                            type="text"
                            value={newMessage}
                            placeholder="Enter Message..."
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if(e.key === 'Enter' && newMessage.trim()){
                                    sendMessage();
                                }
                            }}
                        />
    
                        <button 
                            className="bg-red-500 rounded-2xl w-full md:w-20 text-xl md:text-2xl h-12 mt-3" 
                            disabled={!newMessage.trim()}
                            onClick={sendMessage}>
                            Send
                        </button>
    
                    </div>
                </div>
            </div>
    
        </section>
    );
    
}

export default Home