import { combineReducers } from 'redux';
import IssueReducer from './issue'

const rootReducer = combineReducers({
  issue: IssueReducer 
});

export default rootReducer;