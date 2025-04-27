import { render, screen } from '@testing-library/react'

import RootLayout from '@/app/layout'

describe('Компонент RootLayout', () => {
  it('Отображает переданные children', () => {
    render(
      <RootLayout>
        <div>Тестовый контент</div>
      </RootLayout>,
    )

    expect(screen.getByText('Тестовый контент')).toBeInTheDocument()
  })

  it('Рендерится без ошибок', () => {
    render(
      <RootLayout>
        <div>Контент без проверки классов</div>
      </RootLayout>,
    )
  })
})
