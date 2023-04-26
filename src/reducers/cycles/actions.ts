import { Cycle, TYPES_CYCLES_MUTATION } from './reducer'

export function addNewCycleAction({ newCycle }: { newCycle: Cycle }) {
  return {
    type: TYPES_CYCLES_MUTATION.ADD_NEW_CYCLE.type,
    payload: {
      newCycle,
    },
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: TYPES_CYCLES_MUTATION.MARK_CURRENT_CYCLE_AS_FINISHED.type,
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: TYPES_CYCLES_MUTATION.INTERRUPT_CURRENT_CYCLE.type,
  }
}
