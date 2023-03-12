import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

export type Listener = () => void

export type State = any

export type GetState = () => State

export type Subscribe = (listener: Listener) => () => boolean

function createStore(initialState: State) {
  const listeners = new Set<Listener>()
  let state: State = initialState

  const setState = (key: any) => (partial: any) => {
    const nextState = typeof partial === 'function' ? partial(state[key]) : partial
    state = { ...state, [key]: nextState }
    listeners.forEach((listener) => listener())
  }

  const getState: GetState = () => state

  const subscribe: Subscribe = (listener) => {
    listeners.add(listener)

    return () => listeners.delete(listener)
  }

  return { subscribe, getState, setState }
}

function useStore(store: any, key: any) {
  const slice = useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getState,
    (state: State) => state[key]
  )

  return [slice, store.setState(key)]
}

function create(initialState: State) {
  const store = createStore(initialState)

  const useBoundStore = (key: any) => useStore(store, key)

  return useBoundStore
}

export default create
