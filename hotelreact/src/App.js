import './App.css';
import Rooms from './pages/rooms';
import Guests from './pages/guests';
import Sidebar from './pages/sidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/guests" element={<Guests />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
