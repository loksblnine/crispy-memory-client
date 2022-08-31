import {combineReducers} from 'redux';
import feedbacks from "./feedbackReducer";

const appReducer = combineReducers({
  feedbacks
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;