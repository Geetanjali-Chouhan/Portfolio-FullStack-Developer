/** Shared by the contact form (client) and /api/contact (server). */
export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 2000 },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < LIMITS.name.min)
    errors.name = `Name must be at least ${LIMITS.name.min} characters.`;
  else if (name.length > LIMITS.name.max)
    errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email.max || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";

  if (!subject) errors.subject = "Please add a subject.";
  else if (subject.length < LIMITS.subject.min)
    errors.subject = `Subject must be at least ${LIMITS.subject.min} characters.`;
  else if (subject.length > LIMITS.subject.max)
    errors.subject = `Subject must be ${LIMITS.subject.max} characters or fewer.`;

  if (!message) errors.message = "Please write a message.";
  else if (message.length < LIMITS.message.min)
    errors.message = `Message must be at least ${LIMITS.message.min} characters.`;
  else if (message.length > LIMITS.message.max)
    errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`;

  return errors;
}
