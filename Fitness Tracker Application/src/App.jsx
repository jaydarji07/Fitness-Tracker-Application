import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import WorkoutLog from './components/WorkoutLog';
import Statistics from './context/Statistics';
import './App.css'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/workout-log" element={<WorkoutLog />} />
        <Route path="/statistics" element={<Statistics />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
