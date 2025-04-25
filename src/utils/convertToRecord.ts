import { EmployeesTypes } from '@/types/EmployeesTypes'

export const convertToRecord = (data: EmployeesTypes): Record<string, string> => {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([_, value]) => value != null && value !== '')
      .map(([key, value]) => [key, String(value)]),
  )
}
