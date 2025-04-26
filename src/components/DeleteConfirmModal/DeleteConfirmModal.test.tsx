import { render, screen, fireEvent } from '@testing-library/react'

import DeleteConfirmModal from './DeleteConfirmModal'

describe('DeleteConfirmModal', () => {
  const onCloseMock = jest.fn()
  const onDeleteMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('должен отображать заголовок и кнопки, когда модалка открыта', () => {
    render(
      <DeleteConfirmModal
        isOpen={true}
        onClose={onCloseMock}
        onDelete={onDeleteMock}
      />,
    )

    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('должен вызывать onClose при клике на кнопку Cancel', () => {
    render(
      <DeleteConfirmModal
        isOpen={true}
        onClose={onCloseMock}
        onDelete={onDeleteMock}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  it('должен вызывать onDelete при клике на кнопку Delete', () => {
    render(
      <DeleteConfirmModal
        isOpen={true}
        onClose={onCloseMock}
        onDelete={onDeleteMock}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDeleteMock).toHaveBeenCalledTimes(1)
  })

  it('не должен отображаться, когда модалка закрыта', () => {
    render(
      <DeleteConfirmModal
        isOpen={false}
        onClose={onCloseMock}
        onDelete={onDeleteMock}
      />,
    )

    expect(screen.queryByText(/are you sure you want to delete/i)).not.toBeInTheDocument()
  })
})
