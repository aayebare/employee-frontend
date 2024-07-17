// reducers/index.js

import { combineReducers } from 'redux';
import employeeReducer from './employeeReducers'; // Import your specific reducer(s)

const rootReducer = combineReducers({
  employees: employeeReducer,
  // Add other reducers here
});

export default rootReducer;
