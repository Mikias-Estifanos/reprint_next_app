'use client';

import { useState } from 'react';
import InputField from '../../components/InputField';
import SubmitButton from '../../components/SubmitButton';

export default function BrokenCardForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    finNumber: '',
    uploadImage: null as File | null,
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    finNumber: '',
    uploadImage: '',
  });

  const [loading, setLoading] = useState(false);

  const validateField = (name: string, value: string | File | null) => {
    let error = '';
    if (name === 'fullName' && !value) {
      error = 'Full Name is required.';
    } else if (name === 'phoneNumber' && !/^\d{10}$/.test(value as string)) {
      error = 'Phone Number must be a 10-digit number.';
    } else if (name === 'finNumber' && !/^\d{12}$/.test(value as string)) {
      error = 'FIN Number must be a 12-digit number.';
    } else if (name === 'uploadImage' && !value) {
      error = 'An image file is required.';
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, newValue),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = {
      fullName: validateField('fullName', formData.fullName),
      phoneNumber: validateField('phoneNumber', formData.phoneNumber),
      finNumber: validateField('finNumber', formData.finNumber),
      uploadImage: validateField('uploadImage', formData.uploadImage),
    };

    setErrors(formErrors);

    if (Object.values(formErrors).some((error) => error)) {
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('full_name', formData.fullName);
    formDataToSend.append('phone_number', formData.phoneNumber);
    formDataToSend.append('fin_number', formData.finNumber);
    if (formData.uploadImage) {
      formDataToSend.append('upload_image', formData.uploadImage);
    }

    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      alert('Error submitting form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Broken Card Form</h2>
      <p className="text-gray-600 mb-4">
        Please fill out the form below if your digital ID card is broken or partially damaged.
      </p>
      <form onSubmit={handleSubmit}>
        <InputField
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />
        <InputField
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          required
        />
        <InputField
          id="finNumber"
          name="finNumber"
          type="text"
          label="FIN Number"
          value={formData.finNumber}
          onChange={handleChange}
          error={errors.finNumber}
          pattern="[0-9]{12}"
          required
        />
        <div className="mb-4">
          <label htmlFor="uploadImage" className="block text-sm font-medium text-gray-600">
            Upload Image of the Broken Card
          </label>
          <input
            id="uploadImage"
            name="uploadImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className={`w-full mt-1 p-2 border ${
              errors.uploadImage ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.uploadImage ? 'focus:ring-red-500' : 'focus:ring-purple-500'
            }`}
            required
          />
          {errors.uploadImage && <p className="text-red-500 text-sm mt-1">{errors.uploadImage}</p>}
        </div>
        <SubmitButton loading={loading} text="Submit" />
      </form>
    </div>
  );
}
