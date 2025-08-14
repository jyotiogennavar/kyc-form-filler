/**
 * Contact & Declaration section: Contact numbers, email, remarks, and user declaration.
 *
 * - Inputs are laid out in responsive grids for compact yet readable UI.
 * - File input for signature is stored as File; schema validates types and formats.
 */
import { UseFormReturn } from "react-hook-form";
 
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
 

interface ContactAndDeclarationProps {
  form: UseFormReturn<KycFormData>;
}

export function ContactAndDeclaration({ form }: ContactAndDeclarationProps) {

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-8">
                <FormLabel className="w-48">Mobile</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={field.value}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                      field.onChange(digitsOnly);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-8">
                <FormLabel className="w-48">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <FormItem className="flex items-start gap-x-8">
                <FormLabel className="w-48 pt-2">Remarks</FormLabel>
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
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="declarationDate"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Date</FormLabel>
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
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Place</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}