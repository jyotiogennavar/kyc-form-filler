"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { KycFormData } from "@/schemas/kyc-schema";

interface Props {
  form: UseFormReturn<KycFormData>;
}

export function PersonalDetails({ form }: Props) {
  return (
    <div className="space-y-4">
      <FormField control={form.control} name="applicationType" render={({ field }) => (
        <FormItem>
          <FormLabel>Application Type</FormLabel>
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
              <div className="flex items-center space-x-2"><RadioGroupItem value="new" id="new" /><Label htmlFor="new">New</Label></div>
              <div className="flex items-center space-x-2"><RadioGroupItem value="update" id="update" /><Label htmlFor="update">Update</Label></div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      {/* Conditional KYC Number if update */}
      {form.watch("applicationType") === "update" && (
        <FormField control={form.control} name="kycNumber" render={({ field }) => (
          <FormItem>
            <FormLabel>KYC Number (Mandatory for Update)</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      )}
      {/* Add similar FormField for accountType, prefix, firstName, middleName, lastName, maidenName, fatherSpouseName, motherName, dateOfBirth (use <Input type="date"/>), gender (RadioGroup), maritalStatus (Select), citizenship (Radio + conditional inputs), residentialStatus (Select), pan, form60Furnished (Checkbox), photo (File Input) */}
      {/* Example for Gender */}
      <FormField control={form.control} name="gender" render={({ field }) => (
        <FormItem>
          <FormLabel>Gender</FormLabel>
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
              <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Male</Label></div>
              {/* Female, Transgender */}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      {/* ... Add all other fields similarly. Use form.watch() for conditionals like citizenshipCountry if citizenship="others" */}
    </div>
  );
}


// Error Handling: <FormMessage /> shows Zod errors automatically.
// Conditionals: Use form.watch() to show/hide fields (e.g., kycNumber only for update).