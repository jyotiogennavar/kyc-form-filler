import { UseFormReturn } from "react-hook-form";
import { KycFormData } from "@/schemas/kyc-schema";

interface AddressProps {
  form: UseFormReturn<KycFormData>;
}

export function Address({ form }: AddressProps) {
  return (
    <div>
      {/* TODO: Implement address form fields */}
      <h2>Address Section</h2>
    </div>
  );
}