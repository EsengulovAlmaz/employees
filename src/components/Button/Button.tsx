import React from 'react'

interface Props {
  title: string
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<Props> = ({
  title,
  className,
  disabled = false,
  onClick,
  type,
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md transition duration-200 ease-in-out ${className} ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {title}
    </button>
  )
}

export default Button
