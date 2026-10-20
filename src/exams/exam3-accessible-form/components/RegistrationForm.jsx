import { useRef, useState } from 'react';
import FormField from './FormField.jsx';
import { validate, FIELD_ORDER } from '../validation.js';

export default function RegistrationForm({ onSuccess }) {
  // Render-driven values live in state.
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Refs: DOM nodes, plus a value that must NOT cause a render.
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const previousEmailRef = useRef('');
  const inputRefs = { name: nameRef, email: emailRef, password: passwordRef };

  const handleChange = (field) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      inputRefs[firstInvalid].current.focus(); // DOM access inside an event handler
      return;
    }

    const email = values.email.trim();
    // Read the ref inside the handler (allowed), then hand the value to state for display.
    onSuccess({ name: values.name.trim(), email, previousEmail: previousEmailRef.current });
    previousEmailRef.current = email; // mutation does not schedule a render
    setValues({ name: '', email: '', password: '' });
    nameRef.current.focus();
  };

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate aria-labelledby="form-h">
      <h2 id="form-h">Registration</h2>
      <FormField ref={nameRef} id="name" label="Name" value={values.name} onChange={handleChange('name')} error={errors.name} autoComplete="name" />
      <FormField ref={emailRef} id="email" label="Email" type="email" value={values.email} onChange={handleChange('email')} error={errors.email} autoComplete="email" />
      <FormField ref={passwordRef} id="password" label="Password" type="password" value={values.password} onChange={handleChange('password')} error={errors.password} autoComplete="new-password" />
      <button className="btn btn--green" type="submit">Register</button>
    </form>
  );
}
