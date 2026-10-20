# Exam 3 - Accessible Form Toolkit (useRef + useState)

## Run
```bash
npm install
npm run dev
```

## Completed requirements
| Requirement | Status | Where |
|---|---|---|
| Name, email, password controlled by state | Done | `RegistrationForm.jsx` |
| Refs for the three inputs attached with `ref` | Done | `FormField.jsx` (forwardRef) |
| Validation: required name, valid email, 8-character password | Done | `src/validation.js` |
| Focus first invalid field in order name, email, password | Done | `handleSubmit` |
| Previous submitted email tracked without a render | Done | `previousEmailRef` |
| Debugging case ref vs state | Done | visible data is in state, refs only for DOM and previous email (explained below) |

## How it works
- Visible values live in state. Refs are used only for DOM access (focus) and the previous email.
- Refs are read and written only inside the submit handler, never during render.
- On success, the handler reads `previousEmailRef.current`, passes it up as part of the submission (state, so it is displayed), then overwrites the ref with the new email. The ref write itself triggers no render.
- Errors use `aria-invalid`, `aria-describedby` and `role="alert"`.

## Required debugging case
Displaying `clicks.current` does not update because assigning to `ref.current` is a plain JavaScript mutation. React is not notified, so no render is scheduled and the old output stays on screen (the value is correct, only the display is stale). Visible data belongs in state: `setClicks(c => c + 1)` schedules a render.

## Test steps
1. Submit empty: three messages appear and focus lands on Name.
2. Fill Name only, submit: focus lands on Email. Enter "abc" as email: message asks for a valid structure.
3. Valid name and email, 5-character password: focus lands on Password.
4. Submit valid data (e.g. a@x.com): log shows "Previous submitted email: None yet".
5. Submit again with b@x.com: log shows previous email a@x.com.

## Known limitations
- No server call. Submission is stored in component state only and the password is never displayed or stored.
- The previous email resets on page reload (ref lives for the component's lifetime).
