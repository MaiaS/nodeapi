import { Request, Response } from "express";
import { storageService } from "../services/accessStorage";
import { EntryRequest } from "../utils/types";

export const writeDataController = (
  req: Request<any, any, EntryRequest>,
  res: Response
): void => {
  const data: EntryRequest = req.body;
  try {
    const result = storageService.write(data.entry);

    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error occured while creating entry." });
  }
};
