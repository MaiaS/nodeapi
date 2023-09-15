import { Request, Response } from "express";
import { storageService } from "../services/accessStorage";

export const readDataController = (
  req: Request<any, any, any, { id?: string }>,
  res: Response
): void => {
  const id = req.query?.id;
  try {
    const result = storageService.read(id);

    res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error occured while reading entry." });
  }
};
