import { UseFormReturn } from "react-hook-form";
import { KycFormData } from "@/schemas/kyc-schema";

interface ContactAndDeclarationProps {
  form: UseFormReturn<KycFormData>;
}

export function ContactAndDeclaration({ form }: ContactAndDeclarationProps) {
  return (
    <div>
      {/* TODO: Implement contact and declaration form fields */}
      <h2>Contact & Declaration Section</h2>
    </div>
  );
}