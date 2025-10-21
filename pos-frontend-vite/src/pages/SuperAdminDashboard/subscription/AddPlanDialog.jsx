// External dependencies
import React, { useState, memo } from 'react';

import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// UI components
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue
} from '../../../components/ui/select';
import { Switch } from '../../../components/ui/switch';
import { Button } from '../../../components/ui/button';

// Redux thunks
import { createSubscriptionPlan } from '@/Redux Toolkit/features/subscriptionPlan/subscriptionPlanThunks';

// --- Constants ---
const BILLING_CYCLES = [
  { label: 'Monthly', value: 'MONTHLY' },
  { label: 'Yearly', value: 'YEARLY' },
];

const FEATURE_FIELDS = [
  { key: 'enableAdvancedReports', label: 'Advanced Reports' },
  { key: 'enableInventory', label: 'Inventory System' },
  { key: 'enableIntegrations', label: 'Integrations' },
  { key: 'enableEcommerce', label: 'eCommerce' },
  { key: 'enableInvoiceBranding', label: 'Invoice Branding' },
  { key: 'prioritySupport', label: 'Priority Support' },
  { key: 'enableMultiLocation', label: 'Multi-location' },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().typeError('Price must be a number').required('Price is required').min(0),
  billingCycle: Yup.string().oneOf(['MONTHLY', 'YEARLY']).required('Billing cycle is required'),
  maxBranches: Yup.number().typeError('Branches must be a number').required('Branches is required').min(1),
  maxUsers: Yup.number().typeError('Users must be a number').required('Users is required').min(1),
  maxProducts: Yup.number().typeError('Products must be a number').required('Products is required').min(1),
  enableAdvancedReports: Yup.boolean().required(),
  enableInventory: Yup.boolean().required(),
  enableIntegrations: Yup.boolean().required(),
  enableEcommerce: Yup.boolean().required(),
  enableInvoiceBranding: Yup.boolean().required(),
  prioritySupport: Yup.boolean().required(),
  enableMultiLocation: Yup.boolean().required(),
  extraFeatures: Yup.array().of(Yup.string().required('Feature cannot be empty')).min(1, 'At least one extra feature is required'),
});

const initialValues = {
  name: '',
  description: '',
  price: '',
  billingCycle: '',
  maxBranches: '',
  maxUsers: '',
  maxProducts: '',
  enableAdvancedReports: false,
  enableInventory: false,
  enableIntegrations: false,
  enableEcommerce: false,
  enableInvoiceBranding: false,
  prioritySupport: false,
  enableMultiLocation: false,
  extraFeatures: [''],
};

// --- Subcomponents ---

/**
 * Renders the feature switches grid.
 */
const FeaturesSwitchGrid = memo(({ handleFeatureSwitch }) => (
  <div className="grid grid-cols-2 gap-2">
    {FEATURE_FIELDS.map(f => (
      <label key={f.key} className="flex items-center gap-2">
        <Field name={f.key} type="checkbox">
          {({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={val => handleFeatureSwitch(f.key, val)}
              aria-label={f.label}
            />
          )}
        </Field>
        <span>{f.label}</span>
      </label>
    ))}
  </div>
));
FeaturesSwitchGrid.displayName = 'FeaturesSwitchGrid';

/**
 * Renders the extra features input list.
 */
const ExtraFeaturesList = memo(({ values, handleExtraFeatureChange, handleRemoveExtraFeature, handleAddExtraFeature }) => (
  <>
    {values.extraFeatures.map((feature, idx) => (
      <div key={idx} className="flex gap-2 mb-1">
        <Input
          value={feature}
          onChange={e => handleExtraFeatureChange(idx, e.target.value)}
          placeholder="Extra feature"
          aria-label={`Extra feature ${idx + 1}`}
        />
        <Button
          type="button"
          variant="ghost"
          onClick={() => handleRemoveExtraFeature(idx)}
          disabled={values.extraFeatures.length === 1}
        >
          Remove
        </Button>
      </div>
    ))}
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleAddExtraFeature}
    >
      + Add Feature
    </Button>
  </>
));
ExtraFeaturesList.displayName = 'ExtraFeaturesList';

// --- Main Dialog Component ---

/**
 * Dialog for adding a new subscription plan.
 */
const AddPlanDialog = ({ open, onOpenChange, onSuccess }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // --- Handlers ---
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    setLoading(true);
    try {
      const res = await dispatch(createSubscriptionPlan(values));
      if (res.meta.requestStatus === 'fulfilled') {
        if (onSuccess) onSuccess();
        resetForm();
        onOpenChange(false);
      } else {
        setErrors({ submit: res.payload || 'Failed to create plan' });
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // These handlers are created inside Formik's render function to access setFieldValue and values
  const renderForm = ({ values, isSubmitting, errors, setFieldValue }) => {
    // Handler for feature switch
    const handleFeatureSwitch = (key, val) => {
      setFieldValue(key, val);
    };
    // Handler for extra feature change
    const handleExtraFeatureChange = (idx, value) => {
      const arr = [...values.extraFeatures];
      arr[idx] = value;
      setFieldValue('extraFeatures', arr);
    };
    // Handler for removing an extra feature
    const handleRemoveExtraFeature = idx => {
      const arr = values.extraFeatures.filter((_, i) => i !== idx);
      setFieldValue('extraFeatures', arr.length ? arr : ['']);
    };
    // Handler for adding an extra feature
    const handleAddExtraFeature = () => {
      setFieldValue('extraFeatures', [...values.extraFeatures, '']);
    };

    return (
      <Form className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium" htmlFor="plan-name">Name</label>
          <Field as={Input} id="plan-name" name="name" placeholder="Plan name" />
          <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
        </div>
        {/* Description */}
        <div>
          <label className="block font-medium" htmlFor="plan-description">Description</label>
          <Field as={Input} id="plan-description" name="description" placeholder="Description" />
          <ErrorMessage name="description" component="div" className="text-red-500 text-xs" />
        </div>
        {/* Price & Billing Cycle */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium" htmlFor="plan-price">Price (₹)</label>
            <Field as={Input} id="plan-price" name="price" type="number" min="0" placeholder="Price" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-xs" />
          </div>
          <div className="flex-1">
            <label className="block font-medium" htmlFor="plan-billing-cycle">Billing Cycle</label>
            <Field name="billingCycle">
              {({ field }) => (
                <Select value={field.value} onValueChange={val => setFieldValue('billingCycle', val)}>
                  <SelectTrigger className="w-full" id="plan-billing-cycle">
                    <SelectValue placeholder="Select cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    {BILLING_CYCLES.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
            <ErrorMessage name="billingCycle" component="div" className="text-red-500 text-xs" />
          </div>
        </div>
        {/* Branches, Users, Products */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium" htmlFor="plan-branches">Branches</label>
            <Field as={Input} id="plan-branches" name="maxBranches" type="number" min="1" placeholder="Branches" />
            <ErrorMessage name="maxBranches" component="div" className="text-red-500 text-xs" />
          </div>
          <div className="flex-1">
            <label className="block font-medium" htmlFor="plan-users">Users</label>
            <Field as={Input} id="plan-users" name="maxUsers" type="number" min="1" placeholder="Users" />
            <ErrorMessage name="maxUsers" component="div" className="text-red-500 text-xs" />
          </div>
          <div className="flex-1">
            <label className="block font-medium" htmlFor="plan-products">Products</label>
            <Field as={Input} id="plan-products" name="maxProducts" type="number" min="1" placeholder="Products" />
            <ErrorMessage name="maxProducts" component="div" className="text-red-500 text-xs" />
          </div>
        </div>
        {/* Features Switches */}
        <div>
          <label className="block font-medium mb-2">Features</label>
          <FeaturesSwitchGrid handleFeatureSwitch={handleFeatureSwitch} />
          {FEATURE_FIELDS.map(f => (
            <ErrorMessage key={f.key} name={f.key} component="div" className="text-red-500 text-xs" />
          ))}
        </div>
        {/* Extra Features */}
        <div>
          <label className="block font-medium mb-1">Extra Features</label>
          <ExtraFeaturesList
            values={values}
            handleExtraFeatureChange={handleExtraFeatureChange}
            handleRemoveExtraFeature={handleRemoveExtraFeature}
            handleAddExtraFeature={handleAddExtraFeature}
          />
          <ErrorMessage name="extraFeatures" component="div" className="text-red-500 text-xs" />
        </div>
        {/* Submission error */}
        {errors.submit && <div className="text-red-500 text-xs">{errors.submit}</div>}
        {/* Dialog Footer */}
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting || loading}>
            {loading ? 'Saving...' : 'Save Plan'}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </Form>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subscription Plan</DialogTitle>
        </DialogHeader>
        <div style={{ maxHeight: '65vh', overflowY: 'auto', paddingRight: 4 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {renderForm}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};


export default AddPlanDialog; 