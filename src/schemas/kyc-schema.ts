// src/schemas/kyc-schema.ts
import * as z from "zod";

export const kycSchema = z.object({
  // Section 1: Personal Details
  applicationType: z.enum(["new", "update"]),
  kycNumber: z.string().optional().refine((val: string | undefined) => !val || /^[A-Z0-9]{14}$/.test(val), "Invalid KYC Number"), // Optional, mandatory for update
  accountType: z.enum(["normal", "minor", "aadhaar-otp-ekyc"]),
  prefix: z.string().optional(),
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  maidenName: z.string().optional(),
  fatherSpouseName: z.string().min(1, "Father/Spouse Name is required"),
  motherName: z.string().optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  gender: z.enum(["male", "female", "transgender"]),
  maritalStatus: z.enum(["married", "unmarried", "others"]),
  citizenship: z.enum(["indian", "others"]),
  citizenshipCountry: z.string().optional(), // If others
  citizenshipCountryCode: z.string().optional(), // ISO 3166
  residentialStatus: z.enum(["resident-individual", "nri", "foreign-national", "pio"]),
  pan: z.string().regex(/^[A-Z]{5}\d{4}[A-Z]{1}$/, "Invalid PAN format"),
  form60Furnished: z.boolean().optional(), // Checkbox
  photo: z.instanceof(File).optional(), // Image upload

  // Sections 2 & 3: Proof of Identity/Address & Current Address
  ovdType: z.enum(["passport", "voter-id", "driving-licence", "nrega", "npr", "aadhaar"]).optional(),
  passportNumber: z.string().optional(),
  passportExpiry: z.string().optional(),
  drivingLicenceExpiry: z.string().optional(),
  eKycAuthentication: z.boolean().optional(),
  offlineAadhaar: z.boolean().optional(),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  cityTownVillage: z.string().min(1, "City/Town/Village is required"),
  district: z.string().min(1, "District is required"),
  pinCode: z.string().regex(/^\d{6}$/, "Invalid Pin Code (6 digits)"),
  stateCode: z.string().min(1, "State/U.T Code is required"), // From list in PDF
  countryCode: z.string().min(2, "ISO 3166 Country Code is required"),
  currentAddressSameAsAbove: z.boolean(),
  currentAddressLine1: z.string().optional(), // Required if not same
  currentAddressLine2: z.string().optional(),
  currentAddressLine3: z.string().optional(),
  currentCityTownVillage: z.string().optional(),
  currentDistrict: z.string().optional(),
  currentPinCode: z.string().optional(),
  currentStateCode: z.string().optional(),
  currentCountryCode: z.string().optional(),
  deemedProofDocumentCode: z.string().optional(), // For current address

  // Sections 4-6: Contact, Remarks, Declaration
  telOffice: z.string().optional(),
  telResidence: z.string().optional(),
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be 10 digits"),
  email: z.string().email("Invalid email format"),
  remarks: z.string().optional(),
  declarationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  declarationPlace: z.string().min(1, "Place is required"),
  signature: z.instanceof(File).optional(), // Image upload
});

// Infer TypeScript type from schema
export type KycFormData = z.infer<typeof kycSchema>;



/*
Validation Notes:

Required fields (from PDF *) are enforced with .min(1) or similar.
Conditional logic (e.g., kycNumber mandatory for update): Use Zod's .refine() or handle in form logic.
Dates: Use YYYY-MM-DD for input, convert to DD-MM-YY for PDF if needed.
Files: For photo/signature uploads.
Error Handling: Zod provides messages; React Hook Form will display them under fields.
*/
