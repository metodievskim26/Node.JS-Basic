import express from "express";
import path from "node:url";
import { fileURLToPath } from "node:url";
import { trainerRouter } from "./routes/trainers.routes.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
app.use(express.json());

app.use("/trainers", trainerRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is up at ${PORT}`);
});
