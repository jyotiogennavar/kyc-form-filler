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
      applicationType: "new",
      accountType: "normal",
      prefix: undefined,
      firstName: "",
      middleName: "",
      lastName: "",
      maidenPrefix: undefined,
      maidenFirstName: "",
      maidenMiddleName: "",
      maidenName: "",
      fatherSpousePrefix: undefined,
      fatherSpouseFirstName: "",
      fatherSpouseMiddleName: "",
      fatherSpouseName: "",
      motherPrefix: undefined,
      motherFirstName: "",
      motherMiddleName: "",
      motherName: "",
      dateOfBirth: "",
      gender: "male",
      maritalStatus: "unmarried",
      citizenship: "indian",
      citizenshipCountry: "",
      citizenshipCountryCode: "",
      residentialStatus: "resident-individual",
      pan: "",
      form60Furnished: false,
      photo: undefined,
      ovdType: undefined,
      passportNumber: "",
      passportExpiry: "",
      drivingLicenceExpiry: "",
      eKycAuthentication: false,
      offlineAadhaar: false,
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      cityTownVillage: "",
      district: "",
      pinCode: "",
      stateCode: "",
      countryCode: "IN",
      currentAddressSameAsAbove: true,
      currentAddressLine1: "",
      currentAddressLine2: "",
      currentAddressLine3: "",
      currentCityTownVillage: "",
      currentDistrict: "",
      currentPinCode: "",
      currentStateCode: "",
      currentCountryCode: "",
      deemedProofDocumentCode: "",
      telOffice: "",
      telResidence: "",
      mobile: "",
      email: "",
      remarks: "",
      declarationDate: "",
      declarationPlace: "",
      signature: undefined,
    },
  });

  const onSubmit = (data: KycFormData) => {
  
    // Handle form submission here
  };

  return (
    <div className=" max-w-5xl mx-auto flex flex-col min-h-screen bg-gray-50 p-6 mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-6">
          <PersonalDetails form={form} />
          <Address form={form} />
          <ContactAndDeclaration form={form} />
          <div className="sticky bottom-0 bg-gray-50 py-4">
            <Button type="submit" className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
