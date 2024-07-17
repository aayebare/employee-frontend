
import { getEmployees,addEmployee, deleteEmployee, updateEmployee } from '../services/api';

// Action types
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
export const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';
export const CLEAR_EDITING_EMPLOYEE = 'CLEAR_EDITING_EMPLOYEE';

// Action creators
export const fetchEmployees = () => async (dispatch) => {
  try {
    const data = await getEmployees();
    dispatch({ type: SET_EMPLOYEES, payload: data });
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};

export const apiAddEmployee = (employeeData) => async (dispatch) => {
  try {
    const response = await addEmployee(employeeData);
    // debugger
    dispatch({ type: ADD_EMPLOYEE_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error('Error adding employee:', error);
    throw error;
  }
};

export const apiUpdateEmployee = (employeeId, employeeData) => async (dispatch) => {
  try {
    const response = await updateEmployee(employeeId, employeeData);
    dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: response });
    return response;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const apiDeleteEmployee = (employeeId) => async (dispatch) => {
  try {
    await deleteEmployee(employeeId);
    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: employeeId });
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  payload: employees,
});

export const editEmployee = (employee) => ({
  type: EDIT_EMPLOYEE,
  payload: employee,
});

export const clearEditingEmployee = () => ({
  
  type: CLEAR_EDITING_EMPLOYEE,
});
