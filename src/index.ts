import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { client } from "./redis.config";
// import { routes } from "./routes/routes";
// import { initialize_firebase } from "./firebase.config";

require("dotenv").config();

const app = express();
const server = createServer(app);
client.connect().catch((err) => {
  console.log("Redis Client Connection Error", err);
});
client.on("error", (err) => console.log("Redis Client Error", err));

const io = new Server(server, { cors: { origin: "*" } });
const port = 4000;

app.use(cors({ origin: "*" }));

// initialize_firebase();
// app.use('/',routes)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // res.send('working server')
});

let onlineUsers: string[] = [];

io.on("connection", async (socket) => {
  onlineUsers.push(socket.id);
  console.log("a user connected");

  socket.on("room:join", async (roomId: string) => {
    socket.join(roomId);
    socket.to(roomId).emit("room:joined", roomId);
    console.log("joined" + " to " + roomId);
  });
  socket.on("room:leave", async (roomId: string) => {
    socket.leave(roomId);
    socket.to(roomId).emit("room:left", roomId);
    console.log("left" + " " + roomId);
  });

  socket.on("objects", async (roomId: string) => {
    const objects = await client.hGet(`room:${roomId}`, "objects");
    socket.emit("objects", JSON.parse(objects || "[]"));
    console.log("objects");
  });

  socket.on(
    "objects:modified",
    async ({ objects, roomId }: { objects: any; roomId: string }) => {
      socket.to(roomId).emit("objects:modified", objects);
      await client.hSet(`room:${roomId}`, {
        objects: JSON.stringify(objects),
      });
    }
  );

  socket.on(
    "mouse:move",
    async (data: { position: position; roomId: string }) => {
      const { position, roomId } = data;
      try {
        const presenseStr = await client.hGet(`room:${roomId}`, "presense");
        if (!presenseStr) {
          await client.hSet(`room:${roomId}`, {
            presense: JSON.stringify([
              { id: socket.id, mouse: data, expire: Date.now() },
            ]),
          });
        } else {
          let presense: { id: string; mouse: position; expire: number }[] =
            JSON.parse(presenseStr);
          presense = presense.filter((pre) => Date.now() - pre.expire < 10000);
          const index = presense.findIndex((ele) => ele.id === socket.id);
          if (index != -1) {
            presense[index] = {
              id: presense[index].id,
              mouse: position,
              expire: Date.now(),
            };
          } else {
            presense.push({
              id: socket.id,
              mouse: position,
              expire: Date.now(),
            });
          }
          await client.hSet(`room:${roomId}`, {
            presense: JSON.stringify(presense),
          });
          socket.to(roomId).emit("mouse:move", presense);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  );

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((ursId) => ursId != socket.id);
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log("listening on :" + `${port}`);
});

type position = { x: number; y: number };


module.exports = app