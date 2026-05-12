import type { ChangeEvent } from "react";

export interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  rows?: number;
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  "data-testid"?: string;
}

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none";

export function FormField({
  label,
  name,
  type = "text",
  required = false,
  rows = 5,
  id,
  value,
  onChange,
  "data-testid": dataTestId,
}: Readonly<FormFieldProps>) {
  const fieldId = id || name;

  return (
    <div>
      <label className="mb-2 block" htmlFor={fieldId}>
        {label}
        {required && <span className="text-accent">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          className={`${inputClasses} resize-none`}
          data-testid={dataTestId}
          id={fieldId}
          name={name}
          onChange={onChange}
          required={required}
          rows={rows}
          value={value}
        />
      ) : (
        <input
          className={inputClasses}
          data-testid={dataTestId}
          id={fieldId}
          name={name}
          onChange={onChange}
          required={required}
          type={type}
          value={value}
        />
      )}
    </div>
  );
}
