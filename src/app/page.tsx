'use client'

import React from 'react'

import Button from '@/components/Button/Button'
import DeleteConfirmModal from '@/components/DeleteConfirmModal/DeleteConfirmModal'
import EmployeesList from '@/components/EmployeesList/EmployeesList'
import Filter from '@/components/Filter/Filter'
import FormModal from '@/components/FormModal/FormModal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useDisclosure } from '@/hooks/useDisclosure'
import { employeesSlice } from '@/store/reducers/EmployeeSlice'
import { employeesAPI } from '@/store/services/EmployeesService'

export default function Home() {
  const [createEmployee] = employeesAPI.useCreateEmployeeMutation()
  const [deleteEmployee] = employeesAPI.useDeleteEmployeeMutation()
  const { selectedEmployees } = useAppSelector(state => state.employeesReducer)
  const { setSelectedEmployees } = employeesSlice.actions

  const dispatch = useAppDispatch()
  const createModal = useDisclosure()
  const deleteModal = useDisclosure()

  const deleteSelectedEmployees = async () => {
    if (!selectedEmployees?.length) return

    try {
      await Promise.all(
        selectedEmployees.map(id =>
          deleteEmployee(id).unwrap(),
        ),
      )

      dispatch(setSelectedEmployees([]))
      deleteModal.onClose()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Employees</h2>

        <div>
          <Button
            title="Add"
            onClick={createModal.onOpen}
            className="bg-[#136cb6] hover:bg-[#808080] text-white text-sm font-medium"
          />

          <Button
            title="Delete"
            disabled={!selectedEmployees.length}
            onClick={deleteModal.onOpen}
            className="bg-[#f84b4b] hover:bg-[#808080] text-white text-sm font-medium ml-2"
          />
        </div>
      </div>

      <Filter />

      <EmployeesList />

      <FormModal
        title="Add employee"
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
        onSubmit={createEmployee}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onDelete={deleteSelectedEmployees}
      />
    </div>
  )
}
