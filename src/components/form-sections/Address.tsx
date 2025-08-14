"use client";

/**
 * Address section: OVD details, Permanent Address, and Current Address.
 *
 * - Grouped using Card for clear visual separation.
 * - Conditional fields appear based on `ovdType` and `currentAddressSameAsAbove`.
 * - Selects use short code lists (state/country) to match PDF expectations.
 * - Validation rules live in `kycSchema` (superRefine enforces conditionals).
 */
import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import { KycFormData } from "@/schemas/kyc-schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OVD_TYPES, STATE_CODES, COUNTRY_CODES_ISO2, STATE_CODE_TO_NAME, STATE_NAME_TO_CODE } from "@/types/kyc-types";

interface AddressProps {
  form: UseFormReturn<KycFormData>;
}

export function Address({ form }: AddressProps) {
  // Helpers to map postal data to our fields
  async function fetchByPincode(pin: string) {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();
      const result = Array.isArray(data) ? data[0] : undefined;
      if (result && result.Status === "Success" && Array.isArray(result.PostOffice) && result.PostOffice.length > 0) {
        const office = result.PostOffice[0];
        return {
          city: office.Name as string | undefined,
          district: office.District as string | undefined,
          stateName: office.State as string | undefined,
          pinCode: office.Pincode as string | undefined,
        };
      }
    } catch {
      // ignore
    }
    return undefined;
  }

  async function fetchByPlaceName(place: string) {
    try {
      const res = await fetch(`https://api.postalpincode.in/postoffice/${encodeURIComponent(place)}`);
      const data = await res.json();
      const result = Array.isArray(data) ? data[0] : undefined;
      if (result && result.Status === "Success" && Array.isArray(result.PostOffice) && result.PostOffice.length > 0) {
        const office = result.PostOffice[0];
        return {
          city: office.Name as string | undefined,
          district: office.District as string | undefined,
          stateName: office.State as string | undefined,
          pinCode: office.Pincode as string | undefined,
        };
      }
    } catch {
      // ignore
    }
    return undefined;
  }

  // Watch values
  const pin = form.watch("pinCode");
  const city = form.watch("cityTownVillage");
  const district = form.watch("district");
  const sameAsAbove = form.watch("currentAddressSameAsAbove");
  const currentPin = form.watch("currentPinCode");
  const currentCity = form.watch("currentCityTownVillage");
  const currentDistrict = form.watch("currentDistrict");

  // Autofill for permanent address
  useEffect(() => {
    if (/^\d{6}$/.test(pin || "")) {
      fetchByPincode(pin as string).then((info) => {
        if (!info) return;
        const { city, district, stateName, pinCode } = info;
        if (city && !form.getValues("cityTownVillage")) form.setValue("cityTownVillage", city);
        if (district && !form.getValues("district")) form.setValue("district", district);
        if (stateName) {
          const code = STATE_NAME_TO_CODE[stateName.toLowerCase()];
          if (code) form.setValue("stateCode", code);
        }
        if (pinCode && !form.getValues("pinCode")) form.setValue("pinCode", pinCode);
      });
    }
  }, [pin, form]);

  useEffect(() => {
    if ((city || "").length >= 3) {
      fetchByPlaceName(city as string).then((info) => {
        if (!info) return;
        const { district, stateName, pinCode } = info;
        if (district && !form.getValues("district")) form.setValue("district", district);
        if (stateName) {
          const code = STATE_NAME_TO_CODE[stateName.toLowerCase()];
          if (code) form.setValue("stateCode", code);
        }
        if (pinCode && !form.getValues("pinCode")) form.setValue("pinCode", pinCode);
      });
    }
  }, [city, form]);

  useEffect(() => {
    if ((district || "").length >= 3 && !form.getValues("stateCode")) {
      fetchByPlaceName(district as string).then((info) => {
        if (!info) return;
        const { stateName, pinCode } = info;
        if (stateName) {
          const code = STATE_NAME_TO_CODE[stateName.toLowerCase()];
          if (code) form.setValue("stateCode", code);
        }
        if (pinCode && !form.getValues("pinCode")) form.setValue("pinCode", pinCode);
      });
    }
  }, [district, form]);

  // Autofill for current address (only when not same as above)
  useEffect(() => {
    if (!sameAsAbove) {
      if (/^\d{6}$/.test(currentPin || "")) {
        fetchByPincode(currentPin as string).then((info) => {
          if (!info) return;
          const { city, district, stateName, pinCode } = info;
          if (city && !form.getValues("currentCityTownVillage")) form.setValue("currentCityTownVillage", city);
          if (district && !form.getValues("currentDistrict")) form.setValue("currentDistrict", district);
          if (stateName) {
            const code = STATE_NAME_TO_CODE[stateName.toLowerCase()];
            if (code) form.setValue("currentStateCode", code);
          }
          if (pinCode && !form.getValues("currentPinCode")) form.setValue("currentPinCode", pinCode);
        });
      }
    }
  }, [currentPin, sameAsAbove, form]);

  useEffect(() => {
    if (!sameAsAbove) {
      if ((currentCity || "").length >= 3) {
        fetchByPlaceName(currentCity as string).then((info) => {
          if (!info) return;
          const { district, stateName, pinCode } = info;
          if (district && !form.getValues("currentDistrict")) form.setValue("currentDistrict", district);
          if (stateName) {
            const code = STATE_NAME_TO_CODE[stateName.toLowerCase()];
            if (code) form.setValue("currentStateCode", code);
          }
          if (pinCode && !form.getValues("currentPinCode")) form.setValue("currentPinCode", pinCode);
        });
      }
    }
  }, [currentCity, sameAsAbove, form]);

  useEffect(() => {
    if (!sameAsAbove) {
      if ((currentDistrict || "").length >= 3 && !form.getValues("currentStateCode")) {
        fetchByPlaceName(currentDistrict as string).then((info) => {
          if (!info) return;
          const { stateName, pinCode } = info;
          if (stateName) {
            const code = STATE_NAME_TO_CODE[stateName.toLowerCase()];
            if (code) form.setValue("currentStateCode", code);
          }
          if (pinCode && !form.getValues("currentPinCode")) form.setValue("currentPinCode", pinCode);
        });
      }
    }
  }, [currentDistrict, sameAsAbove, form]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Officially Valid Document (OVD)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="ovdType"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">OVD Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OVD" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {OVD_TYPES.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("ovdType") === "passport" && (
              <>
                <FormField
                  control={form.control}
                  name="passportNumber"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-x-8">
                      <FormLabel className="w-48">Passport Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter passport number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passportExpiry"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-x-8">
                      <FormLabel className="w-48">Passport Expiry</FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {form.watch("ovdType") === "driving-licence" && (
              <FormField
                control={form.control}
                name="drivingLicenceExpiry"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-x-8">
                    <FormLabel className="w-48">Driving Licence Expiry</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <FormField
              control={form.control}
              name="eKycAuthentication"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>e-KYC Authentication</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offlineAadhaar"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Offline Aadhaar XML</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permanent Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Address Line 1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Address Line 2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine3"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Address Line 3</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cityTownVillage"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">City/Town/Village</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">District</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pinCode"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Pin Code</FormLabel>
                  <FormControl>
                    <Input inputMode="numeric" maxLength={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stateCode"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">State/UT Code</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATE_CODES.map((code) => (
                        <SelectItem key={code} value={code}>
                          {`${code} - ${STATE_CODE_TO_NAME[code] ?? ""}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Country (ISO 3166)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COUNTRY_CODES_ISO2.map((code) => (
                        <SelectItem key={code} value={code}>{code}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="currentAddressSameAsAbove"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Current Address same as above</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {!form.watch("currentAddressSameAsAbove") && (
        <Card>
          <CardHeader>
            <CardTitle>Current Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          <div className="space-y-4">
              <FormField
                control={form.control}
                name="currentAddressLine1"
                render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Address Line 1</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentAddressLine2"
                render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Address Line 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentAddressLine3"
                render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Address Line 3</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="currentCityTownVillage"
                render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">City/Town/Village</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentDistrict"
                render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">District</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPinCode"
                render={({ field }) => (
                <FormItem className="flex items-center gap-x-8">
                  <FormLabel className="w-48">Pin Code</FormLabel>
                    <FormControl>
                      <Input inputMode="numeric" maxLength={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="currentStateCode"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-x-8">
                    <FormLabel className="w-48">State/UT Code</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          {STATE_CODES.map((code) => (
                            <SelectItem key={code} value={code}>
                              {`${code} - ${STATE_CODE_TO_NAME[code] ?? ""}`}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentCountryCode"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-x-8">
                    <FormLabel className="w-48">Country (ISO 3166)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRY_CODES_ISO2.map((code) => (
                          <SelectItem key={code} value={code}>{code}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="deemedProofDocumentCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deemed Proof Document Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter code (as per PDF)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}