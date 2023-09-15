import { Request, Response } from "express";
import { storageService } from "../services/accessStorage";

export const deleteDataController = (
  req: Request<any, any, any, { id: string }>,
  res: Response
): void => {
  const id = req.query.id;
  try {
    storageService.delete(id);

    res.status(200).json({
      message: "Success",
    });
  } catch (error: any) {
    if (error.message === "Could not find entry.")
      res.status(404).json({ message: error.message });
    res.status(500).json({ message: "Error occured while deleting entry." });
  }
};
