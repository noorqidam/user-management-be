import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/Routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Sync database and start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    response: "Express TypeScript",
  });
});

app.use("/api", router);
