'use client'

import { Provider } from 'react-redux'

import { setupStore } from '@/store/store'

const store = setupStore()

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
