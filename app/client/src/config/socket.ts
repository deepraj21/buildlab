import { io, Socket } from 'socket.io-client';

// Define the type for the socket instance
let socketInstance: Socket | null = null;

// Initialize the socket connection
export const initializeSocket = (projectId: string): Socket => {
    socketInstance = io(import.meta.env.VITE_API_URL as string, {
        auth: {
            token: localStorage.getItem('token'),
        },
        query: {
            projectId,
        },
    });

    return socketInstance;
};

// Listen for a message from the server
export const receiveMessage = (eventName: string, cb: (data: unknown) => void): void => {
    if (!socketInstance) {
        throw new Error('Socket is not initialized. Call initializeSocket first.');
    }
    socketInstance.on(eventName, cb);
};

// Send a message to the server
export const sendMessage = (eventName: string, data: unknown): void => {
    if (!socketInstance) {
        throw new Error('Socket is not initialized. Call initializeSocket first.');
    }
    socketInstance.emit(eventName, data);
};
