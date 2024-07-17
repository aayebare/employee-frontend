import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import EmployeeForm from "./EmployeeForm";
import { exportEmployeesToCSV } from "../services/api";
import {
  apiDeleteEmployee,
  clearEditingEmployee,
  fetchEmployees,
  editEmployee,
} from "../actiions/employeeActions";

const EmployeeList = () => {
  const employees = useSelector((state) => {
    return state.employees || [];
  });

  const editingEmployee = useSelector(
    (state) => state.employees.editingEmployee
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = async (employeeId, employeeName) => {
    try {
      await dispatch(apiDeleteEmployee(employeeId));
      toast.success(`Employee ${employeeName} deleted successfully`);
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    }
  };

  const handleEdit = (employee) => {
    dispatch(editEmployee(employee));
  };

  const handleClearEdit = () => {
    dispatch(clearEditingEmployee());
  };

  const handleNavigation = () => {
    navigate("/employee-form");
  };

  const handleExport = async () => {
    try {
      const data = await exportEmployeesToCSV();
      const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = "employees.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
      toast.success("successfully downloaded csv");
    } catch (error) {
      console.error("Error exporting employees:", error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      {!editingEmployee && (
        <>
          <h1>Employee List</h1>
          <button className="btn btn-primary" onClick={handleNavigation}>
            Add Employee
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.employees?.map((employee) => (
                <tr key={employee.employeeId}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.position}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(employee.employeeId, employee.name)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={handleExport}>
            Export to CSV
          </button>
        </>
      )}

      {editingEmployee && (
        <EmployeeForm
          employeeToEdit={editingEmployee}
          onSubmit={() => {
            dispatch(fetchEmployees());
            handleClearEdit();
          }}
        />
      )}
    </div>
  );
};

export default EmployeeList;
