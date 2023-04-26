export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const TYPES_CYCLES_MUTATION = {
  ADD_NEW_CYCLE: {
    type: 'ADD_NEW_CYCLE',
    mutation: (
      state: CycleState,
      payload: {
        newCycle: Cycle
      },
    ) => {
      return {
        ...state,
        cycles: [...state.cycles, payload.newCycle],
        activeCycleId: payload.newCycle.id,
      }
    },
  },

  MARK_CURRENT_CYCLE_AS_FINISHED: {
    type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
    mutation: (
      state: CycleState,
      payload: {
        activeCycleId: string
      },
    ) => {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === payload.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          }
          return cycle
        }),
        activeCycleId: null,
      }
    },
  },

  INTERRUPT_CURRENT_CYCLE: {
    type: 'INTERRUPT_CURRENT_CYCLE',
    mutation: (
      state: CycleState,
      payload: {
        activeCycleId: string
      },
    ) => {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === payload.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          }
          return cycle
        }),
        activeCycleId: null,
      }
    },
  },
} as const

export interface ActionPayload {
  type: keyof typeof TYPES_CYCLES_MUTATION
  payload?: any
}

export function cycleReducer(state: CycleState, action: ActionPayload) {
  return (
    TYPES_CYCLES_MUTATION[action.type].mutation(state, action.payload) ?? state
  )
}
