import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { workouts, weeklyGoals } = useContext(AppContext);

  // Calculate total workouts and calories burned
  const totalWorkouts = workouts.length;
  const totalCaloriesBurned = workouts.reduce((total, workout) => total + Number(workout.caloriesBurned), 0);

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <Link to="/statistics" className="btn btn-primary mb-3">View Statistics</Link>
      <h3>Recent Workouts</h3>
      <ul className="list-group mb-4">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <li key={index} className="list-group-item">
              {workout.activityType} - {workout.duration} min - {workout.caloriesBurned} calories on {workout.date}
            </li>
          ))
        ) : (
          <li className="list-group-item">No workouts logged yet.</li>
        )}
      </ul>

      <h3>Weekly Goals</h3>
      <ul className="list-group mb-4">
        {Object.entries(weeklyGoals).length > 0 ? (
          Object.entries(weeklyGoals).map(([goal, value], index) => (
            <li key={index} className="list-group-item">
              {goal}: {value}
            </li>
          ))
        ) : (
          <li className="list-group-item">No weekly goals set.</li>
        )}
      </ul>

      <h3>Progress Tracking</h3>
      <p>Total Workouts: {totalWorkouts}</p>
      <p>Total Calories Burned: {totalCaloriesBurned}</p>
    </div>
  );
};

export default Dashboard;
