import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { ConnectToDB } from "./database/db.js";
import { router } from "./routes/Imageroutes.js";
dotenv.config();
const app = express();
app.use(express.json());
ConnectToDB();
app.use(cors());

app.use("/api/cloudinary", router);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
