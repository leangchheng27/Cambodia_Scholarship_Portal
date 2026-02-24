import { useState } from 'react';

/**
 * Custom hook for form validation
 * Can be extended to include more validation rules
 */
const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const validate = (rules) => {
    const newErrors = {};
    
    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = values[field];

      if (rule.required && !value) {
        newErrors[field] = `${field} is required`;
      }

      if (rule.minLength && value.length < rule.minLength) {
        newErrors[field] = `${field} must be at least ${rule.minLength} characters`;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = rule.message || `${field} is invalid`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    reset,
    setValues
  };
};

export default useFormValidation;
