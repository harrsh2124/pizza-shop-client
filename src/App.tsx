import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { io } from 'socket.io-client';
import './App.css';

function App() {
    const socket = io('http://localhost:8000', {
        transports: ['websocket', 'polling', 'flashsocket'],
    });
    const [count, setCount] = useState(0);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`Socket ID ${socket.id} is connected...`);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected...');
        });

        socket.on('pong', (message) => {
            console.log(message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
