import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createBranch, updateBranch } from "@/Redux Toolkit/features/branch/branchThunks";

const BranchForm = ({ initialValues, onSubmit, onCancel, isEditing }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.branch);
  const { store } = useSelector((state) => state.store);
  const { toast } = useToast();

  const validationSchema = Yup.object({
    name: Yup.string().required("Branch Name is required"),
    address: Yup.string().required("Address is required"),
    manager: Yup.string().required("Manager Name is required"),
    phone: Yup.string().required("Phone Number is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!store?.id) {
        toast({
          title: "Error",
          description: "Store information or authentication JWT missing!",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }

      const branchData = {
        ...values,
        storeId: store.id,
      };

      if (isEditing) {
        await dispatch(updateBranch({ id: initialValues.id, dto: branchData, jwt })).unwrap();
        toast({ title: "Success", description: "Branch updated successfully" });
      } else {
        await dispatch(createBranch({ dto: branchData, jwt })).unwrap();
        toast({ title: "Success", description: "Branch created successfully" });
      }
      onSubmit();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? "update" : "create"} branch`,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues || { name: "", address: "", manager: "", phone: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 py-2 pr-2">
          <div className="space-y-2">
            <label htmlFor="name">Branch Name</label>
            <Field
              as={Input}
              id="name"
              name="name"
              placeholder="Enter branch name"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="space-y-2">
            <label htmlFor="address">Address</label>
            <Field
              as={Input}
              id="address"
              name="address"
              placeholder="Enter branch address"
            />
            <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="space-y-2">
            <label htmlFor="manager">Manager Name</label>
            <Field
              as={Input}
              id="manager"
              name="manager"
              placeholder="Enter manager name"
            />
            <ErrorMessage name="manager" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone">Phone Number</label>
            <Field
              as={Input}
              id="phone"
              name="phone"
              placeholder="Enter phone number"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || loading}>
              {isSubmitting || loading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Branch" : "Add Branch")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BranchForm;