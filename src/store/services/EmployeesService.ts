import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { EmployeesTypes } from '@/types/EmployeesTypes'

export const employeesAPI = createApi({
  reducerPath: 'employeesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Employees'],
  endpoints: (build) => ({
    getEmployees: build.query<EmployeesTypes[], string>({
      query: () => ({
        url: '/employees',
        params: {},
      }),
      providesTags: (result) => ['Employees'],
    }),

    getEmployeeById: build.query<EmployeesTypes, number>({
      query: (id) => `/employees/${id}`,
    }),

    createEmployee: build.mutation<EmployeesTypes, EmployeesTypes>({
      query: (employee) => ({
        url: '/employees',
        method: 'POST',
        body: employee,
      }),
      invalidatesTags: ['Employees'],
    }),

    editEmployee: build.mutation<EmployeesTypes, EmployeesTypes>({
      query: (employee) => ({
        url: `/employees/${employee.id}`,
        method: 'PUT',
        body: employee,
      }),
      invalidatesTags: ['Employees'],
    }),

    deleteEmployee: build.mutation<EmployeesTypes, number>({
      query: (employeeId) => ({
        url: `/employees/${employeeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employees'],
    }),
  }),
})
