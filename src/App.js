import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Users from './components/Users';
import About from './components/About';
import Drop from './components/Drop';
import DropUi from './components/DropUi';
import Dropdownd from './components/Dropdownd';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
       
          <Route path="/" element={<Users/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/drop" element={<Drop/>} />
          <Route path="/dropui" element={<DropUi/>} />
          <Route path="/dropdownd" element={<Dropdownd/>} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
