import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { History } from '.'
import { Cycle } from '../../reducers/cycles/reducer'
import { useContext } from 'react'

vi.mock('react')

interface CyclesContext {
  cycles: Cycle[]
}

describe('<History/>', () => {
  it('should render a component', () => {
    const cycles: CyclesContext = {
      cycles: [],
    }

    const useContextMocked = vi.mocked(useContext)
    useContextMocked.mockReturnValueOnce(cycles)

    render(<History />)

    expect(screen.getByText('Tarefa')).toBeInTheDocument()
  })

  it('should a render success message when finished time', () => {
    const cycleFinishedTime: CyclesContext = {
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate: new Date(),
          task: 'fake-finish-task',
          finishedDate: new Date(),
        },
      ],
    }
    const useContextMocked = vi.mocked(useContext)
    useContextMocked.mockReturnValueOnce(cycleFinishedTime)

    render(<History />)

    expect(screen.getByText('Concluído')).toBeInTheDocument()
  })

  it('should a render interrupt message when cancel time', () => {
    const cycleInterruptTime: CyclesContext = {
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate: new Date(),
          task: 'fake-finish-task',
          interruptedDate: new Date(),
        },
      ],
    }
    const useContextMocked = vi.mocked(useContext)
    useContextMocked.mockReturnValueOnce(cycleInterruptTime)

    render(<History />)

    expect(screen.getByText('Interrompido')).toBeInTheDocument()
  })

  it('should a render in progress message when current time', () => {
    const cycleProgressTime: CyclesContext = {
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate: new Date(),
          task: 'fake-finish-task',
        },
      ],
    }
    const useContextMocked = vi.mocked(useContext)
    useContextMocked.mockReturnValueOnce(cycleProgressTime)

    render(<History />)

    expect(screen.getByText('Em andamento')).toBeInTheDocument()
  })
})
