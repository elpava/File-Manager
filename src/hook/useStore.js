'use client'

import store from 'store/client-global-store'

export default function useStore() {
  const { dispatch, getState, useStoreState } = store()

  return { dispatch, getState, useStoreState }
}
