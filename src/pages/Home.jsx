import React, { useRef } from "react";

const Home = ({messages, newMessage, setNewMessage, activeUsersCount, activeUsers, sendMessage}) => {

    const scrollBar = useRef();
    
    return (
        
        <section className="w-full h-screen ring-1 max-sm:h-full bg-cover bg-custom-image">
    
            <h1 className="flex justify-center text-purple-600/95 text-5xl md:text-7xl font-bold p-3">Pixel Chat</h1>
    
            <div className="flex flex-col md:flex-row gap-3 h-auto md:h-[70rem] mt-5 p-2">
    
                <div className="w-full md:w-[20%] p-2 max-h-screen bg-pink-100/40 text-lg md:text-[1.5rem] rounded-md">
                    <span className="font-semibold">Present Users:</span> {activeUsersCount}
                    <ul className="overflow-y-auto max-sm:max-h-20 scrollbar-track scrollbar-thumb">
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
                                    scrollBar.current.scrollTop = scrollBar.current.scrollHeight;
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