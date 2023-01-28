import React from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Landing from './layout/Landing'
import Footer from './layout/Footer'

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />

        <div style={{ minHeight: '80vh' }}>
          <Landing />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App
