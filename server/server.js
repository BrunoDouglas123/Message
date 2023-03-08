const app = require("express")();
const http = require("http").createServer(app);
const PORT = 8080;
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const STATIC_CHANNELS = [
  {
    name: "Janela1",
    Online: 0,
    id: 1,
    sockets: [],
  },
  {
    name: "Janela2",
    Online: 0,
    id: 2,
    sockets: [],
  },
];

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on("connection", (socket) => {
  // socket object may be used to send specific messages to the new connected client
  console.log("new client connected");
  socket.emit("connection", null);
  socket.on("channel-join", (id) => {
    console.log("channel join", id);
    STATIC_CHANNELS.forEach((c) => {
      if (c.id === id) {
        if (c.sockets.indexOf(socket.id) == -1) {
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      } else {
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });

    return id;
  });
  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    STATIC_CHANNELS.forEach((c) => {
      const index = c.sockets.indexOf(socket.id);
      if (index != -1) {
        c.sockets.splice(index, 1);
        c.participants--;
        io.emit("channel", c);
      }
    });
  });
});

/**
 * @description This method retirves the static channels
 */
app.get("/getChannels", (req, res) => {
  res.json({
    channels: STATIC_CHANNELS,
  });
});
