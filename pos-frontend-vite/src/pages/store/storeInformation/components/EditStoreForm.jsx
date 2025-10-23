import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FiLoader } from "react-icons/fi";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StoreValidationSchema, STORE_TYPE_OPTIONS } from "./validation";

const EditStoreForm = ({ initialValues, onSubmit, onCancel, isSubmitting }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={StoreValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting: formikSubmitting, errors, touched }) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="brand">Store Name *</Label>
              <Field
                as={Input}
                id="brand"
                name="brand"
                placeholder="Enter store name"
                className={errors.brand && touched.brand ? "border-red-500" : ""}
              />
              <ErrorMessage name="brand" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Label htmlFor="storeType">Store Type *</Label>
              <Field name="storeType">
                {({ field, form }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => form.setFieldValue(field.name, value)}
                  >
                    <SelectTrigger 
                      className={`w-full ${
                        errors.storeType && touched.storeType ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select store type" />
                    </SelectTrigger>
                    <SelectContent>
                      {STORE_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
              <ErrorMessage name="storeType" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                placeholder="Enter store description"
                rows={3}
                className={errors.description && touched.description ? "border-red-500" : ""}
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <Separator />

            <div>
              <h4 className="text-lg font-medium mb-4">Contact Information</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contact.address">Address *</Label>
                  <Field
                    as={Textarea}
                    id="contact.address"
                    name="contact.address"
                    placeholder="Enter store address"
                    rows={2}
                    className={errors.contact?.address && touched.contact?.address ? "border-red-500" : ""}
                  />
                  <ErrorMessage name="contact.address" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Label htmlFor="contact.phone">Phone Number *</Label>
                  <Field
                    as={Input}
                    id="contact.phone"
                    name="contact.phone"
                    placeholder="Enter phone number"
                    className={errors.contact?.phone && touched.contact?.phone ? "border-red-500" : ""}
                  />
                  <ErrorMessage name="contact.phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Label htmlFor="contact.email">Email Address *</Label>
                  <Field
                    as={Input}
                    id="contact.email"
                    name="contact.email"
                    type="email"
                    placeholder="Enter email address"
                    className={errors.contact?.email && touched.contact?.email ? "border-red-500" : ""}
                  />
                  <ErrorMessage name="contact.email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={formikSubmitting || isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={formikSubmitting || isSubmitting}>
              {formikSubmitting || isSubmitting ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Store"
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditStoreForm; 