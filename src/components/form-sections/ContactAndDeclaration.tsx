/**
 * Contact & Declaration section: Contact numbers, email, remarks, and user declaration.
 *
 * - Inputs are laid out in responsive grids for compact yet readable UI.
 * - File input for signature is stored as File; schema validates types and formats.
 */
import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { KycFormData } from "@/schemas/kyc-schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ContactAndDeclarationProps {
  form: UseFormReturn<KycFormData>;
}

export function ContactAndDeclaration({ form }: ContactAndDeclarationProps) {
  const signatureFile = form.watch("signature");
  const [signatureUrl, setSignatureUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (signatureFile instanceof File) {
      const url = URL.createObjectURL(signatureFile);
      setSignatureUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setSignatureUrl(undefined);
    return undefined;
  }, [signatureFile]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="telOffice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone (Office)</FormLabel>
                  <FormControl>
                    <Input inputMode="tel" placeholder="StdCode-Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telResidence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telephone (Residence)</FormLabel>
                  <FormControl>
                    <Input inputMode="tel" placeholder="StdCode-Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input inputMode="tel" maxLength={10} placeholder="10-digit mobile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Remarks</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Any additional details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Declaration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="declarationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="declarationPlace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="signature"
              render={({ field: { onChange, name, onBlur, ref } }) => (
                <FormItem>
                  <FormLabel>Signature (Image)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      name={name}
                      onBlur={onBlur}
                      ref={ref}
                      onChange={(event) => onChange(event.target.files && event.target.files[0])}
                    />
                  </FormControl>
                  <FormMessage />
                  {signatureUrl && (
                    <div className="mt-2">
                      <Image 
                        src={signatureUrl} 
                        alt="Signature preview" 
                        width={200} 
                        height={80} 
                        className="object-contain border rounded bg-white" 
                        unoptimized 
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}