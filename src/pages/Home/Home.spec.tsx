import { useContext } from 'react'
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { vi } from 'vitest'

import { Home } from './'

const cycle = {
  minutesAmount: 1,
  startDate: new Date(),
  task: 'Test Task',
  id: '1',
}

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...(actual as any),
    useContext: vi.fn().mockReturnValue({
      activeCycle: {
        minutesAmount: 1,
        startDate: new Date(),
        task: 'Test Task',
        id: '1',
      },
      activeCycleId: '1',
      amountSecondsPassed: 1,
      createNewCycle: vi.fn(),
      interruptCurrentCycle: vi.fn(),
    }),
  }
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('<Home/>', () => {
  it('should render a component', () => {
    const useContextMock = vi.mocked(useContext)
    useContextMock.mockReturnValue({
      activeCycle: null,
    })
    render(<Home />)
    expect(screen.getByText('Começar')).toBeInTheDocument()
  })

  it('should render interrupt button when cycle start', () => {
    const useContextMock = vi.mocked(useContext)
    useContextMock.mockReturnValue({
      activeCycle: cycle,
      activeCycleId: '1',
      amountSecondsPassed: 1,
      createNewCycle: vi.fn(),
      interruptCurrentCycle: vi.fn(),
    })
    render(<Home />)
    expect(screen.getByText('Interromper')).toBeInTheDocument()
  })

  test('should submit form', async () => {
    const useContextMock = vi.mocked(useContext)
    const createNewCycleMock = vi.fn()

    useContextMock.mockReturnValue({
      activeCycle: null,
      activeCycleId: null,
      amountSecondsPassed: 0,

      createNewCycle: createNewCycleMock,
      interruptCurrentCycle: vi.fn(),
    })

    render(<Home />)

    const inputTask = screen.getByLabelText('Vou trabalhar em')
    await fireEvent.change(inputTask, { target: { value: 'Meu valor' } })
    expect(inputTask).toHaveValue('Meu valor')

    const inputMinutes = screen.getByLabelText('durante')
    await fireEvent.change(inputMinutes, { target: { value: '5' } })
    expect(inputMinutes).toHaveValue(5)

    const buttonSubmit = screen.getByRole('button')
    await fireEvent.submit(buttonSubmit)

    expect(createNewCycleMock).toBeCalled()
  })
})
