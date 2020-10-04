import {FETCH_ITEMS_SUCCESS,FETCH_ITEMS_BEGIN,FETCH_ITEMS_FAILURE,
  CREATE_ITEM,
  EDIT_ITEM,
  DELETE_ITEM
} from "../constants/action-types";

const initialState = {
  items: [],
  loading: false,
  error: null
};

export const items_1 = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload
      };

    case FETCH_ITEMS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case FETCH_ITEMS_FAILURE:
      
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case CREATE_ITEM:
      return {
        ...state,
        loading: false,
        error: null,
        items: [...state.items, action.payload]
      };

    case EDIT_ITEM:
      return {
        ...state,
        loading: false,
        error: null,
        items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, text: action.payload.text } : item
          )
      };

    case DELETE_ITEM:
      return {
        ...state,
        loading: false,
        error: null,
        items: state.items.filter(item => item.id !== action.payload.id)
      }

    default:
      return state
  }
}

