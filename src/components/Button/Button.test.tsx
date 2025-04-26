import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Button from './Button'

describe('Компонент Button', () => {
  test('должен рендериться с переданным title', () => {
    const buttonTitle = 'Нажми меня'

    render(<Button title={buttonTitle} />)

    const buttonElement = screen.getByRole('button', { name: buttonTitle })

    expect(buttonElement).toBeInTheDocument()
  })

  test('должен применять дополнительный className', () => {
    const customClass = 'my-custom-button'

    render(<Button title="Классная кнопка" className={customClass} />)

    const buttonElement = screen.getByRole('button', { name: /Классная кнопка/i })

    expect(buttonElement).toHaveClass(customClass)
    expect(buttonElement).toHaveClass('px-4', 'py-2')
  })

  test('должен вызывать onClick при нажатии, если не disabled', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<Button title="Кликабельная" onClick={handleClick} />)

    const buttonElement = screen.getByRole('button', { name: /Кликабельная/i })

    await user.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('должен быть неактивным (disabled), если передан пропс disabled=true', () => {
    render(<Button title="Неактивная" disabled={true} />)

    const buttonElement = screen.getByRole('button', { name: /Неактивная/i })

    expect(buttonElement).toBeDisabled()
    expect(buttonElement).toHaveClass('cursor-not-allowed', 'bg-gray-300')
  })

  test('не должен вызывать onClick при нажатии, если disabled', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<Button title="Неактивная" onClick={handleClick} disabled={true} />)

    const buttonElement = screen.getByRole('button', { name: /Неактивная/i })

    await user.click(buttonElement).catch(() => {})

    expect(handleClick).not.toHaveBeenCalled()
  })

  test('должен устанавливать правильный атрибут type', () => {
    const buttonType = 'submit'

    render(<Button title="Отправить" type={buttonType} />)

    const buttonElement = screen.getByRole('button', { name: /Отправить/i })

    expect(buttonElement).toHaveAttribute('type', buttonType)
  })
  test('должен иметь type="button" по умолчанию, если type не указан', () => {
    render(<Button title="Просто кнопка" />)
    const buttonElement = screen.getByRole('button', { name: /Просто кнопка/i })

    expect(buttonElement).not.toHaveAttribute('type', 'submit')
    expect(buttonElement).not.toHaveAttribute('type', 'reset')
  })
})
