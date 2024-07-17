import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import Login from './components/loginComponent';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import PrivateRoute from './routes/PrivateRoutes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/employee-list" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
          <Route path="/employee-form" element={<PrivateRoute><EmployeeForm /></PrivateRoute>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
