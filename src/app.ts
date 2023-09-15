import express, { Request, Response } from "express";
import { router } from "./routes";

const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Health check. Server is up and running" });
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
