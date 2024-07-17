// employeeReducer.js

import { ADD_EMPLOYEE_SUCCESS, CLEAR_EDITING_EMPLOYEE, DELETE_EMPLOYEE_SUCCESS, EDIT_EMPLOYEE, SET_EMPLOYEES, UPDATE_EMPLOYEE_SUCCESS } from "../actiions/employeeActions";

  
  
const initialState = {
  employees: []
};

export default function employeeReducer(state = initialState, action) {

  switch (action.type) {
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.employeeId === action.payload.employeeId ? action.payload : employee
        ),
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: state.employees.filter((employee) => employee.employeeId !== action.payload),
      };
    case EDIT_EMPLOYEE:
      return {
        ...state,
        editingEmployee: action.payload,
      };
    case CLEAR_EDITING_EMPLOYEE:
      return {
        ...state,
        editingEmployee: null,
      };
    default:
      return state;
  }
}
