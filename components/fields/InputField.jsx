import { FieldProps } from 'formik';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export const InputField = ({ field, form: _, ...props }) => {
	return <input {...field} {...props} />;
};
