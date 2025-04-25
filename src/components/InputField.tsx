import React, { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

type InputFieldProps = {
  label: string
  name: string
  type?: string
  error?: FieldError
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  label,
  name,
  type = 'text',
  error,
  ...rest
}, ref) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-[#4b5563]">
        {label}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        ref={ref}
        {...rest}
        className="mt-1 block w-full px-4 py-2 border border-[#d1d5db] rounded-md shadow-sm focus:ring-[#6366f1] focus:border-[#6366f1]"
      />

      {error && (
        <p className="text-[#ef4444] text-sm mt-1">{error.message}</p>
      )}
    </div>
  )
},
)
