// Centralized enums and constants for KYC form options

export const STATE_CODES = [
  "AN","AP","AR","AS","BR","CH","CT","DD","DL","DN","GA","GJ","HP","HR","JH","JK","KA","KL","LA","LD","MH","ML","MN","MP","MZ","NL","OD","PB","PY","RJ","SK","TB","TN","TR","UP","UT","WB",
];

// Mapping of state/UT code to full name (as typically printed on forms)
export const STATE_CODE_TO_NAME: Record<string, string> = {
  AN: "Andaman and Nicobar Islands",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CH: "Chandigarh",
  CT: "Chhattisgarh",
  DD: "Daman and Diu",
  DL: "Delhi",
  DN: "Dadra and Nagar Haveli",
  GA: "Goa",
  GJ: "Gujarat",
  HP: "Himachal Pradesh",
  HR: "Haryana",
  JH: "Jharkhand",
  JK: "Jammu and Kashmir",
  KA: "Karnataka",
  KL: "Kerala",
  LA: "Ladakh",
  LD: "Lakshadweep",
  MH: "Maharashtra",
  ML: "Meghalaya",
  MN: "Manipur",
  MP: "Madhya Pradesh",
  MZ: "Mizoram",
  NL: "Nagaland",
  OD: "Odisha",
  PB: "Punjab",
  PY: "Puducherry",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TB: "Telangana",
  TN: "Tamil Nadu",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UT: "Uttarakhand",
  WB: "West Bengal",
};

// Reverse lookup map for convenience
export const STATE_NAME_TO_CODE: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_CODE_TO_NAME).map(([code, name]) => [name.toLowerCase(), code])
);

export const COUNTRY_CODES_ISO2 = [
  "IN","US","GB","AE","AU","CA","SG","DE","FR","JP","CN"
];

export type OVDType = "passport" | "voter-id" | "driving-licence" | "nrega" | "npr" | "aadhaar";

export const OVD_TYPES: { value: OVDType; label: string }[] = [
  { value: "passport", label: "Passport" },
  { value: "voter-id", label: "Voter ID" },
  { value: "driving-licence", label: "Driving Licence" },
  { value: "nrega", label: "NREGA Job Card" },
  { value: "npr", label: "NPR" },
  { value: "aadhaar", label: "Aadhaar" },
];

export const RESIDENTIAL_STATUSES = [
  { value: "resident-individual", label: "Resident Individual" },
  { value: "nri", label: "NRI" },
  { value: "foreign-national", label: "Foreign National" },
  { value: "pio", label: "PIO" },
];

export const APPLICATION_TYPES = [
  { value: "new", label: "New" },
  { value: "update", label: "Update" },
];

export const MARITAL_STATUSES = [
  { value: "married", label: "Married" },
  { value: "unmarried", label: "Unmarried" },
  { value: "others", label: "Others" },
];

export const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "transgender", label: "Transgender" },
];

export const PREFIXES = [
  { value: "mr", label: "Mr." },
  { value: "mrs", label: "Mrs." },
  { value: "ms", label: "Ms." },
];


