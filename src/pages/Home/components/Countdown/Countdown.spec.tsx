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

afterEach(() => {
  vi.clearAllMocks()
})

vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return { ...(actual as any), useContext: vi.fn() }
})

vi.mock('date-fns', async () => {
  const actual = await vi.importActual('date-fns')
  return { ...(actual as any), differenceInSeconds: vi.fn() }
})

test('displays the correct time on start cycle', () => {
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

test('displays the correct time when not start cycle', () => {
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

test('displays the correct time when finished', () => {
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

// test('updates the document title', () => {
//   render(<Countdown />)
//   const pageTitle = document.title
//   expect(pageTitle).toMatch(/^[0-9]{2}:[0-9]{2} - Test Task \| Ignite Timer$/)
// })

// test('calls markCurrentCycleAsFinished when the cycle is finished', () => {
//   render(<Countdown />)
//   vi.advanceTimersByTime(25 * 60 * 1000)
//   expect(contextValues.markCurrentCycleAsFinished).toHaveBeenCalledTimes(1)
// })

// test('calls setSecondsPassed with the correct value', () => {
//   render(<Countdown />)
//   vi.advanceTimersByTime(10 * 1000)
//   expect(contextValues.setSecondsPassed).toHaveBeenCalledWith(10)
// })
