import { z } from "zod";

export const configurationSchema = z.object({

  name: z
    .string()
    .trim()
    .min(
      2,
      "Configuration name is required"
    ),

  processor: z
    .string()
    .min(1, "Processor is required"),

  ram: z
    .string()
    .min(1, "RAM is required"),

  storage: z
    .string()
    .min(1, "Storage is required"),

  gpu: z
    .string()
    .min(1, "Graphics Card is required"),

  display: z
    .string()
    .min(1, "Display is required"),

  battery: z
    .string()
    .min(1, "Battery is required"),

  keyboard: z
    .string()
    .min(1, "Keyboard is required"),

  os: z
    .string()
    .min(1, "Operating System is required")

});