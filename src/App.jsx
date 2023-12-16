import { useEffect, useState } from 'react';
import {Home} from './pages/index'
import { PacmanLoader } from 'react-spinners';
import io from 'socket.io-client';


// For AWS
const socket = io('http://52.34.201.95:8080');

// For Local
// const socket = io('http://localhost:8080');

function App () {

  let [loading, setLoading] = useState(true);

  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ activeUsersCount, setactiveUsersCount ] = useState(0);
  const [ activeUsers, setActiveUsers ] = useState([]);
  
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
    }, 1000)


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
  }, [])

  const sendMessage = () => {
    socket.emit('client-message', newMessage);
    setNewMessage('');
  };


  return (
    <main className={`${loading ? ' bg-black flex justify-center items-center w-screen h-screen bg-custom-image bg-cover opacity-100' : ''}`}>
      {loading ? 
        <PacmanLoader
        className="flex justify-center items-center w-full h-full"
        color="#8B5CF6" 
        /> 
        : 
        <section>
          <Home
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            activeUsersCount={activeUsersCount}
            activeUsers={activeUsers}
            sendMessage={sendMessage}/>
        </section>
      }
    </main>
  )
}

export default App