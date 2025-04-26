import { render, screen, fireEvent } from '@testing-library/react'

import ModalWrapper from './ModalWrapper'

describe('ModalWrapper', () => {
  it('renders modal when isOpen is true', () => {
    render(
      <ModalWrapper isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </ModalWrapper>,
    )

    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('does not render modal when isOpen is false', () => {
    render(
      <ModalWrapper isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </ModalWrapper>,
    )

    expect(screen.queryByText('Modal Content')).toBeNull()
  })

  it('calls onClose when clicking on the background', () => {
    const onClose = jest.fn()

    render(
      <ModalWrapper isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </ModalWrapper>,
    )

    const backdrop = screen.getByRole('dialog')

    fireEvent.click(backdrop)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onClose when clicking inside the modal content', () => {
    const onClose = jest.fn()

    render(
      <ModalWrapper isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </ModalWrapper>,
    )

    const modalContent = screen.getByText('Modal Content')

    fireEvent.click(modalContent)

    expect(onClose).not.toHaveBeenCalled()
  })
})
