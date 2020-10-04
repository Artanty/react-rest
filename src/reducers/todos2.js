import {SET} from "../constants/action-types";


export const todos2 = (state = [], action) => {
  switch (action.type) {
    case 'SET2':
      return [
        ...state,
        {
          payload: action
        }
      ]
    case 'TOGGLE_TODO2':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}
