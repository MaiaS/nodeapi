import { Request, Response } from "express";
import { storageService } from "../services/accessStorage";
import { PutRecordRequest } from "../utils/types";

export const putDataController = (
  req: Request<any, any, PutRecordRequest>,
  res: Response
): void => {
  const data: PutRecordRequest = req.body;
  try {
    const result = storageService.write(data.entry, data.id);

    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "Could not find entry.")
      res.status(404).json({ message: "Could not find entry." });

    res.status(500).json({ message: "Error occured while updating entry." });
  }
};
