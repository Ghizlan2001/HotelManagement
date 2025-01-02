import './App.css';
// import {Router, Routes, Route } from "react-router-dom";
import Rooms from './pages/rooms';
import Guests from './pages/guests';

function App() {
  return (
    <div className="App">
      <Rooms />
      <Guests />
    </div>
  );
}

export default App;
