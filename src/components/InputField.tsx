interface InputFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    pattern?: string;
    required?: boolean;
  }
  
  export default function InputField({
    id,
    name,
    type,
    label,
    value,
    onChange,
    error,
    placeholder = '',
    pattern,
    required = false,
  }: InputFieldProps) {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-600">
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          pattern={pattern}
          required={required}
          className={`w-full mt-1 p-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
  