import React, { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  label?: string
  name: string
  placeholder?: string
  type?: string
  error?: FieldError
}

export const InputField = forwardRef<HTMLInputElement, Props>(({
  label,
  name,
  type = 'text',
  error,
  placeholder,
  ...rest
}, ref) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#4b5563]">
        {label}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
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
