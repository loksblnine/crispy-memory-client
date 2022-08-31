import {ACTIONS} from "../../utils/constants";

type initialState = {
  isReady: boolean,
  items: any[],
  filteredItems: any[],
  page: number,
  loadNext: boolean
}

const initialState: initialState = {
  isReady: false,
  items: [],
  filteredItems: [],
  page: 0,
  loadNext: true,
};

const feedbackReducer = (state = initialState, action: { type: string; payload: any; }) => {
  switch (action.type) {
    case ACTIONS.FEEDBACK.SET_FEEDBACKS: {
      if (action.payload.length < 10) {
        return {
          ...state,
          items: state.items.concat(action.payload),
          filteredItems: state.items.concat(action.payload),
          isReady: true,
          loadNext: false
        };
      }
      return {
        ...state,
        items: state.items.concat(action.payload),
        filteredItems: state.items.concat(action.payload),
        isReady: true,
        page: state.page + 1
      };
    }
    case ACTIONS.FEEDBACK.UPDATE_FEEDBACK: {
      const array = state.items.map((item: any) => {
        if (item.id == action.payload.id) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        items: array,
        filteredItems: array,
      };
    }
    case ACTIONS.FEEDBACK.SET_READY_FEEDBACKS: {
      return {
        ...state,
        isReady: action.payload
      };
    }
    case ACTIONS.FEEDBACK.ADD_FEEDBACK: {
      return {
        ...state,
        items: state.items.concat(action.payload),
        filteredItems: state.items.concat(action.payload),
      };
    }
    case ACTIONS.FEEDBACK.DELETE_FEEDBACK: {
      return {
        ...state,
        items: state.items.filter((item: any) => item._id !== action.payload),
        filteredItems: state.items.filter((item: any) => item._id !== action.payload),
      };
    }
    case ACTIONS.FEEDBACK.SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case ACTIONS.FEEDBACK.SET_FILTERED_ARRAY: {
      return {
        ...state,
        filteredItems: action.payload,
      };
    }
    case ACTIONS.FEEDBACK.CLEAR_FILTERED : {
      return {
        ...state,
        filteredItems: state.items
      }
    }
    case ACTIONS.FEEDBACK.SORT : {
      return {
        ...state,
        filteredItems: state.filteredItems.sort((i1: any, i2: any) => {
          if (i1[`${action.payload[0]}`] < i2[`${action.payload[0]}`]) {
            return (-1 * (action.payload[1] === "ASC" ? 1 : -1))
          }
          if (i1[`${action.payload[0]}`] > i2[`${action.payload[0]}`]) {
            return (1 * (action.payload[1] === "ASC" ? 1 : -1))
          }
          return 0
        }),
      }
    }
    default:
      return state;
  }
};

export default feedbackReducer;
