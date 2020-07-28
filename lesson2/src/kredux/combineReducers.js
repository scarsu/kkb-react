export default function combineReducers(reducers) {
  return function combination(state={},action){
    let nextState = {}
    let hasChanged = false
    for(let key in reducers){
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      hasChanged = hasChanged || state[key] !== nextState[key]
    }

    hasChanged = hasChanged || Object.keys(nextState).length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}