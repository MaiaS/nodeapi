import express from "express";
import { validateRequest } from "zod-express-middleware";
import {
  entryRequestSchema,
  optionalIdSchema,
  putRecordRequestSchema,
} from "../utils/zodSchema";
import { readDataController } from "../controllers/readData";
import { writeDataController } from "../controllers/writeData";
import { putDataController } from "../controllers/putData";
import { deleteDataController } from "../controllers/deleteData";

const router = express.Router();

router.post(
  "/write",
  validateRequest({ body: entryRequestSchema }),
  writeDataController
);

router.get(
  "/read",
  validateRequest({ query: optionalIdSchema }),
  readDataController
);

router.put(
  "/update",
  validateRequest({ body: putRecordRequestSchema }),
  putDataController
);

router.delete(
  "/delete",
  validateRequest({ query: optionalIdSchema }),
  deleteDataController
);

export { router };
