import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export const initializeSocket = (projectId: string): Socket => {
    socketInstance = io(import.meta.env.VITE_BACKEND_URL, {
        cert: "7f7e694f79bf2f5df906d37008e92f5470cda76ae77a8923b8e6e5ea4c5ef21e",
        key: "f284d321aa1b4df1b2d01a519af20779731d4a9c9125d0bdbeea8b0316e876a3",
        auth: {token: localStorage.getItem('token'),},
        query: {projectId,},
        reconnection: true,
        transports: ['websocket','polling'],
        reconnectionAttempts: 5, 
    });

    socketInstance.on('connect_error', (err) => {
        console.error('Connection Error:', err);
    });

    socketInstance.on('connect_timeout', (timeout) => {
        console.error('Connection Timeout:', timeout);
    });

    socketInstance.on('connect', () => {
        console.log('Successfully connected to the server');
    });

    socketInstance.on('disconnect', (reason) => {
        console.log('Disconnected from server:', reason);
    });

    return socketInstance;
};

export const receiveMessage = (eventName: string, cb: (data: unknown) => void): void => {
    if (!socketInstance) {
        throw new Error('Socket is not initialized. Call initializeSocket first.');
    }
    socketInstance.on(eventName, cb);
};

export const sendMessage = (eventName: string, data: unknown): void => {
    if (!socketInstance) {
        throw new Error('Socket is not initialized. Call initializeSocket first.');
    }
    socketInstance.emit(eventName, data);
};
