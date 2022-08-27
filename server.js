const http = require('http')
const express = require('express')
const socketio = require('socket.io')
var cors = require('cors');
const path = require('path');


const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000;


/*use methods*/
app.use(cors());
// using io.io with the routes
app.use((req, res, next) => {
    app.io = io;
    return next();
});
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

io.on("connection", (socket) => {
    console.log("entred!");

    socket.on("new-user", (s) => {
        console.log("hello");
        socket.broadcast.emit("new-user-connected");
    });

    socket.on("play", ({ time }) => {
        console.log("play", time);
        socket.broadcast.emit("played", { time: time });
    });

    socket.on("pause", () => {
        console.log("pause");
        socket.broadcast.emit("paused");
    });

});


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})