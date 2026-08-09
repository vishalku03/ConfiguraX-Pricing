import { z } from "zod";

export const componentSchema = z.object({

  name: z
    .string()
    .trim()
    .min(
      2,
      "Name must contain at least 2 characters"
    ),

  category: z
    .string()
    .min(
      1,
      "Category is required"
    ),

  price: z
    .coerce
    .number()
    .min(
      0,
      "Price cannot be negative"
    ),

  description: z
    .string()
    .max(
      500,
      "Description is too long"
    )
    .optional()

});