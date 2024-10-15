import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { AppContext } from '../context/AppContext';

const Statistics = () => {
  const { workouts } = useContext(AppContext);

  
  const data = {
    labels: workouts.map(workout => workout.date), 
    datasets: [
      {
        label: 'Calories Burned',
        data: workouts.map(workout => workout.caloriesBurned), 
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2>Workout Statistics</h2>
      <Line data={data} />
    </div>
  );
};

export default Statistics;
