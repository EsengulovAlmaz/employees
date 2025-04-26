import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import CustomCheckbox from './CustomCheckbox'

describe('CustomCheckbox компонент', () => {

  test('должен рендериться как input type="checkbox"', () => {
    render(<CustomCheckbox isSelected={false} onSelect={jest.fn()} />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).toBeInTheDocument()
    expect(checkboxElement).toHaveAttribute('type', 'checkbox')
  })

  test('должен быть checked, если isSelected равно true', () => {
    render(<CustomCheckbox isSelected={true} onSelect={jest.fn()} />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).toBeChecked()
  })

  test('должен быть unchecked, если isSelected равно false', () => {
    render(<CustomCheckbox isSelected={false} onSelect={jest.fn()} />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).not.toBeChecked()
  })

  test('должен вызывать onSelect с true при клике, если был unchecked', async () => {
    const user = userEvent.setup()
    const mockOnSelect = jest.fn()

    render(<CustomCheckbox isSelected={false} onSelect={mockOnSelect} />)

    const checkboxElement = screen.getByRole('checkbox')

    await user.click(checkboxElement)

    expect(mockOnSelect).toHaveBeenCalledTimes(1)
    expect(mockOnSelect).toHaveBeenCalledWith(true)
  })

  test('должен вызывать onSelect с false при клике, если был checked', async () => {
    const user = userEvent.setup()
    const mockOnSelect = jest.fn()

    render(<CustomCheckbox isSelected={true} onSelect={mockOnSelect} />)

    const checkboxElement = screen.getByRole('checkbox')

    await user.click(checkboxElement)

    expect(mockOnSelect).toHaveBeenCalledTimes(1)

    expect(mockOnSelect).toHaveBeenCalledWith(false)
  })

  test('должен применять заданные CSS классы', () => {
    render(<CustomCheckbox isSelected={false} onSelect={jest.fn()} />)

    const checkboxElement = screen.getByRole('checkbox')

    expect(checkboxElement).toHaveClass(
      'w-5',
      'h-5',
      'accent-blue-600',
      'rounded',
      'border-gray-300',
      'shadow-sm',
      'cursor-pointer',
      'transition-colors',
      'duration-200',
    )
  })
})
