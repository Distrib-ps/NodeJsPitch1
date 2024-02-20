import express from "express";
import { router as hotelsRouter } from "./routes/hotel.routes.js";
import { router as clientsRouter } from "./routes/clients.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/hotels", hotelsRouter);
app.use("/clients", clientsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});