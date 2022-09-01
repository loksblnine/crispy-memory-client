import {combineReducers} from 'redux';
import feedbacks from "./feedbackReducer";
import user from "./userReducer"

const appReducer = combineReducers({
  feedbacks, user
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;