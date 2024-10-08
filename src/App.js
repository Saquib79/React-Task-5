import React from 'react';
import './App.css';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <div className="App">
      <h1>React Drag & Drop Task Management</h1>
      <TaskBoard />
    </div>
  );
}

export default App;
