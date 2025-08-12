"use client";

import { KycFormData, kycSchema } from "@/schemas/kyc-schema";
import { PersonalDetails } from "@/components/form-sections/PersonalDetails";
import { Address } from "@/components/form-sections/Address";
import { ContactAndDeclaration } from "@/components/form-sections/ContactAndDeclaration";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function FormWrapper() {
  const form = useForm<KycFormData>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      /* defaults */
    },
  });

  const onSubmit = (data: KycFormData) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className=" max-w-4xl mx-auto flex flex-col h-screen bg-gray-50 p-4 mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-4">
          <PersonalDetails form={form} />
          <Address form={form} />
          <ContactAndDeclaration form={form} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
