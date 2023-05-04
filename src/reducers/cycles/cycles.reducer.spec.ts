import { Cycle, cycleReducer } from './reducer'

describe('Cycles Reducer', () => {
  it('should reducer add new cycle', () => {
    const startDate = new Date()
    const newCycle: Cycle = {
      id: '1',
      minutesAmount: 1,
      startDate,
      task: 'fake-new-cycle',
    }

    const INITIAL_STATE = {
      cycles: [],
      activeCycleId: null,
    }

    const payload = {
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    } as const

    const expected = {
      activeCycleId: '1',
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
        },
      ],
    }
    expect(cycleReducer(INITIAL_STATE, payload)).toEqual(expected)
  })

  it('should reducer mark current cycle as finished', () => {
    const startDate = new Date()

    const INITIAL_STATE = {
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
        },
      ],
      activeCycleId: '1',
    }

    const payload = {
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
    } as const

    const expected = {
      activeCycleId: null,
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
          finishedDate: startDate,
        },
      ],
    }
    expect(cycleReducer(INITIAL_STATE, payload)).toEqual(expected)
  })

  it('should reducer interrupt current cycle', () => {
    const startDate = new Date()

    const INITIAL_STATE = {
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
        },
      ],
      activeCycleId: '1',
    }

    const payload = {
      type: 'INTERRUPT_CURRENT_CYCLE',
    } as const

    const expected = {
      activeCycleId: null,
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
          interruptedDate: startDate,
        },
      ],
    }
    expect(cycleReducer(INITIAL_STATE, payload)).toEqual(expected)
  })

  it('should reducer not mark current cycle as finished', () => {
    const startDate = new Date()

    const INITIAL_STATE = {
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
        },
      ],
      activeCycleId: '2',
    }

    const payload = {
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
    } as const

    const expected = {
      activeCycleId: null,
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
        },
      ],
    }
    expect(cycleReducer(INITIAL_STATE, payload)).toEqual(expected)
  })

  it('should reducer not interrupt current cycle', () => {
    const startDate = new Date()

    const INITIAL_STATE = {
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
        },
      ],
      activeCycleId: '2',
    }

    const payload = {
      type: 'INTERRUPT_CURRENT_CYCLE',
    } as const

    const expected = {
      activeCycleId: null,
      cycles: [
        {
          id: '1',
          minutesAmount: 1,
          startDate,
          task: 'fake-new-cycle',
        },
      ],
    }
    expect(cycleReducer(INITIAL_STATE, payload)).toEqual(expected)
  })
})
