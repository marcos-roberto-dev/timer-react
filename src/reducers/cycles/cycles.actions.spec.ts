import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from './actions'
import { Cycle } from './reducer'

describe('Cycles Actions', () => {
  it('should return ADD_NEW_CYCLE type and payload', () => {
    const startDate = new Date()
    const newCycle: Cycle = {
      id: '1',
      minutesAmount: 1,
      startDate,
      task: 'fake-new-cycle',
    }
    expect(addNewCycleAction({ newCycle })).toEqual({
      payload: {
        newCycle: {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
        },
      },
      type: 'ADD_NEW_CYCLE',
    })
  })

  it('should return MARK_CURRENT_CYCLE_AS_FINISHED type', () => {
    expect(markCurrentCycleAsFinishedAction()).toEqual({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
    })
  })

  it('should return INTERRUPT_CURRENT_CYCLE type', () => {
    expect(interruptCurrentCycleAction()).toEqual({
      type: 'INTERRUPT_CURRENT_CYCLE',
    })
  })
})
