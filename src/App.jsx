import React from 'react';
import LandingPages from './vendorDashboard/pages/LandingPages';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import NotFound from './vendorDashboard/components/NotFound';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPages/>} /> 
        <Route path='/*' element={<NotFound/>} />
      </Routes>  
    </div>
    
  )
}

export default App