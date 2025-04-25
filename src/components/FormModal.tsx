import React from 'react'
import { useForm } from 'react-hook-form'

import { employeesAPI } from '@/store/services/EmployeesService'
import { EmployeesTypes } from '@/types/EmployeesTypes'
import EmployeesRules from '@/utils/validate'

import Button from './Button'
import { InputField } from './InputField'
import ModalWrapper from './ModalWrapper'

interface Props {
  title: string
  isOpen: boolean
  btnTitle?: string
  onClose: () => void
  onSubmit: (employee: EmployeesTypes) => void
  defaultValues?: EmployeesTypes | null
}

const FormModal: React.FC<Props> = ({
  title,
  isOpen,
  btnTitle = 'Add',
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeesTypes>({ defaultValues: defaultValues || {} })

  const onCloseModal = () => {
    reset()
    onClose()
  }

  const onClickSubmit = (body: EmployeesTypes) => {
    onSubmit(body)
    onCloseModal()
  }

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  return (
    <ModalWrapper isOpen={isOpen} onClose={onCloseModal}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-xl font-semibold mb-4">{title}</h2>

        <form onSubmit={handleSubmit(onClickSubmit)}>
          <InputField
            label="Name"
            {...register('name', EmployeesRules.name)}
            error={errors.name}
          />
          <InputField
            label="Email"
            type="email"
            {...register('email', EmployeesRules.email)}
            error={errors.email}
          />
          <InputField
            label="Age"
            type="number"
            {...register('age', EmployeesRules.age)}
            error={errors.age}
          />
          <InputField
            label="Position"
            {...register('position', EmployeesRules.position)}
            error={errors.position}
          />
          <InputField
            label="Department"
            {...register('department', EmployeesRules.department)}
            error={errors.department}
          />

          <div className="flex justify-end mt-4">
            <Button
              title="Close"
              onClick={onCloseModal}
              className="w-full px-4 py-2 bg-[#d1d5db] text-[#374151] rounded-md mr-2"
            />

            <Button
              title={btnTitle}
              className="w-full px-4 py-2 bg-[#4f46e5] text-white rounded-md"
            />
          </div>
        </form>
      </div>
    </ModalWrapper>
  )
}

export default FormModal
