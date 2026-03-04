import { z } from "zod";

export const ClientStatusEnum = z.enum([
  "Pending",
  "Active",
  "Deactivated",
  "Deleted",
]);

export type ClientStatus = z.infer<typeof ClientStatusEnum>;

export const clientSchema = z.object({
  id: z.string().uuid(),
  companyName: z.string().min(1, "Company Name is required"),
  contactPerson: z.string().min(1, "Contact Person is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  status: ClientStatusEnum,
  agreementStartDate: z.string().min(1, "Start Date is required"),
  agreementEndDate: z.string().min(1, "End Date is required"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Client = z.infer<typeof clientSchema>;

export const createClientSchema = clientSchema.omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
