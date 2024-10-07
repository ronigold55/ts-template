import { Server } from "http"
import { Server as SocketServer, Socket } from "socket.io"


export default function handleScketIO(httpServer: Server): void {

    const options = { cors: { origin: "*" } };

    const socketServer = new SocketServer(httpServer, options);

    socketServer.sockets.on("connection", (socket: Socket) => {

        console.log("New client connected!");

        const username = socket.handshake.query.username as string;

        socketServer.sockets.emit("server-msg", {msg: `${username} join the room!`, "username": "system"})

        socket.on("client-msg", (msg: string) => {
            console.log("new message: " + msg);

            socketServer.sockets.emit("server-msg", {username, msg})
        })

        socket.on("disconnect", () => {
            console.log("The client" + " " + username + " disconnected!");
            socketServer.sockets.emit("server-msg", {msg: `${username} left the room!`, "username": "system"})
        })
    })
}