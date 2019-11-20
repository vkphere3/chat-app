const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);


const PORT = process.env.PORT || 9090
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/socket-client.html");
})


io.on("connection", client => {
    console.log("Client Connected");
    client.emit("acknowledge", { data: "connected now" })

    client.on('disconnect', () => {
        console.log("disconnected")
    })

    client.on('sendToServer', ({ chatterName, message }) => {
        console.log(message);
        client.emit('sendToCleint', { chatterName: 'Me', message })
        client.broadcast.emit('sendToCleint', { chatterName: chatterName, message })
    })
})

server.listen(PORT, () => {
    console.log("Server started at..." + PORT)
}) 