import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiAddEmployee, apiUpdateEmployee } from "../actiions/employeeActions";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ employeeToEdit, onSubmit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(employeeToEdit ? employeeToEdit.name : "");
  const [department, setDepartment] = useState(
    employeeToEdit ? employeeToEdit.department : ""
  );
  const [position, setPosition] = useState(
    employeeToEdit ? employeeToEdit.position : ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setDepartment(employeeToEdit.department);
      setPosition(employeeToEdit.position);
    }
  }, [employeeToEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { name, department, position };
      if (employeeToEdit) {
        await dispatch(apiUpdateEmployee(employeeToEdit.employeeId, formData));
        toast.success("Employee updated successfully!");
      } else {
        await dispatch(apiAddEmployee(formData));
        toast.success("Employee added successfully!");
        navigate("/employee-list");
      }
      // Clear form fields after successful submission
      setName("");
      setDepartment("");
      setPosition("");
      onSubmit();
    } catch (error) {
      console.error("API Error:", error);
      if (error.response && error.response.status !== 200) {
        toast.error("Failed to save employee. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setName("");
    setDepartment("");
    setPosition("");
    if (employeeToEdit) {
      onSubmit();
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>{employeeToEdit ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {employeeToEdit ? "Save Changes" : "Add Employee"}
        </button>
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
