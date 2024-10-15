import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { TextField, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const WorkoutLog = () => {
  const { workouts, setWorkouts, setWeeklyGoals, weeklyGoals } = useContext(AppContext);
  const [activityType, setActivityType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [date, setDate] = useState('');
  const [goal, setGoal] = useState('');
  const [goalValue, setGoalValue] = useState('');

  const handleWorkoutSubmit = (e) => {
    e.preventDefault();
    setWorkouts([...workouts, { activityType, duration, caloriesBurned, date }]);
    setActivityType('');
    setDuration('');
    setCaloriesBurned('');
    setDate('');
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    setWeeklyGoals(prevGoals => ({ ...prevGoals, [goal]: goalValue }));
    setGoal('');
    setGoalValue('');
  };

  const handleDeleteWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
  };

  const handleDeleteGoal = (goalName) => {
    const updatedGoals = { ...weeklyGoals };
    delete updatedGoals[goalName];
    setWeeklyGoals(updatedGoals);
  };

  // Prepare data for the chart
  const chartData = {
    labels: workouts.map(workout => workout.date),
    datasets: [{
      label: 'Calories Burned',
      data: workouts.map(workout => Number(workout.caloriesBurned)), // Ensure it's a number
      backgroundColor: '#1E3E62',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };
  

  return (
    <div className="container mt-5 p-4" style={{ backgroundColor: "#B2C8BA", border: "4px solid black", borderRadius: "15px" }}>
      <h2 className='p-3' style={{ borderRadius: "8px", backgroundColor: "#001F3F", color: "white" }}>Log Your Workout</h2>
      <form onSubmit={handleWorkoutSubmit}>
        <TextField label="Activity Type" value={activityType} onChange={(e) => setActivityType(e.target.value)} fullWidth />
        <TextField label="Duration (min)" value={duration} onChange={(e) => setDuration(e.target.value)} fullWidth />
        <TextField label="Calories Burned" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} fullWidth />
        <TextField type="date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth />
        <Button type="submit" variant="contained" color="primary" className="mt-3">Log Workout</Button>
      </form>

      <h2 className="mt-5 p-3" style={{ borderRadius: "8px", backgroundColor: "#001F3F", color: "white" }}>Set Weekly Goals</h2>
      <form onSubmit={handleGoalSubmit}>
        <TextField label="Goal (e.g., 'Run 20 miles')" value={goal} onChange={(e) => setGoal(e.target.value)} fullWidth />
        <TextField label="Value" value={goalValue} onChange={(e) => setGoalValue(e.target.value)} fullWidth />
        <Button type="submit" variant="contained" color="primary" className="mt-3">Set Goal</Button>
      </form>

      <h2 className="mt-5 p-3" style={{ borderRadius: "8px", backgroundColor: "#001F3F", color: "white" }}>Logged Workouts</h2>
      <div className="row">
        {workouts.map((workout, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.activityType}</h5>
                <p className="card-text">
                  Duration: {workout.duration} min<br />
                  Calories Burned: {workout.caloriesBurned}<br />
                  Date: {workout.date}
                </p>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteWorkout(index)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-5 p-2" style={{ borderRadius: "8px", backgroundColor: "#001F3F", color: "white" }}>Weekly Goals</h2>
      <div className="row">
        {Object.entries(weeklyGoals).length > 0 ? (
          Object.entries(weeklyGoals).map(([goalName, value], index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{goalName}</h5>
                  <p className="card-text">Target: {value}</p>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteGoal(goalName)}>Delete</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">No goals set yet.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="mt-5 p-3" style={{ borderRadius: "8px", backgroundColor: "#001F3F", color: "white" }}>Workout Trend</h2>
      <div className="chart-container mb-5">
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Calories Burned Over Time',
            },
          },
        }} />
      </div>
    </div>
  );
};

export default WorkoutLog;
