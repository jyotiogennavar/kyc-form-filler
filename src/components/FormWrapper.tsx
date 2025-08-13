"use client";

import { KycFormData, kycSchema } from "@/schemas/kyc-schema";
import { PersonalDetails } from "@/components/form-sections/PersonalDetails";
import { Address } from "@/components/form-sections/Address";
import { ContactAndDeclaration } from "@/components/form-sections/ContactAndDeclaration";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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

  const [mode, setMode] = useState<"form" | "preview">("form");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewData, setPreviewData] = useState<{
    data: KycFormData;
    photoUrl?: string;
    signatureUrl?: string;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (previewData?.photoUrl) URL.revokeObjectURL(previewData.photoUrl);
      if (previewData?.signatureUrl) URL.revokeObjectURL(previewData.signatureUrl);
    };
  }, [previewData]);

  const onSubmit = (data: KycFormData) => {
    setIsGenerating(true);
    const next = {
      data,
      photoUrl: data.photo ? URL.createObjectURL(data.photo) : undefined,
      signatureUrl: data.signature ? URL.createObjectURL(data.signature) : undefined,
    } as const;
    setPreviewData(next);
    // Small delay to show the generating message clearly
    setTimeout(() => {
      setIsGenerating(false);
      setMode("preview");
    }, 400);
  };

  return (
    <div className=" max-w-5xl mx-auto flex flex-col min-h-screen bg-gray-50 p-6 mt-10">
      {mode === "form" && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-6">
            <PersonalDetails form={form} />
            <Address form={form} />
            <ContactAndDeclaration form={form} />
            <div className="sticky bottom-0 bg-gray-50 py-4">
              <Button type="submit" className="w-full">Submit</Button>
            </div>
            {isGenerating && (
              <div className="text-center text-sm text-muted-foreground mt-2">generating the preview...</div>
            )}
          </form>
        </Form>
      )}

      {mode === "preview" && previewData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">KYC Form Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setMode("form")}>Edit</Button>
              <Button onClick={() => window.print()}>Export PDF</Button>
            </div>
          </div>

          <div id="preview-print" className="bg-white shadow-sm rounded-md p-6 space-y-6">
            <section className="space-y-2">
              <h3 className="font-medium text-lg">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div><span className="font-semibold">Application Type:</span> {previewData.data.applicationType}</div>
                {previewData.data.kycNumber && (
                  <div><span className="font-semibold">KYC Number:</span> {previewData.data.kycNumber}</div>
                )}
                <div><span className="font-semibold">Account Type:</span> {previewData.data.accountType}</div>
                <div className="md:col-span-3"><span className="font-semibold">Name:</span> {[previewData.data.prefix, previewData.data.firstName, previewData.data.middleName, previewData.data.lastName].filter(Boolean).join(" ")}</div>
                {previewData.data.maidenFirstName || previewData.data.maidenName ? (
                  <div className="md:col-span-3"><span className="font-semibold">Maiden Name:</span> {[previewData.data.maidenPrefix, previewData.data.maidenFirstName, previewData.data.maidenMiddleName, previewData.data.maidenName].filter(Boolean).join(" ")}</div>
                ) : null}
                <div className="md:col-span-3"><span className="font-semibold">Father/Spouse:</span> {[previewData.data.fatherSpousePrefix, previewData.data.fatherSpouseFirstName, previewData.data.fatherSpouseMiddleName, previewData.data.fatherSpouseName].filter(Boolean).join(" ")}</div>
                {previewData.data.motherFirstName || previewData.data.motherName ? (
                  <div className="md:col-span-3"><span className="font-semibold">Mother:</span> {[previewData.data.motherPrefix, previewData.data.motherFirstName, previewData.data.motherMiddleName, previewData.data.motherName].filter(Boolean).join(" ")}</div>
                ) : null}
                <div><span className="font-semibold">DOB:</span> {previewData.data.dateOfBirth}</div>
                <div><span className="font-semibold">Gender:</span> {previewData.data.gender}</div>
                <div><span className="font-semibold">Marital:</span> {previewData.data.maritalStatus}</div>
                <div><span className="font-semibold">Citizenship:</span> {previewData.data.citizenship}</div>
                {previewData.data.citizenship === "others" && (
                  <>
                    <div><span className="font-semibold">Citizenship Country:</span> {previewData.data.citizenshipCountry}</div>
                    <div><span className="font-semibold">Country Code:</span> {previewData.data.citizenshipCountryCode}</div>
                  </>
                )}
                <div><span className="font-semibold">PAN:</span> {previewData.data.pan}</div>
                <div><span className="font-semibold">Form 60 Furnished:</span> {previewData.data.form60Furnished ? "Yes" : "No"}</div>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-medium text-lg">OVD</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div><span className="font-semibold">Type:</span> {previewData.data.ovdType ?? "-"}</div>
                {previewData.data.ovdType === "passport" && (
                  <>
                    <div><span className="font-semibold">Passport No:</span> {previewData.data.passportNumber}</div>
                    <div><span className="font-semibold">Passport Expiry:</span> {previewData.data.passportExpiry}</div>
                  </>
                )}
                {previewData.data.ovdType === "driving-licence" && (
                  <div><span className="font-semibold">DL Expiry:</span> {previewData.data.drivingLicenceExpiry}</div>
                )}
                <div><span className="font-semibold">eKYC Auth:</span> {previewData.data.eKycAuthentication ? "Yes" : "No"}</div>
                <div><span className="font-semibold">Offline Aadhaar:</span> {previewData.data.offlineAadhaar ? "Yes" : "No"}</div>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="font-medium text-lg">Permanent Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="md:col-span-3"><span className="font-semibold">Address:</span> {[previewData.data.addressLine1, previewData.data.addressLine2, previewData.data.addressLine3].filter(Boolean).join(", ")}</div>
                <div><span className="font-semibold">City/Town/Village:</span> {previewData.data.cityTownVillage}</div>
                <div><span className="font-semibold">District:</span> {previewData.data.district}</div>
                <div><span className="font-semibold">Pin Code:</span> {previewData.data.pinCode}</div>
                <div><span className="font-semibold">State Code:</span> {previewData.data.stateCode}</div>
                <div><span className="font-semibold">Country Code:</span> {previewData.data.countryCode}</div>
              </div>
            </section>

            {!previewData.data.currentAddressSameAsAbove && (
              <section className="space-y-2">
                <h3 className="font-medium text-lg">Current Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="md:col-span-3"><span className="font-semibold">Address:</span> {[previewData.data.currentAddressLine1, previewData.data.currentAddressLine2, previewData.data.currentAddressLine3].filter(Boolean).join(", ")}</div>
                  <div><span className="font-semibold">City/Town/Village:</span> {previewData.data.currentCityTownVillage}</div>
                  <div><span className="font-semibold">District:</span> {previewData.data.currentDistrict}</div>
                  <div><span className="font-semibold">Pin Code:</span> {previewData.data.currentPinCode}</div>
                  <div><span className="font-semibold">State Code:</span> {previewData.data.currentStateCode}</div>
                  <div><span className="font-semibold">Country Code:</span> {previewData.data.currentCountryCode}</div>
                  <div className="md:col-span-3"><span className="font-semibold">Deemed Proof Doc Code:</span> {previewData.data.deemedProofDocumentCode}</div>
                </div>
              </section>
            )}

            <section className="space-y-2">
              <h3 className="font-medium text-lg">Contact & Declaration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div><span className="font-semibold">Telephone (Office):</span> {previewData.data.telOffice}</div>
                <div><span className="font-semibold">Telephone (Residence):</span> {previewData.data.telResidence}</div>
                <div><span className="font-semibold">Mobile:</span> {previewData.data.mobile}</div>
                <div className="md:col-span-3"><span className="font-semibold">Email:</span> {previewData.data.email}</div>
                {previewData.data.remarks && (
                  <div className="md:col-span-3"><span className="font-semibold">Remarks:</span> {previewData.data.remarks}</div>
                )}
                <div><span className="font-semibold">Declaration Date:</span> {previewData.data.declarationDate}</div>
                <div><span className="font-semibold">Declaration Place:</span> {previewData.data.declarationPlace}</div>
              </div>
            </section>

            {(previewData.photoUrl || previewData.signatureUrl) && (
              <section className="space-y-2">
                <h3 className="font-medium text-lg">Uploaded Images</h3>
                <div className="flex gap-6 items-start">
                  {previewData.photoUrl && (
                    <div className="space-y-1 text-sm">
                      <div className="font-semibold">Photo</div>
                      <img src={previewData.photoUrl} alt="Photo" className="h-32 w-32 object-cover border rounded" />
                    </div>
                  )}
                  {previewData.signatureUrl && (
                    <div className="space-y-1 text-sm">
                      <div className="font-semibold">Signature</div>
                      <img src={previewData.signatureUrl} alt="Signature" className="h-20 w-auto object-contain border rounded bg-white" />
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
