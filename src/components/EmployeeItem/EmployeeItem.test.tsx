import { Provider } from 'react-redux'

import { render, screen, fireEvent } from '@testing-library/react'

import { setupStore } from '@/store/store'
import { EmployeesTypes } from '@/types/EmployeesTypes'

import EmployeeItem from './EmployeeItem'

const store = setupStore()

const mockEmployee: EmployeesTypes = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 30,
  position: 'Developer',
  department: 'Engineering',
}

describe('EmployeeItem', () => {
  const onSelectMock = jest.fn()

  const renderComponent = (isSelected = false) => {
    return render(
      <Provider store={store}>
        <table>
          <tbody>
            <EmployeeItem {...mockEmployee} isSelected={isSelected} onSelect={onSelectMock} />
          </tbody>
        </table>
      </Provider>,
    )
  }

  it('должен отобразить данные сотрудника', () => {
    renderComponent()

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Engineering')).toBeInTheDocument()
  })

  it('должен вызывать onSelect при клике на чекбокс', () => {
    renderComponent()

    const checkbox = screen.getByRole('checkbox')

    fireEvent.click(checkbox)

    expect(onSelectMock).toHaveBeenCalledTimes(1)
  })

  it('должен открывать модалку редактирования при клике на Edit', () => {
    renderComponent()

    const editButton = screen.getByRole('button', { name: /edit/i })

    fireEvent.click(editButton)

    expect(screen.getByText(/edit employee/i)).toBeInTheDocument()
  })

  it('должен открывать модалку удаления при клике на Delete', () => {
    renderComponent()

    const deleteButton = screen.getByRole('button', { name: /delete/i })

    fireEvent.click(deleteButton)

    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument()
  })
})
