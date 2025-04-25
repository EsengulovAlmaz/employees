import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { EmployeesTypes } from '@/types/EmployeesTypes'

interface EmployeesState {
  selectedEmployees: number[],
  editingEmployee: EmployeesTypes | null,
}

const initialState: EmployeesState = {
  selectedEmployees: [],
  editingEmployee: null,
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
  },
})

export default employeesSlice.reducer
