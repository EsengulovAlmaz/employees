'use client'

import React from 'react'

import { TABLE_HEADERS } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { employeesSlice } from '@/store/reducers/EmployeeSlice'
import { employeesAPI } from '@/store/services/EmployeesService'

import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import EmployeeItem from '../EmployeeItem/EmployeeItem'

const EmployeesList = () => {
  const { selectedEmployees, filter } = useAppSelector(state => state.employeesReducer)
  const { data: employees , error, isLoading } = employeesAPI.useGetEmployeesQuery(filter)
  const { setSelectedEmployees } = employeesSlice.actions
  const dispatch = useAppDispatch()

  const onSelectEmployee = (employeeId: number, isSelected: boolean) => {
    dispatch(setSelectedEmployees(isSelected ? [...selectedEmployees, employeeId] : selectedEmployees.filter(id => id !== employeeId)))
  }

  const handleSelectAll = React.useCallback((isChecked: boolean) => {
    if (isChecked) {
      if (employees) {
        dispatch(setSelectedEmployees(employees.map(employee => employee.id)))
      }
    } else {
      dispatch(setSelectedEmployees([]))
    }
  }, [employees])

  if (isLoading) return <div className="h-[80vh] flex justify-center items-center text-black">Loading...</div>
  if (error) return <div className="text-center py-10 text-[#ff0000]">Error</div>

  return (
    <div className="overflow-x-auto max-h-[80vh]">
      <table className="min-w-full divide-y divide-[#eae8e8] text-sm text-[#4b5563]">
        <thead className="bg-white sticky top-0 z-10">
          <tr>
            <th className="py-4 text-left">
              <CustomCheckbox isSelected={selectedEmployees.length === employees?.length} onSelect={handleSelectAll} />
            </th>

            {
              TABLE_HEADERS?.map((title) => (
                <th key={title} className="px-6 py-3 text-left font-semibold text-[#111827] border-r border-[#eae8e8] last:border-none">
                  {title}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f3f4f6]">
          {employees?.length === 0 && (
            <tr>
              <td colSpan={TABLE_HEADERS.length} className="px-6 py-10 text-center text-[#6b7280]">
                No employees available
              </td>
            </tr>
          )}

          {
            employees?.map((employee) => (
              <EmployeeItem
                key={employee.id}
                isSelected={!!selectedEmployees.includes(employee.id)}
                onSelect={(isSelected) => onSelectEmployee(employee.id, isSelected)}
                {...employee}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default EmployeesList
