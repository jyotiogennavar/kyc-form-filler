"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { KycFormData } from "@/schemas/kyc-schema";

interface Props {
  form: UseFormReturn<KycFormData>;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Personal Details section: Application meta, names, DOB, gender, marital, citizenship, PAN.
 *
 * - Structured rows mimic the PDF layout with clear labels and spacing.
 * - Conditional blocks: KYC number on update, citizenship country when not Indian.
 * - File upload for photo kept optional per PDF guidance.
 */
export function PersonalDetails({ form }: Props) {
  const photoFile = form.watch("photo");
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (photoFile instanceof File) {
      const url = URL.createObjectURL(photoFile);
      setPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPhotoUrl(undefined);
    return undefined;
  }, [photoFile]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Personal Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      <FormField
        control={form.control}
        name="applicationType"
        render={({ field }) => (
          <FormItem className="flex gap-x-8">
            <FormLabel>Application Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">New</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="update" id="update" />
                  <Label htmlFor="update">Update</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Conditional KYC Number if update */}
      {form.watch("applicationType") === "update" && (
        <FormField
          control={form.control}
          name="kycNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>KYC Number (Mandatory for Update)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Account Type */}
      <FormField
        control={form.control}
        name="accountType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="minor">Minor</SelectItem>
                <SelectItem value="aadhaar-otp-ekyc">
                  Aadhaar OTP eKYC
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Name Fields Row */}
      <div className="flex items-start gap-8">
        <div className="w-32 pt-2">
          <Label className="text-sm font-medium">Name *</Label>
        </div>
        <div className="flex-1 flex gap-4">
          <FormField
            control={form.control}
            name="prefix"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">Prefix</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">Middle Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-500">Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Maiden Name Row */}
      <div className="flex items-start gap-8">
        <div className="w-32 pt-2">
          <Label className="text-sm font-medium">Maiden Name</Label>
        </div>
        <div className="flex-1 flex gap-4">
          <FormField
            control={form.control}
            name="maidenPrefix"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maidenFirstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maidenMiddleName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Middle Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maidenName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Father/Spouse Name Row */}
      <div className="flex items-start gap-8">
        <div className="w-32 pt-2">
          <Label className="text-sm font-medium">Father/Spouse Name *</Label>
        </div>
        <div className="flex-1 flex gap-4">
          <FormField
            control={form.control}
            name="fatherSpousePrefix"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherSpouseFirstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherSpouseMiddleName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Middle Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherSpouseName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Mother Name Row */}
      <div className="flex items-start gap-8">
        <div className="w-32 pt-2">
          <Label className="text-sm font-medium">Mother Name</Label>
        </div>
        <div className="flex-1 flex gap-4">
          <FormField
            control={form.control}
            name="motherPrefix"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="mr">Mr.</SelectItem>
                    <SelectItem value="mrs">Mrs.</SelectItem>
                    <SelectItem value="ms">Ms.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motherFirstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motherMiddleName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Middle Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motherName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      {/*  <div>
                    <label htmlFor="dob" className={labelBase}>
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      type="date"
                      placeholder="YYYY-MM-DD"
                      aria-invalid={!!errors.dob}
                      aria-describedby={errors.dob ? "dob-error" : undefined}
                      className={inputBase}
                      {...register("dob")}
                    />
                    {errors.dob && (
                      <p id="dob-error" className={errorText}>
                        {errors.dob.message}
                      </p>
                    )}
                  </div> */}

      {/* Date of Birth - See kycSchema for validation. This uses native date input to keep UX simple. */}
      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem className="mt-8 flex gap-x-8">
            <FormLabel>Date of Birth *</FormLabel>
            <FormControl>
              <Input id="dob" type="date" placeholder="YYYY-MM-DD" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Gender */}
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="flex gap-x-8">
            <FormLabel>Gender *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transgender" id="transgender" />
                  <Label htmlFor="transgender">Transgender</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Marital Status */}
      <FormField
        control={form.control}
        name="maritalStatus"
        render={({ field }) => (
          <FormItem className="flex gap-x-8">
            <FormLabel>Marital Status *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="married" id="married" />
                  <Label htmlFor="married">Married</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unmarried" id="unmarried" />
                  <Label htmlFor="unmarried">Unmarried</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="others" id="others-marital" />
                  <Label htmlFor="others-marital">Others</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Citizenship */}
      <FormField
        control={form.control}
        name="citizenship"
        render={({ field }) => (
          <FormItem className="flex gap-x-8">
            <FormLabel>Citizenship *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="indian" id="indian" />
                  <Label htmlFor="indian">Indian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="others" id="others-citizenship" />
                  <Label htmlFor="others-citizenship">Others</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Conditional Citizenship Country */}
      {form.watch("citizenship") === "others" && (
        <>
          <FormField
            control={form.control}
            name="citizenshipCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Citizenship Country *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter country name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="citizenshipCountryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Code (ISO 3166) *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., US, UK, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      {/* Residential Status */}
      <FormField
        control={form.control}
        name="residentialStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Residential Status *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select residential status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="resident-individual">
                  Resident Individual
                </SelectItem>
                <SelectItem value="nri">NRI</SelectItem>
                <SelectItem value="foreign-national">
                  Foreign National
                </SelectItem>
                <SelectItem value="pio">PIO</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* PAN */}
      <FormField
        control={form.control}
        name="pan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PAN *</FormLabel>
            <FormControl>
              <Input placeholder="ABCDE1234F" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Form 60 Furnished */}
      <FormField
        control={form.control}
        name="form60Furnished"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Form 60 Furnished (Optional)</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Photo Upload */}
      <FormField
        control={form.control}
        name="photo"
        render={({ field: { onChange, name, onBlur, ref } }) => (
          <FormItem>
            <FormLabel>Photo (Optional)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                name={name}
                onBlur={onBlur}
                ref={ref}
                onChange={(event) =>
                  onChange(event.target.files && event.target.files[0])
                }
              />
            </FormControl>
            <FormMessage />
            {photoUrl && (
              <div className="mt-2">
                <img src={photoUrl} alt="Photo preview" className="h-32 w-32 object-cover border rounded" />
              </div>
            )}
          </FormItem>
        )}
      />
      </CardContent>
    </Card>
  );
}

// Error Handling: <FormMessage /> shows Zod errors automatically.
// Conditionals: Use form.watch() to show/hide fields (e.g., kycNumber only for update).
