# Multi-Step Onboarding Form

This directory contains the onboarding feature for the POS system.

## Components

### `Onboarding.jsx`
Main wrapper component that manages the multi-step form state and navigation.

**Features:**
- Step progress indicator
- Form data management
- Redux integration
- Fade transitions between steps
- Error handling

### `OwnerDetailsForm.jsx`
Step 1 form component for collecting owner credentials.

**Fields:**
- Full Name (required, min 2 characters)
- Email (required, valid email format)
- Password (required, min 6 characters)
- Confirm Password (required, must match password)

### `StoreDetailsForm.jsx`
Step 2 form component for collecting store information.

**Fields:**
- Store Name (required, min 2 characters)
- Store Type (required, dropdown selection)
- Store Address (optional, textarea)

## Redux Integration

### `onboardingSlice.js`
Manages onboarding state including:
- Loading state
- Error handling
- Completion status
- User data

### `onboardingThunk.js`
Handles API calls for completing the onboarding process.

## Usage

Navigate to `/onboarding` to access the onboarding form.

## API Endpoint

The form submits to `/onboarding/complete` endpoint with the following structure:

```javascript
{
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string,
  storeName: string,
  storeType: string,
  storeAddress: string (optional)
}
```

## Validation

- Formik for form handling
- Yup for validation schemas
- Real-time validation feedback
- Step-by-step validation before proceeding

## UI Features

- Responsive design
- Progress indicator
- Smooth transitions
- Error display
- Loading states
- Modern card-based layout 