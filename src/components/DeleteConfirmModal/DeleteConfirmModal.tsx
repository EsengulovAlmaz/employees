import React from 'react'

import Button from '../Button/Button'
import ModalWrapper from '../ModalWrapper/ModalWrapper'

interface Props {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h2>

        <div className="flex justify-end mt-4">
          <Button
            title="Cancel"
            onClick={onClose}
            className="w-1/2 px-4 py-2 bg-[#0a67f3] text-white rounded-md mr-2"
          />
          <Button
            title="Delete"
            onClick={onDelete}
            className="w-1/2 px-4 py-2 bg-[#dc2626] text-white rounded-md"
          />
        </div>
      </div>
    </ModalWrapper>
  )
}

export default DeleteConfirmModal
