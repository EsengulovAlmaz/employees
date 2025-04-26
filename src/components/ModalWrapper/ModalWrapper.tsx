import React from 'react'

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-gray-800/75 flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
