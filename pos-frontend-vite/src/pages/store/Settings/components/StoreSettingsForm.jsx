import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  StoreSettingsValidationSchema, 
  CURRENCY_OPTIONS, 
  TIMEZONE_OPTIONS, 
  DATE_FORMAT_OPTIONS 
} from "./validation";
import { transformSettingsToApiFormat } from "./formUtils";

const StoreSettingsForm = ({ initialValues, onSubmit, isSubmitting, storeId }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Transform settings data to API format
      const apiData = transformSettingsToApiFormat(values);
      
      // Call the onSubmit function with the transformed data
      await onSubmit(apiData, { setSubmitting, resetForm });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={StoreSettingsValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting: formikSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="storeName">Store Name *</Label>
                <Field
                  as={Input}
                  id="storeName"
                  name="storeName"
                  placeholder="Enter store name"
                  className={errors.storeName && touched.storeName ? "border-red-500" : ""}
                />
                <ErrorMessage name="storeName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="storeEmail">Store Email *</Label>
                <Field
                  as={Input}
                  id="storeEmail"
                  name="storeEmail"
                  type="email"
                  placeholder="Enter store email"
                  className={errors.storeEmail && touched.storeEmail ? "border-red-500" : ""}
                />
                <ErrorMessage name="storeEmail" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="storePhone">Store Phone *</Label>
                <Field
                  as={Input}
                  id="storePhone"
                  name="storePhone"
                  placeholder="Enter store phone"
                  className={errors.storePhone && touched.storePhone ? "border-red-500" : ""}
                />
                <ErrorMessage name="storePhone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="currency">Currency *</Label>
                <Field name="currency">
                  {({ field, form }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => form.setFieldValue(field.name, value)}
                    >
                      <SelectTrigger 
                        className={`w-full ${
                          errors.currency && touched.currency ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage name="currency" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="taxRate">Tax Rate (%) *</Label>
                <Field
                  as={Input}
                  id="taxRate"
                  name="taxRate"
                  type="number"
                  step="0.01"
                  placeholder="Enter tax rate"
                  className={errors.taxRate && touched.taxRate ? "border-red-500" : ""}
                />
                <ErrorMessage name="taxRate" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="timezone">Timezone *</Label>
                <Field name="timezone">
                  {({ field, form }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => form.setFieldValue(field.name, value)}
                    >
                      <SelectTrigger 
                        className={`w-full ${
                          errors.timezone && touched.timezone ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMEZONE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage name="timezone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

            </div>

            <div className="space-y-3">
              <Label htmlFor="storeAddress">Store Address *</Label>
              <Field
                as={Input}
                id="storeAddress"
                name="storeAddress"
                placeholder="Enter store address"
                className={errors.storeAddress && touched.storeAddress ? "border-red-500" : ""}
              />
              <ErrorMessage name="storeAddress" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="space-y-3">
              <Label htmlFor="storeDescription">Store Description</Label>
              <Field
                as={Textarea}
                id="storeDescription"
                name="storeDescription"
                placeholder="Enter store description"
                rows={3}
                className={errors.storeDescription && touched.storeDescription ? "border-red-500" : ""}
              />
              <ErrorMessage name="storeDescription" component="div" className="text-red-500 text-sm mt-1" />
            </div>

          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="submit" disabled={formikSubmitting || isSubmitting}>
              {formikSubmitting || isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Store Settings"
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StoreSettingsForm; 