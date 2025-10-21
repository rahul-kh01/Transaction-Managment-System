import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory } from '@/Redux Toolkit/features/category/categoryThunks';
import { toast } from '@/components/ui/use-toast';

const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  description: Yup.string().optional(),
});

const CategoryForm = ({ initialValues, onSubmit, onCancel, isEditing = false }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.category);
  const { store } = useSelector((state) => state.store);

  const defaultValues = {
    name: '',
    description: '',
    ...initialValues
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem('jwt');
      const dto = {
        ...values,
        storeId: store.id,
      };

      if (isEditing && initialValues?.id) {
        await dispatch(updateCategory({ id: initialValues.id, dto, token })).unwrap();
        toast({ title: 'Success', description: 'Category updated successfully' });
      } else {
        await dispatch(createCategory({ dto, token })).unwrap();
        toast({ title: 'Success', description: 'Category added successfully' });
        resetForm();
      }

      if (onSubmit) onSubmit();
    } catch (err) {
      toast({ 
        title: 'Error', 
        description: err || `Failed to ${isEditing ? 'update' : 'add'} category`, 
        variant: 'destructive' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className="space-y-4 py-2 pr-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">Category Name</label>
            <Field
              as={Input}
              id="name"
              name="name"
              placeholder="Enter category name"
              className={touched.name && errors.name ? 'border-red-300' : ''}
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <Field
              as={Textarea}
              id="description"
              name="description"
              placeholder="Enter category description"
              rows={3}
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditing ? 'Updating...' : 'Adding...'}
                </span>
              ) : (
                isEditing ? 'Update Category' : 'Add Category'
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;