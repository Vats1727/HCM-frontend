import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import Input from './components/Input';
import FetchData from './FetchData';
import Settings from './components/Settings';
import Account from './components/Account';
import Login from './components/Login';
import Admin from './components/Admin';
import AddLab from './components/AddLab';
// import Checkup from './Checkup';
import EditAndCheckup from './components/EditAndCheckup'; // Update the path if needed
// import Checkup from './Checkup';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Container />} />
        <Route exact path="/details" element={<Input />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/profile" element={<Account />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/lab" element={<AddLab />} />
        <Route exact path="/fetch" element={<FetchData />} />
        <Route exact path="/edit-and-checkup/:caseno" element={<EditAndCheckup />} />
      </Routes>
    </Router>
  );
}

export default App;
