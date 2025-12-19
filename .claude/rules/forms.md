---
paths: components/forms/**/*.tsx, app/**/page.tsx
---

# Form Implementation Patterns - BMAsia

## Tech Stack
- **React Hook Form**: Form state management
- **Formspree**: Backend handling (sends to email)
- **Zod** (optional): Schema validation

## Formspree Setup

### Basic Integration
```tsx
'use client';

import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await fetch(
      `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_INQUIRY_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      reset();
      // Show success message
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Form Fields

### Text Input
```tsx
<div className="space-y-2">
  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
    Name <span className="text-[#EFA634]">*</span>
  </label>
  <input
    id="name"
    type="text"
    {...register('name', { required: 'Name is required' })}
    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EFA634] focus:border-transparent"
    placeholder="Your name"
    aria-describedby={errors.name ? 'name-error' : undefined}
  />
  {errors.name && (
    <p id="name-error" className="text-red-400 text-sm" role="alert">
      {errors.name.message}
    </p>
  )}
</div>
```

### Email Input
```tsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
    Email <span className="text-[#EFA634]">*</span>
  </label>
  <input
    id="email"
    type="email"
    {...register('email', {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address',
      },
    })}
    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EFA634] focus:border-transparent"
    placeholder="you@company.com"
  />
  {errors.email && (
    <p className="text-red-400 text-sm" role="alert">
      {errors.email.message}
    </p>
  )}
</div>
```

### Textarea
```tsx
<div className="space-y-2">
  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
    Message <span className="text-[#EFA634]">*</span>
  </label>
  <textarea
    id="message"
    rows={4}
    {...register('message', { required: 'Message is required' })}
    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EFA634] focus:border-transparent resize-none"
    placeholder="Tell us about your project..."
  />
</div>
```

### Select Dropdown
```tsx
<div className="space-y-2">
  <label htmlFor="solution" className="block text-sm font-medium text-gray-300">
    Preferred Solution <span className="text-[#EFA634]">*</span>
  </label>
  <select
    id="solution"
    {...register('solution', { required: 'Please select a solution' })}
    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#EFA634] focus:border-transparent"
  >
    <option value="" className="bg-[#1a1a2e]">Select an option</option>
    <option value="soundtrack" className="bg-[#1a1a2e]">Soundtrack Your Brand</option>
    <option value="beatbreeze" className="bg-[#1a1a2e]">Beat Breeze</option>
    <option value="unsure" className="bg-[#1a1a2e]">Not Sure Yet</option>
  </select>
</div>
```

### Number Input
```tsx
<div className="space-y-2">
  <label htmlFor="zones" className="block text-sm font-medium text-gray-300">
    Number of Zones <span className="text-[#EFA634]">*</span>
  </label>
  <input
    id="zones"
    type="number"
    min="1"
    {...register('zones', {
      required: 'Number of zones is required',
      min: { value: 1, message: 'Must be at least 1' },
    })}
    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#EFA634] focus:border-transparent"
    placeholder="1"
  />
</div>
```

## Submit Button
```tsx
<button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-[#EFA634] hover:bg-[#d99530] disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
>
  {isSubmitting ? (
    <>
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Sending...
    </>
  ) : (
    'Send Message'
  )}
</button>
```

## Success/Error States
```tsx
const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

// After form submission
{status === 'success' && (
  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400">
    Thank you! We'll be in touch soon.
  </div>
)}

{status === 'error' && (
  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
    Something went wrong. Please try again.
  </div>
)}
```

## Accessibility Checklist
- [ ] All inputs have associated labels (htmlFor/id)
- [ ] Required fields marked with asterisk and aria-required
- [ ] Error messages linked with aria-describedby
- [ ] Error messages have role="alert"
- [ ] Submit button has disabled state during submission
- [ ] Focus states visible (ring-2)
- [ ] Tab order is logical
