// socket.js
let io

function initSocket(server) {
  const { Server } = require("socket.io")
  io = new Server(server, {
    cors: { origin: "*" }
  })

  io.on("connection", (socket) => {
    console.log("New client connected " + socket.id)

    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })
  })
}

function notifyPaymentSuccess() {
  if (!io) return
  io.emit("payment_success")
}

module.exports = { initSocket, notifyPaymentSuccess }
