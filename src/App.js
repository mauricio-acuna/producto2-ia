import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import ModuleA from './modules/module-a/ModuleA';
import ModuleB from './modules/module-b/ModuleB';
import ModuleC from './modules/module-c/ModuleC';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/modulo-a" element={<ModuleA />} />
          <Route path="/modulo-b" element={<ModuleB />} />
          <Route path="/modulo-c" element={<ModuleC />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
