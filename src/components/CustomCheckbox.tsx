import React from 'react'

interface Props {
  isSelected: boolean
  onSelect: (isSelected: boolean) => void
}

const CustomCheckbox: React.FC<Props> = ({
  isSelected,
  onSelect,
}) => {
  return (
    <input
      type="checkbox"
      checked={isSelected}
      onChange={(e) => onSelect(e.target.checked)}
      className="w-5 h-5 accent-blue-600 rounded border-gray-300 shadow-sm cursor-pointer transition-colors duration-200"
    />
  )
}

export default CustomCheckbox
