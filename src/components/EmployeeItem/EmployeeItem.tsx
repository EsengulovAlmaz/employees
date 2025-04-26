import React from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useDisclosure } from '@/hooks/useDisclosure'
import { employeesSlice } from '@/store/reducers/EmployeeSlice'
import { employeesAPI } from '@/store/services/EmployeesService'
import { EmployeesTypes } from '@/types/EmployeesTypes'

import Button from '../Button/Button'
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal'
import FormModal from '../FormModal/FormModal'

interface Props extends EmployeesTypes {
  isSelected: boolean
  onSelect: (isSelected: boolean) => void
}

const EmployeeItem: React.FC<Props> = ({
  id,
  name,
  email,
  age,
  position,
  department,
  isSelected,
  onSelect,
}) => {
  const [deleteEmployee] = employeesAPI.useDeleteEmployeeMutation()
  const [editEmployee] = employeesAPI.useEditEmployeeMutation()
  const { editingEmployee } = useAppSelector(state => state.employeesReducer)
  const { setEditingEmployee } = employeesSlice.actions

  const EditModal = useDisclosure()
  const DeleteModal = useDisclosure()
  const dispatch = useAppDispatch()

  const onOpenEdit = (employee: EmployeesTypes) => {
    dispatch(setEditingEmployee(employee))
    EditModal.onOpen()
  }

  const onDeleteEmployee = (employeeId: number) => {
    deleteEmployee(employeeId)
  }

  const onEditEmployee = async (employee: EmployeesTypes) => {
    await editEmployee(employee)
  }

  return (
    <tr className="bg-white">
      <td className="py-4 text-left">
        <CustomCheckbox isSelected={isSelected} onSelect={onSelect} />
      </td>

      <td className="px-6 py-4 font-medium text-[#111827] border-r border-[#f3f4f6]">{name}</td>
      <td className="px-6 py-4 border-r border-[#f3f4f6]">{email}</td>
      <td className="px-6 py-4 border-r border-[#f3f4f6]">{age}</td>
      <td className="px-6 py-4 border-r border-[#f3f4f6]">{position}</td>
      <td className="px-6 py-4 border-r border-[#f3f4f6]">{department}</td>
      <td className="max-w-[50px] px-6 py-4 border-r-0">
        <Button
          title="Edit"
          onClick={() => onOpenEdit({ id, name, email, age, position, department })}
          className="w-1/2 text-[#2563eb] hover:text-[#1e40af]"
        />

        <Button
          title="Delete"
          onClick={DeleteModal.onOpen}
          className="w-1/2 text-[#dc2626] hover:text-[#991b1b]"
        />

        <FormModal
          title="Edit employee"
          isOpen={EditModal.isOpen}
          btnTitle="Save"
          onClose={EditModal.onClose}
          onSubmit={onEditEmployee}
          defaultValues={editingEmployee}
        />

        <DeleteConfirmModal
          isOpen={DeleteModal.isOpen}
          onClose={DeleteModal.onClose}
          onDelete={() => onDeleteEmployee(id)}
        />
      </td>
    </tr>
  )
}

export default EmployeeItem
