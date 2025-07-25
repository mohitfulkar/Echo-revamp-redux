// socket/events.js

export default function registerSocketEvents(socket, io) {
  // Add custom events here (if needed)
  socket.on("joinPanelistRoom", (panelistId) => {
    socket.join(panelistId);
    console.log(`🔁 Socket ${socket.id} joined room ${panelistId}`);
  });

  // Example for handling a custom event if needed
  // socket.on("someEvent", (data) => { ... });
}
