'use client'

import { createStore } from 'react-hooks-global-state'

function reducer(state, action) {
  switch (action.type) {
    case 'operation':
      return {
        ...state,
        operation: {
          type: action.payload.type,
          sourcePath: action.payload.sourcePath,
        },
      }
    default:
      return state
  }
}
const initalState = {
  operation: { type: null, sourcePath: null },
}

const { dispatch, getState, useStoreState } = createStore(reducer, initalState)

export default function store() {
  return { dispatch, getState, useStoreState }
}
