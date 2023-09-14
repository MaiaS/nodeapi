import express, { Request, Response } from "express";

interface PutRecord {
  id: string;
  entry: string;
}

interface EntryRequest {
  entry: string;
}

type StorageData = {
  entries: Record<string, string>;
};

const port = 3000;

const app = express();

const currentData: StorageData = { entries: {} };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log("Listening on port", port);
});

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ message: "Health check. Server is up and running" });
});

app.get(
  "/read",
  (req: Request<any, any, any, { id?: string }>, res: Response): void => {
    const id = req.query?.id;
    if (id && id in currentData.entries) {
      res.status(200).json({
        message: "Data",
        data: [currentData.entries[id]],
      });
    }
    res.status(200).json({
      message: "Data",
      data: currentData,
    });
  }
);

app.post("/write", (req: Request, res: Response): void => {
  const data: EntryRequest = req.body;

  const { entry } = data;

  const randomlyGeneratedUUID = `${Object.keys(currentData.entries).length}`;

  currentData.entries[randomlyGeneratedUUID] = entry;

  res
    .status(200)
    .json({ message: "Success", data: { id: randomlyGeneratedUUID, entry } });
});

app.delete(
  "/delete",
  (req: Request<any, any, any, { id?: string }>, res: Response): void => {
    const id = req.query?.id;
    if (id) {
      delete currentData.entries[id];
      res.status(200).json({ message: "Success", id: id });
    }
    res.status(400).json({ message: "missing id in query params" });
  }
);

app.put("/update", (req: Request<PutRecord>, res: Response): void => {
  const { entry, id }: PutRecord = req.body;
  currentData.entries[id] = entry;

  res.status(200).json({ message: "Success", data: { id: id, entry: entry } });
});
