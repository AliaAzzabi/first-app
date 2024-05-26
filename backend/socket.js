// backend/socket.js
const socketIo = require('socket.io');

let io;

module.exports = {
  init: (server) => {
    io = socketIo(server, {
      cors: {
        origin: "http://localhost:4000/", // replace with your web app URL
        methods: ["GET", "POST"]
      }
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  }
};
