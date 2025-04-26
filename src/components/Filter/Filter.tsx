import React from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/hooks/redux'
import { employeesSlice } from '@/store/reducers/EmployeeSlice'
import { EmployeesTypes } from '@/types/EmployeesTypes'
import { convertToRecord } from '@/utils/convertToRecord'

import Button from '../Button/Button'
import { InputField } from '../InputField/InputField'

const Filter = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const { setFilter } = employeesSlice.actions
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeesTypes>()

  const onSubmit = (data: EmployeesTypes) => {
    const recordData = convertToRecord(data)

    dispatch(setFilter(recordData))
  }

  const handleReset = () => {
    reset()
    dispatch(setFilter({}))
  }

  return (
    <div className="w-full">
      <Button
        title={isOpen ? 'Close filter' : 'Open filter'}
        className="mb-6 px-4 py-2 bg-[#136cb6] text-white rounded"
        onClick={() => setIsOpen(prev => !prev)}
      />

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6 min-w-[900px]"
        >
          <InputField label="ID" {...register('id')} error={errors.id} />
          <InputField label="Name" {...register('name')} error={errors.name} />
          <InputField label="Email" {...register('email')} error={errors.email} />
          <InputField label="Age" {...register('age')} error={errors.age} />
          <InputField label="Position" {...register('position')} error={errors.position} />
          <InputField label="Department" {...register('department')} error={errors.department} />

          <div>
            <Button
              title="Reset"
              type="reset"
              onClick={handleReset}
              className="w-[150px] px-4 py-2 bg-[#d1d5db] text-[#374151] rounded-md mr-2"
            />
            <Button
              title="Filter"
              className="w-[150px] px-4 py-2 bg-[#136cb6] text-white rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Filter
