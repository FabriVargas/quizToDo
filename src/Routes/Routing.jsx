import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import RegistroUsuario from '../pages/RegistroUsuario';
import LoginUsuario from '../pages/LoginUsuario';
import HomeUsers from '../pages/HomeUsers';


function Routing() {

  return (
    <div>
      <Router>
        <Routes>

          <Route path="/login" element={<LoginUsuario/>}/>
          <Route path="/register" element={<RegistroUsuario/>}/>
          <Route path="/home" element={<HomeUsers/>}/>
                   
                    
        </Routes>
      </Router>
    </div>
  );
}

export default Routing

