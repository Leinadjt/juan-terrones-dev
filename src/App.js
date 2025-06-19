import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import WebsiteStructureBuilder from './WebsiteStructureBuilder';
import Footer from './Footer';
import ArtistSocials from './ArtistSocials';
import TravelAgency from './TravelAgency';
import TransportCompany from './TransportCompany';
import ModalPaneles from './ModalPaneles';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Router>
      <Header onShowModal={() => setShowModal(true)} />
      <ModalPaneles show={showModal} onClose={() => setShowModal(false)} />
      <Routes>
        <Route path="/" element={<><WebsiteStructureBuilder /><Footer /></>} />
        <Route path="/redes" element={<ArtistSocials onShowModal={() => setShowModal(true)} />} />
        <Route path="/viajes" element={<TravelAgency onShowModal={() => setShowModal(true)} />} />
        <Route path="/transporte" element={<TransportCompany onShowModal={() => setShowModal(true)} />} />
      </Routes>
    </Router>
  );
}

export default App;
