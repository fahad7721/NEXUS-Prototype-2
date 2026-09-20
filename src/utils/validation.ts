import { z } from 'zod';

// Disallowed placeholder patterns & vulgar/fake phrases
const FORBIDDEN_PLACEHOLDER_REGEX = /\b(lora choos|lorem ipsum|placeholder|test|testing|asdf|qwerty|sample|fake|dummy|unknown|xxx)\b/i;

const isNotPlaceholder = (val: string) => {
  return !FORBIDDEN_PLACEHOLDER_REGEX.test(val);
};

// Strict Name Schema: alphabets, spaces, apostrophes, min 3 chars, max 60
export const legalNameSchema = z
  .string()
  .min(3, { message: "Full legal name must be at least 3 characters." })
  .max(60, { message: "Full legal name cannot exceed 60 characters." })
  .refine(isNotPlaceholder, { message: "Placeholder or invalid text is not permitted." })
  .refine((val) => /^[a-zA-Z\s'.]+$/.test(val), {
    message: "Name can only contain alphabetic letters and spaces.",
  });

// Strict Phone Schema: Pakistani or international format (+92... or 03...)
export const phoneSchema = z
  .string()
  .min(10, { message: "Phone number must be at least 10 digits." })
  .max(16, { message: "Phone number cannot exceed 16 characters." })
  .refine(isNotPlaceholder, { message: "Placeholder phone numbers are forbidden." })
  .refine((val) => /^(\+?[0-9\s\-()]{10,16})$/.test(val.replace(/\s+/g, '')), {
    message: "Enter a valid phone number (e.g., +92 300 1234567).",
  });

// Strict Email Schema
export const emailSchema = z
  .string()
  .email({ message: "Please provide a valid, deliverable email address." })
  .refine(isNotPlaceholder, { message: "Placeholder email addresses are forbidden." })
  .refine(
    (val) => !val.endsWith('@test.com') && !val.endsWith('@example.com'),
    { message: "Please enter your real institutional or personal email address." }
  );

// Pakistani CNIC / B-Form Schema: 13 digits (XXXXX-XXXXXXX-X or continuous)
export const cnicBFormSchema = z
  .string()
  .min(13, { message: "CNIC/B-Form must contain 13 digits." })
  .max(15, { message: "CNIC/B-Form cannot exceed 15 characters." })
  .refine(isNotPlaceholder, { message: "Placeholder CNIC is forbidden." })
  .refine(
    (val) => {
      const clean = val.replace(/[^0-9]/g, '');
      return clean.length === 13;
    },
    { message: "CNIC or B-Form must be 13 digits (format: 31202-XXXXXXX-X or 13 numbers)." }
  );

// Institution Name Schema
export const institutionSchema = z
  .string()
  .min(3, { message: "Institution name must be at least 3 characters." })
  .max(100, { message: "Institution name cannot exceed 100 characters." })
  .refine(isNotPlaceholder, { message: "Placeholder institution name is not permitted." });

// City Schema
export const citySchema = z
  .string()
  .min(2, { message: "City name must be at least 2 characters." })
  .max(50, { message: "City name cannot exceed 50 characters." })
  .refine(isNotPlaceholder, { message: "Invalid city name." });

// Delegation Roster Member Schema
export const delegationMemberSchema = z.object({
  fullName: legalNameSchema,
  phone: phoneSchema,
  cnicBForm: cnicBFormSchema,
  fileUploaded: z.boolean().refine((v) => v === true, {
    message: "CNIC / B-Form document scan must be uploaded and verified.",
  }),
  storageKey: z.string().optional(),
});

// Complete School Delegation Form Schema
export const schoolDelegationSchema = z.object({
  institutionName: institutionSchema,
  city: citySchema,
  schoolAddress: z.string().min(5, { message: "School address is required." }),
  teamName: z.string().min(2, { message: "Team identifier is required." }),
  headName: legalNameSchema,
  headPhone: phoneSchema,
  headEmail: emailSchema,
  headCnic: cnicBFormSchema,
  headFileUploaded: z.boolean().refine((v) => v === true, {
    message: "Head Delegate CNIC scan must be uploaded.",
  }),
  advisorName: legalNameSchema,
  advisorEmail: emailSchema,
  advisorPhone: phoneSchema,
  hasChaperone: z.boolean(),
  chaperoneName: z.string().optional(),
  chaperonePhone: z.string().optional(),
}).refine(
  (data) => {
    if (data.hasChaperone && (!data.chaperoneName || data.chaperoneName.trim().length < 3)) {
      return false;
    }
    return true;
  },
  {
    message: "Please enter the accompanying chaperone's full name.",
    path: ["chaperoneName"],
  }
);

// Individual Delegate Schema
export const individualDelegateSchema = z.object({
  fullName: legalNameSchema,
  phone: phoneSchema,
  email: emailSchema,
  cnic: cnicBFormSchema,
  city: citySchema,
  institution: z.string().optional(),
  fileUploaded: z.boolean().refine((v) => v === true, {
    message: "CNIC / B-Form document scan must be attached and verified.",
  }),
});

// File validation helper (Max 5MB, specific MIME types)
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
];

export function validateDocumentFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file format (${file.type || 'unknown'}). Only PDF, JPEG, and PNG files are accepted.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeInMb} MB) exceeds maximum permitted cap of 5MB.`,
    };
  }

  return { valid: true };
}
