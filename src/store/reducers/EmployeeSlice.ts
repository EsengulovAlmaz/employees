import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EmployeesTypes } from '@/types/EmployeesTypes'

interface EmployeesState {
  selectedEmployees: number[],
  editingEmployee: EmployeesTypes | null,
  filter: Record<string, string>,
}

const initialState: EmployeesState = {
  selectedEmployees: [],
  editingEmployee: null,
  filter: {},
}

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setSelectedEmployees: (state, action: PayloadAction<number[]>) => {
      state.selectedEmployees = action.payload
    },
    setEditingEmployee: (state, action: PayloadAction<EmployeesTypes | null>) => {
      state.editingEmployee = action.payload
    },
    setFilter: (state, action: PayloadAction<Record<string, string>>) => {
      state.filter = action.payload
    },
  },
})

export default employeesSlice.reducer
