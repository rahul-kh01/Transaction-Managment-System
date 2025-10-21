import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "../../components/ui/select";

const validationSchema = Yup.object({
  storeName: Yup.string()
    .required("Store name is required")
    .min(2, "Store name must be at least 2 characters"),
  storeType: Yup.string().required("Store type is required"),
  storeAddress: Yup.string().optional(),
});

const storeTypes = [
  { value: "retail", label: "Retail Store" },
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "grocery", label: "Grocery Store" },
  { value: "electronics", label: "Electronics Store" },
  { value: "clothing", label: "Clothing Store" },
  { value: "other", label: "Other" },
];

const StoreDetailsForm = ({ initialValues, onSubmit, onBack }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <Form className="space-y-6">
          {/* Store Name Field */}
          <div>
            <label
              htmlFor="storeName"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Store Name
            </label>
            <Field
              as={Input}
              type="text"
              id="storeName"
              name="storeName"
              className={`w-full px-4 py-3 border rounded-lg shadow-sm transition-all duration-200 focus:outline-none ${
                touched.storeName && errors.storeName
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Enter your store name"
            />
            <ErrorMessage
              name="storeName"
              component="div"
              className="text-red-500 text-sm mt-2 flex items-center"
            >
              {(msg) => (
                <>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {msg}
                </>
              )}
            </ErrorMessage>
          </div>

          {/* Store Type Field */}
          <div>
            <label
              htmlFor="storeType"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Store Type
            </label>
            <Field name="storeType">
              {({ field, form }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => form.setFieldValue("storeType", val)}
                >
                  <SelectTrigger className="w-full" id="storeType">
                    <SelectValue placeholder="Select store type" />
                  </SelectTrigger>
                  <SelectContent>

                    <SelectGroup>
                      <SelectLabel>Store Types</SelectLabel>
                      {storeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                    </SelectGroup>
                    

                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage
              name="storeType"
              component="div"
              className="text-red-500 text-sm mt-2 flex items-center"
            >
              {(msg) => (
                <>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {msg}
                </>
              )}
            </ErrorMessage>
          </div>

          {/* Store Address Field */}
          <div>
            <label
              htmlFor="storeAddress"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Store Address{" "}
              <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <Field
              as={Textarea}
              id="storeAddress"
              name="storeAddress"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 focus:outline-none hover:border-gray-400 resize-none"
              placeholder="Enter your store address"
            />
            <ErrorMessage
              name="storeAddress"
              component="div"
              className="text-red-500 text-sm mt-2 flex items-center"
            >
              {(msg) => (
                <>
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {msg}
                </>
              )}
            </ErrorMessage>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 py-3 text-base font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-[1.02]"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex-1 py-3 text-base font-semibold bg-gradient-to-r from-green-700 to-emerald-900 hover:from-green-700 hover:to-emerald-900 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Complete Setup
                </div>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StoreDetailsForm;
