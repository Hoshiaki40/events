import * as z from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be 1000 characters or less"),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "That's not a valid date!",
  }),
  location: z
    .string()
    .min(1, "Location is required")
    .max(200, "Location must be 200 characters or less"),
  capacity: z.number().int().positive("Capacity must be a positive number"),
  category: z.enum(
    ["CONFERENCE", "WORKSHOP", "NETWORKING", "CULTURAL", "SPORTS", "OTHER"],
    {
      required_error: "Category is required",
    }
  ),
  tags: z.array(z.string()).max(10, "You can add up to 10 tags"),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  status: z.enum(["DRAFT", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"], {
    required_error: "Status is required",
  }),
});

export type EventFormData = z.infer<typeof eventSchema>;
