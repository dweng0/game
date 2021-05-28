import { State } from "../interface/state"
import { Action } from "../interface/sceneinterfaceobjects"

export const stateReducer = (state = { value: State.IDLE }, action: Action) => {
  switch (action.type) {
    case State.START:
      return { value: State.START}
    case State.LOSE:
      return { value: State.LOSE}
    case State.GAME:
      return { value: State.GAME}
    case State.CUTSCENE:
      return { value: State.CUTSCENE}
    default:
      return state
  }
}