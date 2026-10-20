import { forwardRef } from 'react';

// forwardRef lets the parent attach a ref to the real <input>.
const FormField = forwardRef(function FormField(
  { id, label, type = 'text', value, onChange, error, autoComplete },
  ref
) {
  const errorId = `${id}-error`;
  return (
    <div className="field-group">
      <label className="label" htmlFor={id}>{label}</label>
      <input
        ref={ref}
        id={id}
        name={id}
        type={type}
        className="field"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId} className="field-error" role="alert">{error}</p>}
    </div>
  );
});

export default FormField;
