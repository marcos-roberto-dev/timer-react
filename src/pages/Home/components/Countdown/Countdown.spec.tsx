import { useContext } from 'react'
import { act, render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { Countdown } from './index'
import { differenceInSeconds } from 'date-fns'

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

vi.mock('date-fns', async () => {
  const actual = await vi.importActual('date-fns')
  return { ...(actual as any), differenceInSeconds: vi.fn() }
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('<Countdown', () => {
  it('should render display the correct time on start cycle', () => {
    vi.useFakeTimers()
    const useContextMock = vi.mocked(useContext)
    useContextMock.mockReturnValueOnce({
      activeCycle: cycle,
      activeCycleId: '1',
      markCurrentCycleAsFinished: vi.fn(),
      amountSecondsPassed: 1,
      setSecondsPassed: vi.fn(),
    })

    render(<Countdown />)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.queryAllByText(/^\d{1,2}$/)[0].textContent).toBe('0')
    expect(screen.queryAllByText(/^\d{1,2}$/)[1].textContent).toBe('0')
    expect(screen.queryAllByText(/^\d{1,2}$/)[2].textContent).toBe('5')
    expect(screen.queryAllByText(/^\d{1,2}$/)[3].textContent).toBe('9')
  })

  it('should render display the correct time when not start cycle', () => {
    vi.useFakeTimers()
    const useContextMock = vi.mocked(useContext)

    useContextMock.mockReturnValueOnce({
      activeCycle: null,
      activeCycleId: undefined,
      amountSecondsPassed: 60,
      markCurrentCycleAsFinished: vi.fn(),
      setSecondsPassed: vi.fn(),
    })

    render(<Countdown />)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.queryAllByText(/^\d{1,2}$/)[0].textContent).toBe('0')
    expect(screen.queryAllByText(/^\d{1,2}$/)[1].textContent).toBe('0')
    expect(screen.queryAllByText(/^\d{1,2}$/)[2].textContent).toBe('0')
    expect(screen.queryAllByText(/^\d{1,2}$/)[3].textContent).toBe('0')
  })

  it('should render display the correct time when finished', () => {
    vi.useFakeTimers()
    const useContextMock = vi.mocked(useContext)
    const differenceInSecondsMock = vi.mocked(differenceInSeconds)

    differenceInSecondsMock.mockReturnValueOnce(60)
    useContextMock.mockReturnValueOnce({
      activeCycle: cycle,
      activeCycleId: '1',
      amountSecondsPassed: 60,
      markCurrentCycleAsFinished: vi.fn(),
      setSecondsPassed: vi.fn(),
    })

    render(<Countdown />)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.queryAllByText(/^\d{1,2}$/)[0].textContent).toBe('0')
    expect(screen.queryAllByText(/^\d{1,2}$/)[1].textContent).toBe('0')
    expect(screen.queryAllByText(/^\d{1,2}$/)[2].textContent).toBe('0')
    expect(screen.queryAllByText(/^\d{1,2}$/)[3].textContent).toBe('0')
  })
})
