import { Router } from "express";
import { admin } from "../firebase.config";

const routes = Router();

routes.post("/signup",async (req, res) => {
//   admin.auth().createUser({
//     email: "user@example.com",
//     password: "password123",
//   })
//   .then((user) => {
//    res.json(user)
//   })
//   .catch((error) => {
//     console.error("Error creating new user:", error);
//     res.status(404).json(error)
//   });
  
});
routes.post("/login",async (req, res) => {
//   admin.auth().createUser({
//     email: "user@example.com",
//     password: "password123",
//   })
//   .then((user) => {
//    res.json(user)
//   })
//   .catch((error) => {
//     console.error("Error creating new user:", error);
//     res.status(404).json(error)
//   });
  
});





export { routes };
