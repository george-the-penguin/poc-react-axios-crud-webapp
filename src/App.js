import React from 'react';
import './App.css';
import Citas from './components/Citas';
import EditarCita from './components/EditarCita';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<Citas />} />
                        <Route path="/editar/:id" element={<EditarCita />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
