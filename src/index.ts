import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { client } from "./redis";

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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/test", (req, res) => {
  res.json({ hello: "good" });
});

let onlineUsers: string[] = [];

io.on("connection", async (socket) => {
  onlineUsers.push(socket.id);
  console.log("a user connected");

  socket.on("objects",async()=>{
    const objects = await client.hGet("room:1", "objects");
    socket.emit("objects", JSON.parse(objects||"[]"));
  })


  socket.on("objects:modified", async (objects) => {
    onlineUsers.forEach((usrId) => {
      if (usrId != socket.id) {
        socket.to(usrId).emit("objects:modified", objects);
      }
    });
    await client.hSet("room:1", {
      objects: JSON.stringify(objects),
    });
  });

  socket.on("mouse:move", async (data: position) => {
    try {
      const presenseStr = await client.hGet("room:1", "presense");
      if (!presenseStr) {
        await client.hSet("room:1", {
          presense: JSON.stringify([{ id: socket.id, mouse: data }]),
        });
      } else {
        let presense: { id: string; mouse: position; expire: number }[] =
          JSON.parse(presenseStr);
        presense = presense.filter((pre) => Date.now() - pre.expire < 10000);
        const index = presense.findIndex((ele) => ele.id === socket.id);
        if (index != -1) {
          presense[index] = {
            id: presense[index].id,
            mouse: data,
            expire: Date.now(),
          };
        } else {
          presense.push({ id: socket.id, mouse: data, expire: Date.now() });
        }
        await client.hSet("room:1", { presense: JSON.stringify(presense) });
        onlineUsers.forEach((usrId) => {
          if (usrId != socket.id) {
            socket.to(usrId).emit(
              "mouse:move",
              presense.filter((pre) => pre.id !== usrId)
            );
          }
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((ursId) => ursId != socket.id);
    console.log("user disconnected");
  });
  socket.on("test", async (data) => {
    const res = await client.get(`${socket.id}`);
    socket.emit("objects:modified", res);
  });
});

server.listen(port, () => {
  console.log("listening on :" + `${port}`);
});

type position = { x: number; y: number };
