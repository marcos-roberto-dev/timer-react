import { useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { NewCycleForm } from './'

const cycle = {
  minutesAmount: 1,
  startDate: new Date(),
  task: 'Test Task',
  id: '1',
}

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return { ...(actual as any), useContext: vi.fn() }
})

vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form')
  return {
    ...(actual as any),
    useFormContext: () => ({
      register: () => ({}),
    }),
  }
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('<NewCycleForm/>', () => {
  it('should render a component', () => {
    const useContextMock = vi.mocked(useContext)
    useContextMock.mockReturnValueOnce({
      activeCycle: cycle,
    })

    render(<NewCycleForm />)

    expect(screen.getByText('Vou trabalhar em')).toBeInTheDocument()
  })
})
