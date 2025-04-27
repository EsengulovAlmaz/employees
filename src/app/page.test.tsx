import { Provider } from 'react-redux'

import { render, screen, fireEvent } from '@testing-library/react'

import Home from '@/app/page'
import { setupStore } from '@/store/store'

const renderWithProviders = (ui: React.ReactElement) => {
  const store = setupStore()

  return render(<Provider store={store}>{ui}</Provider>)
}

describe('Компонент Home', () => {
  it('Отображает заголовок страницы', () => {
    renderWithProviders(<Home />)

    expect(screen.getByText(/Employees/i)).toBeInTheDocument()
  })

  it('Отображает кнопки "Добавить" и "Удалить"', () => {
    renderWithProviders(<Home />)

    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument()
  })

  it('Открывает модалку добавления сотрудника при клике на кнопку "Добавить"', () => {
    renderWithProviders(<Home />)

    const addButton = screen.getByRole('button', { name: /Add/i })

    fireEvent.click(addButton)

    expect(screen.getByText(/Add employee/i)).toBeInTheDocument()
  })

  it('Кнопка "Удалить" должна быть задизейблена, если не выбраны сотрудники', () => {
    renderWithProviders(<Home />)

    const deleteButton = screen.getByRole('button', { name: /Delete/i })

    expect(deleteButton).toBeDisabled()
  })
})
