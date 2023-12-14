import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import commentsRoutes from "./routes/comment.routes.js";
import userRoutes from "./routes/user.routes.js";

import authRoutes from "./routes/auth.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import seriesRoutes from "./routes/series.routes.js";

import chatRoutes from "./routes/chat.routes.js";
import groupRoutes from "./routes/group.routes.js";
import messageRoutes from "./routes/message.routes.js";

import { createServer } from 'http';
import { Server } from 'socket.io';
import { MessageController } from "./controllers/message.controller.js";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});


app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", moviesRoutes);
app.use("/api", seriesRoutes);
app.use("/api", commentsRoutes);
app.use("/api", userRoutes);
app.use("/api", chatRoutes);
app.use("/api", messageRoutes);
app.use("/api", groupRoutes);


let roomPreview = "";

io.on('connection', (socket) => {

    socket.on("join_room", (data) => {
        if (!(roomPreview === "")) {
            socket.leave(roomPreview);
        }
        roomPreview = data;
        console.log("conectado" + data);
        socket.join(data);
    });

    socket.on("send_message", (data) => {

        MessageController.sendText(data);

        socket.emit("receive_message", data);
        socket.to(data.room).emit("receive_message", data);
    });



    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

});

export default httpServer;