import { z } from "zod";

// Zod schema for the requests
export const putRecordRequestSchema = z.object({
  id: z.string(),
  entry: z.string(),
});

export const entryRequestSchema = z.object({
  entry: z.string(),
});

export const optionalIdSchema = z.object({
  id: z.string().optional(),
});

export const deleteRequestSchema = z.object({
  id: z.string(),
});
