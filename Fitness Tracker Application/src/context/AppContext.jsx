import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState({});

  return (
    <AppContext.Provider value={{ user, setUser, workouts, setWorkouts, weeklyGoals, setWeeklyGoals }}>
      {children}
    </AppContext.Provider>
  );
};
