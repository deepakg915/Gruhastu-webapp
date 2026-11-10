import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Stories from './pages/Stories';
import Chatbot from './pages/Chatbot';
import Stotras from './pages/Stotras';
import Festivals from './pages/Festivals';
import Lifestyle from './pages/Lifestyle';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/stotras" element={<Stotras />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
