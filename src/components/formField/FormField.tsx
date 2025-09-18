type FieldType = "text" | "number" | "tel" | "textarea" | "select";

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  value: string | number;
  type?: FieldType;
  placeholder?: string;
  options?: Option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormField = ({ label, name, value, type = "text", placeholder, options, onChange }: FormFieldProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name}>{label}</label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border border-gray-400 p-2 w-full bg-inputColor"
        />
      ) : type === "select" && options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="border h-8 border-gray-400 w-full bg-inputColor"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="border h-8 border-gray-400 p-2 w-full bg-inputColor"
        />
      )}
    </div>
  );
};

export default FormField;
