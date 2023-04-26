import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cycleReducer, CycleState } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [state, dispatch] = useReducer(
    cycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    } as CycleState,
    (initialState) => {
      const storeStateAsJSON = localStorage.getItem(
        '@timer-react:cycles-state-1.0.0',
      )

      if (storeStateAsJSON) return JSON.parse(storeStateAsJSON)

      return initialState
    },
  )

  const activeCycle = state.cycles.find(
    (cycle) => cycle.id === state.activeCycleId,
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle)
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    return 0
  })

  const setLocalStorageCycle = useCallback(() => {
    const stateJSON = JSON.stringify(state)
    console.log('call', state)
    localStorage.setItem('@timer-react:cycles-state-1.0.0', stateJSON)
  }, [state])

  useEffect(() => {
    setLocalStorageCycle()
  }, [setLocalStorageCycle])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction({ newCycle }))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles: state.cycles,
        activeCycle,
        activeCycleId: state.activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
