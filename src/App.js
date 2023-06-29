import React from 'react';
import Citas from './components/Citas';
import EditarCita from './components/EditarCita';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Citas />} />
                    <Route path="/editar/:id" element={<EditarCita />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
